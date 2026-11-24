import { useEffect, useState } from 'react';

/**
 * Menunda pembaruan nilai sampai pengguna berhenti mengetik
 * selama durasi delay (ms).
 */
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
