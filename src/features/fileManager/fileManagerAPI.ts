import {baseUrl} from "../../app/constants/apiConstants";

export async function fetchData(options: RequestInit = {}) {
	const items = await fetch(`${baseUrl}/items`, options)
	const content = await fetch(`${baseUrl}/content`, options)
	
	return Promise.all([items.json(), content.json()])
}