import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePostsQuery } from 'src/hooks/useQueries';
import { Posts } from '../Posts';
import { postsResponse } from 'src/mocks';
import { MemoryRouter } from 'react-router-dom';

jest.mock('src/hooks/useQueries', () => ({
  usePostsQuery: jest.fn(),
}));

describe('Posts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly render all page elements', () => {
    const fetchPosts = jest.fn();
    (usePostsQuery as jest.Mock).mockImplementation(
      ({ page, filter }: { page: number; filter: string }) => {
        fetchPosts({ page, filter });
        return {
          status: 'success',
          data: { ...postsResponse },
        };
      }
    );
    render(<Posts />, { wrapper: MemoryRouter });
    const searchForm = screen.getByTestId('search-post');
    const postCards = screen.getAllByTestId('post-card');
    const pagination = screen.getByRole('navigation', { name: 'pagination' });
    expect(searchForm).toBeInTheDocument();
    expect(postCards.length).toBe(6);
    expect(pagination).toBeInTheDocument();
  });

  it('should call fetchPosts with the correct parameters when submitting the search form', async () => {
    const refetch = jest.fn();
    const fetchPosts = jest.fn();
    const user = userEvent.setup();
    (usePostsQuery as jest.Mock).mockImplementation(
      ({ page, filter }: { page: number; filter: string }) => {
        fetchPosts({ page, filter });
        return {
          status: 'success',
          data: { ...postsResponse },
          refetch,
        };
      }
    );
    render(<Posts />, { wrapper: MemoryRouter });
    expect(usePostsQuery).toHaveBeenCalledWith({ page: 1, filter: '' });
    expect(fetchPosts).toHaveBeenCalledWith({ page: 1, filter: '' });
    const searchInput = screen.getByPlaceholderText('Find post');
    user.type(searchInput, 'example');
    fireEvent.submit(screen.getByTestId('search-post'));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('should render the loading indicator when isLoading is true', () => {
    (usePostsQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    render(<Posts />, { wrapper: MemoryRouter });
    const loader = screen.getByTestId('loader-icon');
    expect(loader).toBeInTheDocument();
  });

  it('should render the error message when isError is true', () => {
    const error = new Error('Error message');
    (usePostsQuery as jest.Mock).mockImplementation(() => ({
      isError: true,
      error,
    }));
    render(<Posts />, { wrapper: MemoryRouter });
    const errorTitle = screen.getByText('Failed to load posts');
    const errorMessage = screen.getByText('Error message');
    expect(errorTitle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
