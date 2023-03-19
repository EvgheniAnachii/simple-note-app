export type TreeType<T> = {
	id: string
	type: T
	path: string
}

export type TreeValueType<T> = {
	type: T
	id: number
}

export type TreeValuePayloadType<T> = {
	id: number
	type: T
	name: string
	refId: number
	parentId: number
}