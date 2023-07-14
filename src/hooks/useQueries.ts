import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchPost, fetchComments } from 'src/utils/fetchData';

export const useUserQuery = (userId: number) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
  });

export const usePostQuery = (postId: string) =>
  useQuery({
    queryKey: ['postDetail'],
    queryFn: () => fetchPost({ postId }),
    cacheTime: 0,
  });

export const useCommentsQuery = (postId: string) =>
  useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments({ postId }),
    cacheTime: 0,
  });
