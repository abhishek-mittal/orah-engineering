import { DependencyList, useEffect } from "react";
import useTimeoutFn from "./use-timeout";

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(
  fn: Function,
  ms = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
