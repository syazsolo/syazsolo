import '@testing-library/jest-dom';

// Mock scrollIntoView for all tests
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
});
