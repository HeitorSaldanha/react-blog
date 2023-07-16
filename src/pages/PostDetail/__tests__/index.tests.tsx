import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostDetail } from '../PostDetail';
import { createMemoryHistory } from 'history';
import {
  usePostQuery,
  useUserQuery,
  useCommentsQuery,
} from 'src/hooks/useQueries';

jest.mock('src/hooks/useQueries', () => ({
  usePostQuery: jest.fn(),
  useUserQuery: jest.fn(),
  useCommentsQuery: jest.fn(),
}));

describe('PostDetail', () => {
  const queryClient = new QueryClient();

  const Component = () => {
    const history = createMemoryHistory({ initialEntries: ['/posts/1'] });
    return (
      <QueryClientProvider client={queryClient}>
        <Router navigator={history} location={history.location}>
          <PostDetail />
        </Router>
      </QueryClientProvider>
    );
  };

  test('renders loading state while fetching data', async () => {
    (usePostQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    (useCommentsQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    render(<Component />);
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });
});
