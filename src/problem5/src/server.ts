import app from "./app";
import sequelize from "./config/database.config";

const PORT = 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync({ force: true });
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
