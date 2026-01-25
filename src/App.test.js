import { render, screen } from '@testing-library/react';
import App from './App';

test('renders shopping list app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Shopping List/i);
  expect(titleElement).toBeInTheDocument();
});
