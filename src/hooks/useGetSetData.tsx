import { useCallback, useEffect, useState } from 'react';

export function useGetSetData<T, P>({
  initData,
  getterFunction,
  initPayload,
}: {
  initData: T[];
  getterFunction: (payload?: P) => Promise<T[]>;
  initPayload?: P;
}): {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  isLoading: boolean;
} {
  const [data, setData] = useState<T[]>(initData);
  const [isLoading, setIsLoading] = useState(false);

  const getSetData = useCallback(async () => {
    setIsLoading(true);
    const projectsData = await getterFunction(initPayload);
    setIsLoading(false);
    setData(projectsData);
  }, [initPayload]);

  useEffect(() => {
    getSetData().catch((err) => {
      console.error('some error while get set data', err);
    });
  }, []);

  return {
    data,
    setData,
    isLoading,
  };
}
