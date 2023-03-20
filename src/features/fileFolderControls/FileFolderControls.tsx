import {FC} from "react";
import {FileFolderIdentityType, Item, ItemType} from "../../app/types/fileManagerTypes";
import { RiAddCircleFill, RiDeleteBinLine } from "react-icons/ri";

type FileFolderControlsPropsType = {
	isToDisplay?: boolean
	type: ItemType
	id: number
	onDelete: (data: FileFolderIdentityType) => void
	onHover?: (ev: Event) => void
}

const FileFolderControls: FC<FileFolderControlsPropsType> = ({
     type, isToDisplay = true, id, onDelete}
) => {
	const deleteItem = () => onDelete({ type, id })
	
	return <>
		{isToDisplay ?
			<>
				{type === Item.FOLDER ? <RiAddCircleFill/> : <></>}
				<RiDeleteBinLine onClick={deleteItem} />
			</> : null}
	</>
}

export default FileFolderControls