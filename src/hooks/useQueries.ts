import { useQuery } from '@tanstack/react-query';
import {
  fetchUser,
  fetchPosts,
  fetchPost,
  fetchComments,
} from 'src/utils/fetchData';

export const useUserQuery = (userId: number, enabled = false) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
    ...(enabled ? { enabled: !!userId } : {}),
  });

export const usePostsQuery = ({
  page,
  filter,
}: {
  page: number;
  filter: string;
}) =>
  useQuery({
    queryKey: ['postsData', page],
    queryFn: () => fetchPosts({ page, filter }),
    keepPreviousData: true,
    retry: false,
  });

export const usePostQuery = (postId: string) =>
  useQuery({
    queryKey: ['postDetail'],
    queryFn: () => fetchPost({ postId }),
    cacheTime: 0,
    retry: false,
  });

export const useCommentsQuery = (postId: string) =>
  useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments({ postId }),
    cacheTime: 0,
    retry: false,
  });
