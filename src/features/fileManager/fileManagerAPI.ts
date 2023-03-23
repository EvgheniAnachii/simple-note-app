import {baseUrl} from '../../app/constants/apiConstants'
import {FileManagerItemPayload} from '../../app/types/types'
import {ItemType} from '../../app/types/fileManagerTypes'

export async function fetchData(options: RequestInit = {}) {
  const items = await fetch(`${baseUrl}/items`, options)
  const content = await fetch(`${baseUrl}/content`, options)
	
  return Promise.all([items.json(), content.json()])
}

export async function updateItem(item: FileManagerItemPayload<ItemType>) {
  return fetch(`${baseUrl}/items/${item.id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json'}
  })
}

export async function deleteItem(id: string) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE'
  })
}

export async function createItem(item: Partial<FileManagerItemPayload<ItemType>>) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json'}
  })
}