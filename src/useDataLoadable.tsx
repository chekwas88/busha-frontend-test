
import {useState, useEffect, useCallback} from 'react'
import { IAccount } from './util'

const useDataLoadable = (url:string) => {
    const [data, setData] = useState<IAccount[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [toggleRefetch, setRefetch] = useState<boolean>(false)

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network error");
            const data = await response.json();
            setData(data);
            
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }, [url])

    useEffect(() => {
        // Simulate Loading
        setLoading(true)
        const timeId = setTimeout(fetchData, 5000)
        return () => clearTimeout(timeId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, toggleRefetch])
   

    return {
        isLoading,
        error,
        data,
        refetch: (b:boolean) => setRefetch(b),
        toggleRefetch,
        
    }
}

export default useDataLoadable

