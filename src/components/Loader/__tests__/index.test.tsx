import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader', () => {
  it('renders the loader icon', () => {
    render(<Loader />);
    const loaderIcon = screen.getByTestId('loader-icon');
    expect(loaderIcon).toBeInTheDocument();
    expect(loaderIcon).toHaveClass('fa-spin');
  });
});
