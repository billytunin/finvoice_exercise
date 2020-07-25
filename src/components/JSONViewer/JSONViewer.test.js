import React from 'react';
import { render } from '@testing-library/react';
import JSONViewer from './JSONViewer';

test('component is rendered correctly', () => {
  const renderedComponent = render(<JSONViewer />)
  expect(renderedComponent).not.toBe(undefined)
});
