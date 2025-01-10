const tokenPriceUrl = "https://interview.switcheo.com/prices.json";
const tokenIconBaseUrl =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

// Fetch token prices from the API
async function fetchTokenPrices() {
  try {
    const response = await fetch(tokenPriceUrl);
    if (!response.ok) throw new Error("Failed to fetch token prices");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    alert("Failed to fetch token prices. Please try again later.");
    return [];
  }
}

// Create dropdown option with icon and name
function createTokenOption(tokenName, dropdownListId, selectedElementId) {
  const dropdownList = document.getElementById(dropdownListId);
  const selectedElement = document.getElementById(selectedElementId);
  const logoElement = selectedElement.querySelector("img");
  const textElement = selectedElement.querySelector("span");

  // Special cases where token names do not match their image file names
  const errorImageMapping = {
    STEVMOS: "stEVMOS",
    RATOM: "rATOM",
    STOSMO: "stOSMO",
    STATOM: "stATOM",
    STLUNA: "stLUNA",
  };

  // Check if tokenName is in the errorImageMapping; use mapped name if found
  const tokenImageName = errorImageMapping[tokenName] || tokenName;

  // Create a dropdown option
  const option = document.createElement("div");
  option.className = "option";
  option.innerHTML = `
    <img src="${tokenIconBaseUrl}${tokenImageName}.svg" alt="${tokenName}" />
    <span>${tokenName}</span>
  `;

  option.addEventListener("click", () => {
    logoElement.src = `${tokenIconBaseUrl}${tokenImageName}.svg`;
    logoElement.style.display = "inline";
    textElement.textContent = tokenName;
    selectedElement.dataset.value = tokenName;
    dropdownList.style.display = "none";

    // Recalculate output amount if applicable
    calculateOutputAmount();
  });

  dropdownList.appendChild(option);
}

// Toggle visibility of dropdown list
function toggleDropdown(dropdownListId) {
  const dropdownList = document.getElementById(dropdownListId);
  dropdownList.style.display =
    dropdownList.style.display === "block" ? "none" : "block";
}

// Populate dropdown options dynamically
async function populateTokenOptions() {
  const tokens = await fetchTokenPrices();

  tokens.forEach((token) => {
    createTokenOption(token.currency, "input-token-list", "input-token");
    createTokenOption(token.currency, "output-token-list", "output-token");
  });
}

// Calculate the output amount based on input and token prices
function calculateOutputAmount() {
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const inputToken = document.getElementById("input-token").dataset.value;
  const outputToken = document.getElementById("output-token").dataset.value;
  const outputAmountField = document.getElementById("output-amount");

  if (isNaN(inputAmount) || !inputToken || !outputToken) {
    outputAmountField.value = "";
    return;
  }

  fetchTokenPrices().then((tokens) => {
    const inputTokenPrice = tokens.find(
      (token) => token.currency === inputToken
    )?.price;
    const outputTokenPrice = tokens.find(
      (token) => token.currency === outputToken
    )?.price;

    if (inputTokenPrice && outputTokenPrice) {
      const outputAmount = (inputAmount * inputTokenPrice) / outputTokenPrice;
      outputAmountField.value = outputAmount.toFixed(6);
    } else {
      alert("Invalid token selection. Please select valid tokens.");
      outputAmountField.value = "";
    }
  });
}

// Event listeners for dropdown toggles
document
  .getElementById("input-token")
  .addEventListener("click", () => toggleDropdown("input-token-list"));

document
  .getElementById("output-token")
  .addEventListener("click", () => toggleDropdown("output-token-list"));

// Add input event listener to calculate output amount
document
  .getElementById("swap-form")
  .addEventListener("input", calculateOutputAmount);

document.getElementById("swap-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const swapButton = document.getElementById("swap-button");
  const loadingIndicator = document.getElementById("loading-indicator");

  swapButton.style.display = "none";
  loadingIndicator.style.display = "block";

  setTimeout(() => {
    alert("Swap confirmed!");
    swapButton.style.display = "block";
    loadingIndicator.style.display = "none";
  }, 2000);
});

// Populate token dropdowns on page load
document.addEventListener("DOMContentLoaded", populateTokenOptions);
