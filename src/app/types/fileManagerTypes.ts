import {FileManagerItemPayload} from "./types";

export enum Item {
	FOLDER = 'folder',
	FILE = 'file'
}

export type ItemType = Item.FILE | Item.FOLDER

export type FileManagerItemNode = {
	value: FileManagerItemPayload<ItemType>
	children?: FileManagerItemNode[]
}

export type FileFolderIdentityType = {
	type: ItemType,
	id: string
}