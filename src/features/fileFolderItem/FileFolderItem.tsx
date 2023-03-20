import {FileFolderIdentityType, FileManagerItemType, Item} from "../../app/types/fileManagerTypes";
import {FcFolder, FcImageFile} from "react-icons/fc";
import {FC} from "react";
import FileFolderControls from "../fileFolderControls/FileFolderControls";
import FileFolderName from "../fileFolderName/FileFolderName";
import {deleteFileManagerItem, updateFileManagerItem} from "../fileManager/fileManagerSlice";
import {useAppDispatch} from "../../app/hooks/hooks";

type FileFolderPresenterPropType = {
	item: FileManagerItemType
}

const FileFolderItem: FC<FileFolderPresenterPropType> = ({item}) => {
	const dispatch = useAppDispatch();
	
	const renameFile = (item: FileManagerItemType) => {
		dispatch(updateFileManagerItem(item.value))
	}
	
	const deleteItem = (data: FileFolderIdentityType) => {
		dispatch(deleteFileManagerItem(data))
	}
	
	return <div className="file-folder-item">
		{item.value.type === Item.FOLDER ? <FcFolder size={25} /> : <FcImageFile size={25} />}
		<FileFolderName item={item} onFileRename={renameFile} />
		<FileFolderControls type={item.value.type} id={item.value.id} onDelete={deleteItem} />
	</div>
}

export default FileFolderItem