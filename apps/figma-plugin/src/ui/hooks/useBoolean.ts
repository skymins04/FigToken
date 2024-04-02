import { useCallback, useState } from "react";

export const useBoolean = (
  initValue: boolean = false
): readonly [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  },
] => {
  const [state, setState] = useState(initValue);

  const on = useCallback(() => setState(true), [setState]);
  const off = useCallback(() => setState(false), [setState]);
  const toggle = useCallback(() => setState((v) => !v), [setState]);

  return [state, { on, off, toggle, set: setState }];
};
