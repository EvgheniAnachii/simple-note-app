import {
	FileManagerItemType, ItemType
} from "../types/fileManagerTypes";
import {TreeValuePayloadType} from "../types/types";
import {anyPass, curry, equals, filter, includes, indexBy, map, pipe, prop, propEq, values} from "ramda";
import {PayloadAction} from "@reduxjs/toolkit";

export const getTree = (items: TreeValuePayloadType<ItemType>[]): FileManagerItemType[] => {
	const roots: FileManagerItemType[] = []
	const mapping = items.reduce<Record<string, FileManagerItemType>>((acc, item) => {
		acc[item.id] = {value: item, children: []}
		if (!item.parentId)
			roots.push(acc[item.id])
		return acc
	}, {})
	
	for(const item of items) {
		if (item.parentId) {
			const parent = mapping[item.parentId]
			const child = mapping[item.id]
			parent?.children?.push(child)
		}
	}
	
	return roots
}

export const itemsPayloadIdentity = (items: Record<string, TreeValuePayloadType<ItemType>>) => items

export const getItemPayloadIds = curry((items, item) => pipe(
	itemsPayloadIdentity,
	values,
	filter(propEq('parentId', item.id)),
	map((item: any) => item.id)
)(items))

export const removeDeletedItems = (action: PayloadAction<{ids: [], items: {}}>) => pipe(
	itemsPayloadIdentity,
	values,
	filter<TreeValuePayloadType<ItemType>>(item => {
		if (!item.parentId) return true
		else if (includes(item.id, action.payload.ids)) return false
		else return !includes(item.parentId, action.payload.ids)
	}),
	indexBy(prop('id'))
)(action.payload.items)

export const isEnterPressed = anyPass([equals('Enter'), equals('NumpadEnter')])