import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';
describe('Pagination', () => {
  const totalPages = 10;
  const currentPage = 5;
  const onChange = jest.fn();

  it('renders 5 page buttons when total pages are more than 5', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={onChange}
      />
    );
    const pageButtons = screen.getAllByRole('button', { name: /Goto page/ });
    expect(pageButtons).toHaveLength(5);
  });

  it('renders the correct number of page buttons when total pages are less than 5', () => {
    render(
      <Pagination
        totalPages={3}
        currentPage={currentPage}
        onChange={onChange}
      />
    );
    const pageButtons = screen.getAllByRole('button', { name: /Goto page/ });
    expect(pageButtons).toHaveLength(3);
  });

  it('calls onChange when a page button is clicked', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={onChange}
      />
    );
    const pageButton = screen.getByRole('button', { name: /Goto page 10/ });

    fireEvent.click(pageButton);

    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('calls onChange when next or previous buttons are clicked', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={onChange}
      />
    );
    const nextPageButton = screen.getByRole('button', { name: /Next/ });
    const previousPageButton = screen.getByRole('button', { name: /Previous/ });

    fireEvent.click(nextPageButton);
    expect(onChange).toHaveBeenCalledWith(6);
    fireEvent.click(previousPageButton);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('disables the "Previous" button when on the first page', () => {
    render(
      <Pagination totalPages={totalPages} currentPage={1} onChange={onChange} />
    );
    const previousButton = screen.getByRole('button', { name: /Previous/ });
    expect(previousButton).toBeDisabled();
  });

  it('disables the "Next page" button when on the last page', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={totalPages}
        onChange={onChange}
      />
    );
    const nextButton = screen.getByRole('button', { name: /Next/ });
    expect(nextButton).toBeDisabled();
  });
});
