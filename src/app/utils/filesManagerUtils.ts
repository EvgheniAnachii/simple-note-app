import {
	ContentPayloadType,
	FileManagerItemType,
	FilesPayloadType,
	FolderPayloadType,
	Item
} from "../types/fileManagerTypes";

export const getTree = (folders: FolderPayloadType[], files: FilesPayloadType, content: ContentPayloadType): FileManagerItemType[] => {

	return [
		{
			value: { type: Item.FOLDER, id: 'folder-hi', name: 'Folder hi' },
			children: [
				{
					value: { type: Item.FOLDER, id: 'folder-hi-0', name: 'Folder hi-0' },
					children: [ { value: { type: Item.FILE, id: 'folder-hi-0-0', name: 'File hi-0-0' }, children: [] } ]
				},
				{
					value: { type: Item.FOLDER, id: 'folder-hi-1', name: 'Folder hi-1' },
					children: []
				}
			]
		},
		{
			value: { type: Item.FILE, id: 'file-hi', name: 'File hi' },
			children: []
		},
		{
			value: { type: Item.FOLDER, id: 'folder-by', name: "Folder by" },
			children: []
		},
		{
			value: { type: Item.FOLDER, id: 'folder-weather', name: "Folder weather" },
			children: [
				{
					value: { type: Item.FILE, id: 'file-weather-0', name: 'File weather 0'},
					children: []
				},
				{
					value: { type: Item.FILE, id: 'file-weather-1', name: 'File weather 1'},
					children: []
				}
			]
		}
	]
}