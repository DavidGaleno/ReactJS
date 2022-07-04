import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app, with a button, a quote and the author', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button')
  const imgElement = screen.getByRole('img')
  const textElement = screen.getByRole('h1')
  expect(buttonElement).toBeInTheDocument()
  expect(imgElement).toBeInTheDocument()
  expect(textElement).toBeInTheDocument()
});
