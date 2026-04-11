import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data fetching hook
 * @param {string} url - API endpoint
 * @param {object} options - fetch options
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json.data || json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
