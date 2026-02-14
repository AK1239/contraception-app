/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "src/engine/**/*.ts",
    "src/rules/**/*.ts",
    "src/utils/**/*.ts",
    "src/validators/**/*.ts",
    "src/hooks/**/*.ts",
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  verbose: true,
};
