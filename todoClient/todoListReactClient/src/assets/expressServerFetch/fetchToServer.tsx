import { useEffect, useState } from "react";
interface ApiResponse<T>{
    data: T|null
    error: any;
    isLoading: boolean
}
let mainUrl = "http://localhost:3000/"
/**
 * Denne "react Hooken" vil kunne oppdatere data dependency etter en api call, og jeg kan bruke den til å sette f.eks en loading 
 * @param url URL til api, er brukt som en dependancy i useEffect via arrayet i bunn sånn at useEffect kun kjører når url endrer seg.
 *
 * @returns et array med data og evt. errors som kan destruktureres og brukes.
 * 
 */
export function useFetchApi<T>(url: string, options: RequestInit): ApiResponse<T>{
    const [data, setData] = useState<T|null>(null)
    const [error, setError] = useState<any>(null)
    const isLoading = data===null && error===null ? true : false

    useEffect(()=>{
        const fetchApi = async()=>{
            if (url === mainUrl) return
            try{
            const response = options ? await fetch(url, options) : await fetch(url)
            const result = await response.json()
            setData(result)
            } catch (error){
                setError({message: "Failed to fetch data", error: error})
            }
        }
        fetchApi();
    }, [url])
    return {data, error, isLoading}
}
