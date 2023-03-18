import {useEffect, useState} from "react";

export const useGetData = (url: RequestInfo | URL, options: RequestInit = {}) => {
	const [state, setState] = useState<string>()
	
	useEffect(() => {
		(async function () {
			try {
				const res = await fetch(url, options)
				const data = await res.json()
				setState(data)
			} catch (err) {
				console.log('Data cannot be fetched!')
			}
			
		})()
	}, [])
	
	return state
}