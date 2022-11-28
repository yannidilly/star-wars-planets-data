import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Testa se aparece o Header na página', () => {
  render(<App />);
  const headerText = screen.queryByRole('heading', { level: 1, name: /star wars planets/i});
  expect(headerText).toBeInTheDocument();
});
