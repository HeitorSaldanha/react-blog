import { CommentResponse, PostsResponse, Post, User } from 'src/types';

export const fetchPosts = ({
  page,
  filter,
}: {
  page: number;
  filter: string;
}): Promise<PostsResponse> =>
  fetch(
    `https://dummyjson.com/posts${
      filter ? `/search?q=${filter}&` : '?'
    }limit=6&skip=${page > 1 ? (page - 1) * 6 : 0}`
  )
    .then((res) => res.json())
    .then((data) => data);

export const fetchPost = ({ postId }: { postId: string }): Promise<Post> =>
  fetch(`https://dummyjson.com/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => data);

export const fetchUser = ({ userId }: { userId: number }): Promise<User> =>
  fetch(`https://dummyjson.com/users/${userId}`)
    .then((res) => res.json())
    .then((data) => data);

export const fetchComments = ({
  postId,
}: {
  postId: string;
}): Promise<CommentResponse> =>
  fetch(`https://dummyjson.com/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((data) => data);
