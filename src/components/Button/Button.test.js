import React from 'react';
import { render } from '@testing-library/react';
import CompareButton from './Button';

test('compare button is rendered with caption', () => {
  const { getByText } = render(<CompareButton />)
  expect(getByText('Compare')).toBeDefined()
});
