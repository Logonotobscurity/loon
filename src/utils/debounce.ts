/**
 * Creates a debounced function that delays invoking `func` until after `waitFor` milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {F} func - The function to debounce.
 * @param {number} waitFor - The number of milliseconds to delay.
 * @returns {(...args: Parameters<F>) => void} A new debounced function.
 * @template F
 */
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
};