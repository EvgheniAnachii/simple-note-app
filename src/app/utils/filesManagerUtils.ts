import {
	FileManagerItemType, ItemType
} from "../types/fileManagerTypes";
import {TreeValuePayloadType} from "../types/types";

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
			parent.children.push(child)
		}
	}
	
	return roots
}