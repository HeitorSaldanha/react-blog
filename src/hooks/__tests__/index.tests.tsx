import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useUserQuery,
  usePostsQuery,
  usePostQuery,
  useCommentsQuery,
} from '../useQueries';
import { waitFor, renderHook } from '@testing-library/react';
import { commentsResponse, postResponse, userResponse } from 'src/mocks';
import axios from 'axios';

jest.mock('axios');

const queryClient = new QueryClient();

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useUserQuery', () => {
    it('should call fetchUser with the correct userId', async () => {
      const userId = 1;
      const expectedUrl = `https://dummyjson.com/users/${userId}`;
      (axios.get as jest.Mock).mockImplementation(() =>
        Promise.resolve({ data: userResponse })
      );
      const { result } = renderHook(() => useUserQuery(userId), {
        wrapper,
      });
      await waitFor(async () =>
        expect(await result.current.isSuccess).toBe(true)
      );
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
      expect(result.current.data).toEqual(userResponse);
    });
  });

  it('should call fetchPosts with the correct postId', async () => {
    const expectedUrl = 'https://dummyjson.com/posts?limit=6&skip=0';
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: postResponse })
    );
    const { result } = renderHook(
      () => usePostsQuery({ page: 1, filter: '' }),
      {
        wrapper,
      }
    );
    await waitFor(async () =>
      expect(await result.current.isSuccess).toBe(true)
    );
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    expect(result.current.data).toEqual(postResponse);
  });

  it('should call fetchPost with the correct postId', async () => {
    const postId = '1';
    const expectedUrl = `https://dummyjson.com/posts/${postId}`;
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: postResponse })
    );
    const { result } = renderHook(() => usePostQuery(postId), {
      wrapper,
    });
    await waitFor(async () =>
      expect(await result.current.isSuccess).toBe(true)
    );
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    expect(result.current.data).toEqual(postResponse);
  });

  it('should call fetchComments with the correct postId', async () => {
    const postId = '1';
    const expectedUrl = `https://dummyjson.com/posts/${postId}/comments`;
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: commentsResponse })
    );
    const { result } = renderHook(() => useCommentsQuery(postId), {
      wrapper,
    });
    await waitFor(async () =>
      expect(await result.current.isSuccess).toBe(true)
    );
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    expect(result.current.data).toEqual(commentsResponse);
  });
});
