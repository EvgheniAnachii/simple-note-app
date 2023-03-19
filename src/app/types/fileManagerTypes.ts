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

type FileType = {
	id: string,
	name: string,
	contentId: string
}

type ContentType = {
	fileId: string,
	content: string
}

export type FolderPayloadType = {
	id: string,
	name: string,
	hierarchy: string[],
	fileIds: string[]
}

export type FilesPayloadType = Record<string, FileType>

export type ContentPayloadType = Record<string, ContentType>