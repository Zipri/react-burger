import { useCallback, useState } from 'react';

type TInputEvent = React.ChangeEvent<HTMLInputElement>;

export const useForm = <T extends Record<string, string>>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = useCallback(
    (field: keyof T) => (event: TInputEvent) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const setAll = useCallback((nextState: T) => {
    setValues(nextState);
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
  }, [initialState]);

  return {
    values,
    setAll,
    reset,
    handleChange,
  };
};
