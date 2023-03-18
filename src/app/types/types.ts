export type TreeType<T> = {
	id: string
	type: T
	hierarchy: string []
}

export type TreeValueType<T> = {
	type: T
	id: string
}