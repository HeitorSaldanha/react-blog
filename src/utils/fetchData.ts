import { CommentResponse, PostsResponse, Post, User } from 'src/types';
import axios from 'axios';

export const fetchPosts = ({
  page,
  filter,
}: {
  page: number;
  filter: string;
}) =>
  axios
    .get<PostsResponse>(
      `https://dummyjson.com/posts${
        filter ? `/search?q=${filter}&` : '?'
      }limit=6&skip=${page > 1 ? (page - 1) * 6 : 0}`
    )
    .then((res) => res.data);

export const fetchPost = ({ postId }: { postId: string }) =>
  axios
    .get<Post>(`https://dummyjson.com/posts/${postId}`)
    .then((res) => res.data);

export const fetchUser = ({ userId }: { userId: number }) =>
  axios
    .get<User>(`https://dummyjson.com/users/${userId}`)
    .then((res) => res.data);

export const fetchComments = ({ postId }: { postId: string }) =>
  axios
    .get<CommentResponse>(`https://dummyjson.com/posts/${postId}/comments`)
    .then((res) => res.data);
