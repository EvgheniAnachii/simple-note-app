export type FileManagerItemPayload<T> = {
	id: string
	type: T
	name: string
	refId: number
	parentId: string
}