module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
