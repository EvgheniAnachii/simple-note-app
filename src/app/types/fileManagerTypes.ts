import {TreeValueType} from "./types";

export enum Item {
	FOLDER = 'folder',
	FILE = 'file'
}

export type ItemType = Item.FILE | Item.FOLDER

export type FileManagerItemType = {
	value: TreeValueType<ItemType> & { name: string }
	children: FileManagerItemType[]
}