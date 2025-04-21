import { useEffect, RefObject } from 'react';

export function useClickOutside<
  T extends HTMLElement | null = HTMLElement | null,
>(ref: RefObject<T>, callback: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}
