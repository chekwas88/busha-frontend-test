
import {useState, useEffect, useCallback} from 'react'
import { IAccount } from './util'
import { useAccountContext } from './context'

const useDataLoadable = (url:string, type:string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<IAccount[]>([])
    const [toggleRefetch, setRefetch] = useState<boolean>(false)
    const {addAccounts, accounts} = useAccountContext()
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network error");
            const data = await response.json();
           
            if(type === "account"){
                addAccounts(data)
            }else{
                 setData(data);
            }
            
            
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }, [url, addAccounts, type])

    useEffect(() => {
        // Simulate Loading
        setLoading(true)
        const timeId = setTimeout(fetchData, 500)
        return () => clearTimeout(timeId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, toggleRefetch])
   

    return {
        isLoading,
        error,
        data: type === "account" ? accounts : data,
        refetch: (b:boolean) => setRefetch(b),
        toggleRefetch,
        
    }
}

export default useDataLoadable

