
export let mainUrl = "http://localhost:3000/"
/**
 * Denne "react Hooken" vil kunne oppdatere data dependency etter en api call, og jeg kan bruke den til å sette f.eks en loading 
 * @param url URL til api, er brukt som en dependancy i useEffect via arrayet i bunn sånn at useEffect kun kjører når url endrer seg.
 *
 * @returns et array med data og evt. errors som kan destruktureres og brukes.
 * 
 */
export async function useFetchApi(url: string, options?: RequestInit){
    try{
        const response = options ? await fetch(url, options) : await fetch(url)
        const result = await response.json()
        console.log(result)
        return {success: true, result}
    } catch (error){
        return {success: false, error}
    }
}
