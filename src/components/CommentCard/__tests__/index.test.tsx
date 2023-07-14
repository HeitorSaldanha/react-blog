import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useUserQuery } from 'src/hooks/useQueries';
import { CommentCard } from '../CommentCard';
import { Props } from '../CommentCard';

const mockedResponse = {
  image: 'https://example.com/image.jpg',
};

const mockedProps = {
  userName: 'Jon Doe',
  body: 'Lorem ipsum dolor sit amet',
  userId: Math.random(),
};

const mockedUseUserQuery = useUserQuery as jest.Mock;
jest.mock('src/hooks/useQueries');

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

describe('CommentCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the comment card with user details', async () => {
    mockedUseUserQuery.mockImplementation(() => ({
      status: 'success',
      data: { ...mockedResponse },
    }));
    render(<Component {...mockedProps} />);

    const userName = screen.getByText(`@${mockedProps.userName}`);
    const commentBody = screen.getByText(mockedProps.body);
    const userProfilePic = screen.getByAltText('User Profile');
    expect(userName).toBeInTheDocument();
    expect(commentBody).toBeInTheDocument();
    expect(userProfilePic.getAttribute('src')).toEqual(mockedResponse.image);
  });

  it('renders the comment card without user image if image is not available', async () => {
    mockedUseUserQuery.mockImplementation(() => ({
      status: 'success',
      data: {},
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
