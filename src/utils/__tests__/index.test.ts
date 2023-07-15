import {
  postResponse,
  postsResponse,
  userResponse,
  commentsResponse,
} from 'src/mocks';
import { fetchPosts, fetchPost, fetchUser, fetchComments } from '../fetchData';
import axios from 'axios';

jest.mock('axios');

describe('fetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPosts', () => {
    it('should fetch posts with the correct URL', async () => {
      (axios.get as jest.Mock).mockImplementation(() =>
        Promise.resolve({ data: postsResponse })
      );
      const expectedUrl = `https://dummyjson.com/posts?limit=6&skip=0`;
      const response = await fetchPosts({ page: 1 });
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(postsResponse);
    });
  });

  describe('fetchPost', () => {
    it('should fetch a post with the correct URL', async () => {
      (axios.get as jest.Mock).mockImplementation(() =>
        Promise.resolve({ data: postResponse })
      );
      const postId = '1';
      const expectedUrl = `https://dummyjson.com/posts/${postId}`;
      const response = await fetchPost({ postId });
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(postResponse);
    });
  });

  describe('fetchUser', () => {
    it('should fetch a user with the correct URL', async () => {
      (axios.get as jest.Mock).mockImplementation(() =>
        Promise.resolve({ data: userResponse })
      );
      const userId = 1;
      const expectedUrl = `https://dummyjson.com/users/${userId}`;
      const response = await fetchUser({ userId });
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(userResponse);
    });
  });

  describe('fetchComments', () => {
    it('should fetch comments for a post with the correct URL', async () => {
      (axios.get as jest.Mock).mockImplementation(() =>
        Promise.resolve({ data: commentsResponse })
      );
      const postId = '1';
      const expectedUrl = `https://dummyjson.com/posts/${postId}/comments`;
      const response = await fetchComments({ postId });
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(commentsResponse);
    });
  });
});
