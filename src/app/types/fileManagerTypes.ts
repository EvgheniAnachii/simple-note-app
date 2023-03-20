import {TreeValuePayloadType} from "./types";

export enum Item {
	FOLDER = 'folder',
	FILE = 'file'
}

export type ItemType = Item.FILE | Item.FOLDER
export type FileManagerItemType = {
	value: TreeValuePayloadType<ItemType>
	children: FileManagerItemType[]
}

export type FileFolderIdentityType = {
	type: ItemType,
	id: number
}