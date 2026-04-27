import { useQuery } from '@tanstack/react-query';

export const useApiHealth = () =>
  useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/health`);
      return response.json();
    },
  });
