import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import planetsData from './helpers/planetsData';
import App from '../App';

describe('Testa o componente Sort', () => {
  test('Testa se a Tabela é reordenada quando o botão Order é clicado', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(planetsData),
    }));
  
    render(<App />);
    const loading = screen.queryByTestId('loading');
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();

    const ascInput = screen.queryByTestId('column-sort-input-asc');
    expect(ascInput).toBeInTheDocument();
    expect(ascInput.checked).toBe(false);
    userEvent.click(ascInput);
    expect(ascInput.checked).toBe(true);

    const orderButton = screen.getByRole('button', {  name: /order/i});
    userEvent.click(orderButton);

    let tablePlanetsName = screen.queryAllByTestId('planet-name').map((p) => p.innerHTML);
    expect(tablePlanetsName[0]).toBe('Yavin IV');

    const typeNumberSort = screen.queryByTestId('column-sort');
    expect(typeNumberSort).toBeInTheDocument();
    expect(typeNumberSort.value).toBe('population');
  
    userEvent.selectOptions(typeNumberSort, 'diameter')
    expect(typeNumberSort.value).toBe('diameter');
  

    const descInput = screen.queryByTestId('column-sort-input-desc');
    expect(descInput).toBeInTheDocument();
    expect(descInput.checked).toBe(false);
    userEvent.click(descInput);
    expect(descInput.checked).toBe(true);
    userEvent.click(orderButton);

    tablePlanetsName = screen.queryAllByTestId('planet-name').map((p) => p.innerHTML);
    expect(tablePlanetsName[0]).toBe('Bespin');
  });
});
