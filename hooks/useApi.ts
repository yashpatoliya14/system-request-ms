import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, LoadingState } from '@/types';

// Generic API hook for fetching data
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoadingState('loading');
    setError(null);
    
    try {
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
        setLoadingState('success');
      } else {
        setError(response.message);
        setLoadingState('error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoadingState('error');
    }
  }, [apiCall]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    loadingState,
    error,
    refetch: execute
  };
}

// Hook for paginated data
export function usePaginatedApi<T>(
  apiCall: (page: number, limit: number) => Promise<ApiResponse<T[]>>,
  initialPage: number = 1,
  initialLimit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const execute = useCallback(async () => {
    setLoadingState('loading');
    setError(null);
    
    try {
      const response = await apiCall(page, limit);
      
      if (response.success) {
        setData(response.data);
        setTotal(response.data.length);
        setLoadingState('success');
      } else {
        setError(response.message);
        setLoadingState('error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoadingState('error');
    }
  }, [apiCall, page, limit]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    page,
    total,
    loadingState,
    error,
    setPage,
    refetch: execute
  };
}

// Hook for mutations (POST, PUT, DELETE)
export function useMutation<T, P = any>(
  apiCall: (params: P) => Promise<ApiResponse<T>>
) {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: P) => {
    setLoadingState('loading');
    setError(null);
    
    try {
      const response = await apiCall(params);
      
      if (response.success) {
        setLoadingState('success');
        return response.data;
      } else {
        setError(response.message);
        setLoadingState('error');
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoadingState('error');
      throw err;
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setLoadingState('idle');
    setError(null);
  }, []);

  return {
    mutate,
    loadingState,
    error,
    reset
  };
}

// Hook for real-time data updates
export function useRealTimeApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  interval: number = 30000
) {
  const { data, loadingState, error, refetch } = useApi(apiCall);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, interval);

    return () => clearInterval(intervalId);
  }, [refetch, interval]);

  return {
    data,
    loadingState,
    error,
    refetch
  };
}
