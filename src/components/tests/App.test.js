import React from 'react';
import { render } from '@testing-library/react';
import {App} from '../main';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const linkElement = getByTestId('main-router');
  expect(linkElement).toBeInTheDocument();
});
