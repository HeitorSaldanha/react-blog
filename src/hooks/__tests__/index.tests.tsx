import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { fetchUser, fetchPost, fetchComments } from 'src/utils/fetchData';
import { useUserQuery, usePostQuery, useCommentsQuery } from '../useQueries';
import { waitFor, renderHook } from '@testing-library/react';
import { userResponse } from 'src/mocks';
import axios from 'axios';
import nock from 'nock';

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
    /*
    it('should call useQuery with the correct options', () => {
      const userId = 123;
      const expectedQueryKey = ['user', userId];
      renderHook(() => useUserQuery(userId));
      expect(useQuery).toHaveBeenCalledWith({
        queryKey: expectedQueryKey,
        queryFn: expect.any(Function),
      });
    });
    */

    it('should call fetchUser with the correct userId', async () => {
      const userId = 1;
      const expectedUrl = `https://dummyjson.com/users/${userId}`;
      nock('https://dummyjson.com/').get(`/users/${userId}`).reply(200, {
        answer: userResponse,
      });
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
  /*
  describe('usePostQuery', () => {
    it('should call useQuery with the correct options', () => {
      const postId = 'abc';
      const expectedQueryKey = ['postDetail'];

      renderHook(() => usePostQuery(postId));

      expect(useQuery).toHaveBeenCalledWith({
        queryKey: expectedQueryKey,
        queryFn: expect.any(Function),
        cacheTime: 0,
      });
    });

    it('should call fetchPost with the correct postId', () => {
      const postId = 'abc';

      renderHook(() => usePostQuery(postId));

      const useQueryOptions = useQuery.mock.calls[0][0];
      const { queryFn } = useQueryOptions;

      expect(queryFn).toBeInstanceOf(Function);
      expect(fetchPost).toHaveBeenCalledWith({ postId });
    });
  });

  describe('useCommentsQuery', () => {
    it('should call useQuery with the correct options', () => {
      const postId = 'abc';
      const expectedQueryKey = ['comments'];

      renderHook(() => useCommentsQuery(postId));

      expect(useQuery).toHaveBeenCalledWith({
        queryKey: expectedQueryKey,
        queryFn: expect.any(Function),
        cacheTime: 0,
      });
    });

    it('should call fetchComments with the correct postId', () => {
      const postId = 'abc';

      renderHook(() => useCommentsQuery(postId));

      const useQueryOptions = useQuery.mock.calls[0][0];
      const { queryFn } = useQueryOptions;

      expect(queryFn).toBeInstanceOf(Function);
      expect(fetchComments).toHaveBeenCalledWith({ postId });
    });
  });
  */
});
