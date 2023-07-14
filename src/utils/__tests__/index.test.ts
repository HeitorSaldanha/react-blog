import { fetchPosts, fetchPost, fetchUser, fetchComments } from '../fetchData';

describe('fetchData', () => {
  const mockFetch = (data: any) =>
    jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(data) })
      );

  beforeEach(() => {
    global.fetch = mockFetch({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('fetchPosts', () => {
    it('should fetch posts with the correct URL', async () => {
      const mockResponse = {
        /* mocked response data */
      };
      global.fetch = mockFetch(mockResponse);

      const page = 1;
      const filter = 'search-filter';

      const expectedUrl = `https://dummyjson.com/posts/search?q=${filter}&limit=6&skip=0`;

      const response = await fetchPosts({ page, filter });

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('fetchPost', () => {
    it('should fetch a post with the correct URL', async () => {
      const mockResponse = {
        /* mocked response data */
      };
      global.fetch = mockFetch(mockResponse);

      const postId = '123';

      const expectedUrl = `https://dummyjson.com/posts/${postId}`;

      const response = await fetchPost({ postId });

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('fetchUser', () => {
    it('should fetch a user with the correct URL', async () => {
      const mockResponse = {
        /* mocked response data */
      };
      global.fetch = mockFetch(mockResponse);

      const userId = 1;

      const expectedUrl = `https://dummyjson.com/users/${userId}`;

      const response = await fetchUser({ userId });

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('fetchComments', () => {
    it('should fetch comments for a post with the correct URL', async () => {
      const mockResponse = {
        /* mocked response data */
      };
      global.fetch = mockFetch(mockResponse);

      const postId = '123';

      const expectedUrl = `https://dummyjson.com/posts/${postId}/comments`;

      const response = await fetchComments({ postId });

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockResponse);
    });
  });
});
