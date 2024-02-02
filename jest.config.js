module.exports = {
    preset: 'ts-jest',
    testEnvironment: "./jest.environment.js",
    "setupFilesAfterEnv": ["./jest.setup.ts"],
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    moduleDirectories: ['node_modules', 'src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(src/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy"
    },
};
