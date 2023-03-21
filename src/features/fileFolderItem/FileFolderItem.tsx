import {FileFolderIdentityType, FileManagerItemType, Item, ItemType} from "../../app/types/fileManagerTypes";
import {FcFolder, FcImageFile} from "react-icons/fc";
import {FC, useState} from "react";
import FileFolderControls from "../fileFolderControls/FileFolderControls";
import FileFolderName from "../fileFolderName/FileFolderName";
import {createNewItem, deleteFileManagerItem, updateFileManagerItem} from "../fileManager/fileManagerSlice";
import {useAppDispatch} from "../../app/hooks/hooks";
import {TreeValuePayloadType} from "../../app/types/types";
import NewItemAdd from "../statelessComponents/newItemAdd/NewItemAdd";

type FileFolderPresenterPropType = {
	item: FileManagerItemType
}

const FileFolderItem: FC<FileFolderPresenterPropType> = ({item}) => {
	const [isAddInProgress, setIsAddInProgress] = useState<boolean>(false)
	const [futureItem, setFutureItem] = useState<TreeValuePayloadType<ItemType>|null>(null)
	const dispatch = useAppDispatch();
	
	const renameFile = (item: FileManagerItemType) => {
		dispatch(updateFileManagerItem(item.value))
	}
	
	const deleteItem = (data: FileFolderIdentityType) => {
		dispatch(deleteFileManagerItem(data))
	}
	
	const addNewItem = (data: TreeValuePayloadType<ItemType>) => {
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
				onDelete={deleteItem}
				onAdd={startAddingNewItem} />
		</div>
		{isAddInProgress && <div className="file-folder-item feature-item">
			<NewItemAdd item={futureItem} onCancel={cancelAddingNewItem} onConfirm={addNewItem} />
		</div>}
	</>
}

export default FileFolderItem