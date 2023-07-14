import { useQuery } from '@tanstack/react-query';
import { fetchUser } from 'src/utils/fetchData';

export const useUserQuery = (userId: number) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
  });
