import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from '../Breadcrumb';
import {
  faFile,
  faFileAlt,
  faFileArchive,
} from '@fortawesome/free-solid-svg-icons';

describe('Breadcrumb', () => {
  it('renders the home link when no path is provided', () => {
    render(<Breadcrumb />, { wrapper: MemoryRouter });
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  it('renders the provided path correctly', () => {
    const path = [
      { label: 'Category 1', icon: faFile },
      { label: 'Category 2', icon: faFileAlt },
      { label: 'Current Page', icon: faFileArchive },
    ];

    render(<Breadcrumb path={path} />, { wrapper: MemoryRouter });

    const category1Link = screen.getByText('Category 1');
    const category2Link = screen.getByText('Category 2');
    const currentPage = screen.getByText('Current Page');

    expect(category1Link).toBeInTheDocument();
    expect(category2Link).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
  });
});
