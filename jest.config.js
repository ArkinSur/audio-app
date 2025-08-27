module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|react-clone-referenced-element|@react-navigation|expo(nent)?|@expo(nent)?|expo-.*|@expo/.*|@unimodules/.*|unimodules-.*|sentry-expo|native-base)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.expo/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
