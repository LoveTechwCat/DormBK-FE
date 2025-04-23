import { useState } from 'react';

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  handleFetch: (apiFn: () => Promise<T>) => Promise<void>;
}

export type HandleFetch = <T>(apiFn: () => Promise<T>) => Promise<void>;

export const useFetch = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async (apiFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFn();
      setData(result);
    } catch (err) {
      setError((err as Error).message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, handleFetch };
};
