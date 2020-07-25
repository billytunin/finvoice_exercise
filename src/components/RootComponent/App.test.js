import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('component is rendered correctly', () => {
  const app = render(<App />)
  expect(app).not.toBe(undefined)
});
