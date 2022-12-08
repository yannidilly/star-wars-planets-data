import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import planetsData from './helpers/planetsData';
import App from '../App';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());

test('Testa botão para remover todos os filtros', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetsData),
  }));

  render(<App />);
  const loading = screen.queryByTestId('loading');
  expect(loading).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();

  const filterButton = screen.queryByRole('button', { name: 'Filter' });
  expect(filterButton).toBeInTheDocument();
  userEvent.click(filterButton);
  userEvent.click(filterButton);
  userEvent.click(filterButton);

  let activeFilters = screen.queryAllByTestId('filter');
  expect(activeFilters.length).toBe(3);

  const cleanFiltersButton = screen.getByRole('button', {  name: /clean all filters/i});
  userEvent.click(cleanFiltersButton);

  activeFilters = screen.queryAllByTestId('filter');
  expect(activeFilters.length).toBe(0);

  userEvent.click(filterButton);

  const deleteFilterButton = screen.queryByTestId('delete-filter-button');
  activeFilters = screen.queryAllByTestId('filter');
  expect(activeFilters.length).toBe(1);
  userEvent.click(deleteFilterButton);
  activeFilters = screen.queryAllByTestId('filter');
  expect(activeFilters.length).toBe(0);

});