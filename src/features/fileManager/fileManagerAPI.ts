import {baseUrl} from "../../app/constants/apiConstants";
import {ContentPayloadType, FilesPayloadType, FolderPayloadType} from "../../app/types/fileManagerTypes";

type FetchDataType = [folders: FolderPayloadType, files: FilesPayloadType, content: ContentPayloadType]

export async function fetchData(options: RequestInit = {}) {
	const folders = await fetch(`${baseUrl}/folders`, options)
	const files = await fetch(`${baseUrl}/files`, options)
	const content = await fetch(`${baseUrl}/content`, options)
	
	return Promise.all([folders.json(), files.json(), content.json()])
}