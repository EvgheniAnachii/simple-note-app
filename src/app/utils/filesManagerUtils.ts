import {FileManagerItemType, Item} from "../types/fileManagerTypes";

export const getTree = (): FileManagerItemType[] => {
	return [
		{
			value: { type: Item.FOLDER, id: 'folder-1', name: 'Folder 1' },
			children: []
		},
		{
			value: { type: Item.FILE, id: 'file-23', name: 'File 1' },
			children: []
		}
	]
}