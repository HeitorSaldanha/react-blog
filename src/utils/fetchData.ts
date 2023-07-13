import { CommentResponse, Post, User } from 'src/types';

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
