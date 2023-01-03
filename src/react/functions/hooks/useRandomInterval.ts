import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

export const useRandomInterval = (
  callback: Function,
  minDelay: number,
  maxDelay: number
) => {
  const timeoutId = useRef<number | undefined>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let isEnabled =
      typeof minDelay === 'number' && typeof maxDelay === 'number';

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = _.random(minDelay, maxDelay);

        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();

          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }

    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
};
