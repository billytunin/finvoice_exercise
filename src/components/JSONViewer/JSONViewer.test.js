import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import JSONViewer from './JSONViewer';

test('component is rendered correctly', () => {
  const renderedComponent = render(<JSONViewer />)
  expect(renderedComponent).not.toBe(undefined)
})

test('objectChanged event should be called when text-area is modified', () => {
  const onChange = jest.fn()
  const renderedComponent = render(<JSONViewer objectChanged={onChange} />)
  fireEvent.change(
    renderedComponent.getByTestId('json-text-area'), { target: { value: 'testing' } }
  )
  expect(onChange).toHaveBeenCalled()
})
