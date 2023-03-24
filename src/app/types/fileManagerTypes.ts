import {FileManagerItemPayload} from './types'

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

export enum ExpandCollapseAction {
	EXPAND = 'expand',
	COLLAPSE = 'collapse'
}

export type ExpandCollapseType = ExpandCollapseAction.EXPAND | ExpandCollapseAction.COLLAPSE

export type ExpandCollapseActionType = {
	tree: FileManagerItemNode[],
	id: string,
	actionType: ExpandCollapseType
}

export type ItemsVisibility = { isExpanded: boolean, isDisplayed: boolean }