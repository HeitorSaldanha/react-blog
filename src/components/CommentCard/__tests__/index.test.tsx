import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CommentCard } from '../CommentCard';
import { Props } from '../CommentCard';
import { useUserQuery } from 'src/hooks/useQueries';
import { userResponse } from 'src/mocks';

const mockedProps = {
  userName: 'Jon Doe',
  body: 'Lorem ipsum dolor sit amet',
  userId: Math.random(),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Component: React.FC<Props> = (props) => (
  <QueryClientProvider client={queryClient}>
    <CommentCard {...props} />
  </QueryClientProvider>
);

jest.mock('src/hooks/useQueries', () => ({
  useUserQuery: jest.fn(),
}));

describe('CommentCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the comment card with user details', () => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      status: 'success',
      data: { ...userResponse },
    }));
    render(<Component {...mockedProps} />);
    const userName = screen.getByText(`@${mockedProps.userName}`);
    const commentBody = screen.getByText(mockedProps.body);
    const userProfilePic = screen.getByAltText('User Profile');
    expect(userName).toBeInTheDocument();
    expect(commentBody).toBeInTheDocument();
    expect(userProfilePic.getAttribute('src')).toEqual(userResponse.image);
    expect(useUserQuery).toHaveBeenCalledWith(mockedProps.userId);
  });

  it('renders the comment card without user image if image is not available', async () => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({
      status: 'error',
    }));
    render(<Component {...mockedProps} />);
    const userName = screen.getByText(`@${mockedProps.userName}`);
    const commentBody = screen.getByText(mockedProps.body);
    const userProfilePic = screen.queryByAltText('User Profile');
    expect(userName).toBeInTheDocument();
    expect(commentBody).toBeInTheDocument();
    expect(userProfilePic).toBeNull();
  });
});
