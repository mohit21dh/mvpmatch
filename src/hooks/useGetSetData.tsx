import { useCallback, useEffect, useState } from "react"

export function useGetSetData<T, P>({
    initData,
    getterFunction,
    initPayload
}: {
    initData: T[],
    getterFunction: (payload?: P) => Promise<T[]>,
    initPayload?: P
}) {
    const [data, setData] = useState<T[]>(initData);

    const getSetData = useCallback(async () => {
        const projectsData = await getterFunction(initPayload);
        setData(projectsData)
    }, [initPayload]);

    useEffect(() => {
        getSetData();
    }, []);

    return {
        data,
        setData
    }
}