import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Error } from '../Error';

describe('Error Page', () => {
  test('renders 404 Not Found page', () => {
    render(<Error errorCode={404} />, { wrapper: MemoryRouter });

    const notFoundHeading = screen.getByRole('heading', {
      level: 1,
      name: /404/i,
    });
    const notFoundMessage = screen.getByText(/page not found/i);
    const homeButton = screen.getByRole('button', { name: /go home/i });

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
  });

  test('does not render for unhandled error codes', () => {
    render(<Error errorCode={999} />, { wrapper: MemoryRouter });

    const notFoundHeading = screen.queryByRole('heading', {
      level: 1,
      name: /404/i,
    });
    const notFoundMessage = screen.queryByText(/page not found/i);
    const homeButton = screen.queryByRole('button', { name: /go home/i });

    expect(notFoundHeading).toBeNull();
    expect(notFoundMessage).toBeNull();
    expect(homeButton).toBeNull();
  });
});
