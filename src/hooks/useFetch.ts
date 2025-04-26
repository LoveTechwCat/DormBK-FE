import { useState } from 'react';

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  resetting: boolean;
  handleFetch: (apiFn: () => Promise<T>) => Promise<void>;
  handleReset: () => void;
}

export type HandleFetch = <T>(apiFn: () => Promise<T>) => Promise<void>;

export const useFetch = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleFetch = async (apiFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFn();
      setData(result);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const backendMessage =
          err.response?.data?.message || 'Unknown backend error';
        setError(backendMessage);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResetting(true);
    setTimeout(() => {
      setData(null);
      setError(null);
      setLoading(false);
      setResetting(false);
    }, 300); // fade-out 300ms
  };

  return { data, error, loading, resetting, handleFetch, handleReset };
};

// ------------------
// Type guard xác định lỗi có response
function isAxiosError(
  error: unknown,
): error is { response?: { data?: { message?: string } } } {
  return typeof error === 'object' && error !== null && 'response' in error;
}
