import React, {FC} from "react";
import {FileFolderIdentityType, Item, ItemType} from "../../app/types/fileManagerTypes";
import { RiAddCircleFill, RiDeleteBinLine } from "react-icons/ri";
import ItemCreateOptionsPopover from "../statelessComponents/itemCreateOptionsPopover/ItemCreateOptionsPopover";
import { v4 as uuidv4 } from 'uuid';
import {TreeValuePayloadType} from "../../app/types/types";

type FileFolderControlsPropsType = {
	isToDisplay?: boolean
	type: ItemType
	id: string
	onDelete: (data: FileFolderIdentityType) => void
	onHover?: (ev: Event) => void
	onAdd: (data: { id: string, type: ItemType, parentId: string }) => void
}

const FileFolderControls: FC<FileFolderControlsPropsType> = (props) => {
	const { type, isToDisplay = true, id, onDelete, onAdd } = props
	const deleteItem = () => onDelete({ type, id })
	
	const startAddingNewItem = (option: ItemType) => {
		onAdd({ id: uuidv4(), parentId: id, type: option })
	}
	
	return <>
		{isToDisplay ?
			<>
				{type === Item.FOLDER ? <ItemCreateOptionsPopover onOptionSelect={startAddingNewItem}><RiAddCircleFill /></ItemCreateOptionsPopover> : <></>}
				<RiDeleteBinLine onClick={deleteItem} />
			</> : null}
	</>
}

export default FileFolderControls