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
} {
  const [data, setData] = useState<T[]>(initData);

  const getSetData = useCallback(async () => {
    const projectsData = await getterFunction(initPayload);
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
  };
}
