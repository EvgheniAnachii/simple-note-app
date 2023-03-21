import {baseUrl} from "../../app/constants/apiConstants";
import {TreeValuePayloadType} from "../../app/types/types";
import {ItemType} from "../../app/types/fileManagerTypes";

export async function fetchData(options: RequestInit = {}) {
	const items = await fetch(`${baseUrl}/items`, options)
	const content = await fetch(`${baseUrl}/content`, options)
	
	return Promise.all([items.json(), content.json()])
}

export async function updateItem(item: TreeValuePayloadType<ItemType>) {
	return fetch(`${baseUrl}/items/${item.id}`, {
		method: 'PUT',
		body: JSON.stringify(item),
		headers: { 'Content-Type': 'application/json'}
	})
}

export async function deleteItem(id: number) {
	return fetch(`${baseUrl}/items/${id}`, {
		method: 'DELETE'
	})
}