import {FileFolderIdentityType, FileManagerItemNode, Item, ItemType} from "../../app/types/fileManagerTypes";
import {FcFolder, FcImageFile} from "react-icons/fc";
import {FC, useState} from "react";
import FileFolderControls from "../fileFolderControls/FileFolderControls";
import FileFolderName from "../fileFolderName/FileFolderName";
import {createNewItem, deleteFileManagerItem, updateFileManagerItem} from "../fileManager/fileFolderItemsSlice";
import {useAppDispatch} from "../../app/hooks/hooks";
import {FileManagerItemPayload} from "../../app/types/types";
import NewItemAdd from "../statelessComponents/newItemAdd/NewItemAdd";

type FileFolderPresenterPropType = {
	item: FileManagerItemNode
}

const FileFolderItem: FC<FileFolderPresenterPropType> = ({item}) => {
	const [isAddInProgress, setIsAddInProgress] = useState<boolean>(false)
	const [futureItem, setFutureItem] = useState<FileManagerItemPayload<ItemType>|null>(null)
	const dispatch = useAppDispatch();
	
	const renameFile = (item: FileManagerItemNode) => {
		dispatch(updateFileManagerItem(item.value))
	}
	
	const deleteItem = (data: FileFolderIdentityType) => {
		dispatch(deleteFileManagerItem(data))
	}
	
	const addNewItem = (data: FileManagerItemPayload<ItemType>) => {
		dispatch(createNewItem(data))
		cancelAddingNewItem()
	}
	
	const startAddingNewItem = (data: { id: string, type: ItemType, parentId: string }) => {
		setIsAddInProgress(true)
		setFutureItem({...data, name: '', refId: 0})
	}
	
	const cancelAddingNewItem = () => {
		setFutureItem(null)
		setIsAddInProgress(false)
	}
	
	return <>
		<div className="file-folder-item">
			{item.value.type === Item.FOLDER ? <FcFolder size={25} /> : <FcImageFile size={25} />}
			<FileFolderName item={item} onFileRename={renameFile} />
			<FileFolderControls
				type={item.value.type}
				id={item.value.id}
				isRoot={!item.value.parentId}
				onDelete={deleteItem}
				onAdd={startAddingNewItem} />
		</div>
		{isAddInProgress && <div className="file-folder-item feature-item">
			<NewItemAdd item={futureItem} onCancel={cancelAddingNewItem} onConfirm={addNewItem} />
		</div>}
	</>
}

export default FileFolderItem