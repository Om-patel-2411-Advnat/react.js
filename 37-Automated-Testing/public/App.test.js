// if you have this file than you should have at-lease one test into this file 

import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders learn react link', () => {
  render(<App />);
  // here this "/learn react/i" is basically looking for this text field to be present in a app component 
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

