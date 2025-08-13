// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
        '^@backend/(.*)$': '<rootDir>/src/backend/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@frontend/(.*)$': '<rootDir>/src/frontend/$1'
    }
};