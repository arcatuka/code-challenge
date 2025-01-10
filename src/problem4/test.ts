// complexity: O(n)
// normal logic
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// complexity: O(1)
// formula logic
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// complexity: O(n)
// recursion logic
function sum_to_n_c(n: number): number {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
}

const n = 5;

console.log("Using sum_to_n_a:", sum_to_n_a(n));
console.log("Using sum_to_n_b:", sum_to_n_b(n));
console.log("Using sum_to_n_c:", sum_to_n_c(n));
