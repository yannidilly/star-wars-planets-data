import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import planetsData from './helpers/planetsData';
import App from '../App';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());

test('Testa se o loading aparece e some da página quando ela é carregada', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetsData),
  }));

  render(<App />);
  const loading = screen.queryByTestId('loading');
  expect(loading).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();
});

test('Testa se a tabela muda dinamicamente de acordo com o filtro de nome', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetsData),
  }));

  render(<App />);
  const filterName = screen.queryByTestId('name-filter');
  expect(filterName).toBeInTheDocument();
  const loading = screen.queryByTestId('loading');
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();
  const alderaanText = screen.queryByText('Alderaan')
  expect(alderaanText).toBeInTheDocument();
  userEvent.type(filterName, 'Tatooine');
  expect(alderaanText).not.toBeInTheDocument();
});

test('Testa se a tabela muda ao usar o filtro numérico de /maior que/i', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetsData),
  }));

  render(<App />);
  const valueFilterInput = screen.queryByTestId('value-filter');
  expect(valueFilterInput).toBeInTheDocument();
  const filterButton = screen.queryByRole('button', { name: 'Filter' });
  expect(filterButton).toBeInTheDocument();

  const loading = screen.queryByTestId('loading');
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();

  userEvent.type(valueFilterInput, '1000000000');
  userEvent.click(filterButton);

  let tableRows = screen.queryAllByRole('row');
  expect(tableRows.length).toBe(4);
});

test('Testa se a tabela muda ao usar o filtro numérico de /menor que/i', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetsData),
  }));

  render(<App />);
  const valueFilterInput = screen.queryByTestId('value-filter');
  expect(valueFilterInput).toBeInTheDocument();
  const filterButton = screen.queryByRole('button', { name: 'Filter' });
  expect(filterButton).toBeInTheDocument();

  const loading = screen.queryByTestId('loading');
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();

  const comparisonFilter = screen.queryByTestId('comparison-filter');
  expect(comparisonFilter).toBeInTheDocument();
  expect(comparisonFilter.value).toBe('maior que');

  userEvent.selectOptions(comparisonFilter, 'menor que')
  expect(comparisonFilter.value).toBe('menor que');


  userEvent.type(valueFilterInput, '250000');
  userEvent.click(filterButton);

  const tableRows = screen.queryAllByRole('row');
  expect(tableRows.length).toBe(3);
});

test('Testa se a tabela muda ao usar o filtro numérico de /igual a/i', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(planetsData),
  }));

  render(<App />);
  const valueFilterInput = screen.queryByTestId('value-filter');
  expect(valueFilterInput).toBeInTheDocument();
  const filterButton = screen.queryByRole('button', { name: 'Filter' });
  expect(filterButton).toBeInTheDocument();

  const loading = screen.queryByTestId('loading');
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();

  const comparisonFilter = screen.queryByTestId('comparison-filter');
  expect(comparisonFilter).toBeInTheDocument();
  expect(comparisonFilter.value).toBe('maior que');

  userEvent.selectOptions(comparisonFilter, 'igual a')
  expect(comparisonFilter.value).toBe('igual a');


  userEvent.type(valueFilterInput, '200000');
  userEvent.click(filterButton);

  const tableRows = screen.queryAllByRole('row');
  expect(tableRows.length).toBe(1);
});

test('Verifica a tela em caso de erro no fetch', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.reject('Could not load table'),
  }));

  render(<App />);

  const loading = screen.queryByTestId('loading');
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();

  const errorTitle = screen.queryByRole('heading', { name: 'Could not load table' });
  expect(errorTitle).toBeInTheDocument();
});
