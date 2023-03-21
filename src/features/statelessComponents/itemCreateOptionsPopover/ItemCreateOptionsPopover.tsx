import {Button, Popover} from "antd";
import React, {FC} from "react";
import {Item, ItemType} from "../../../app/types/fileManagerTypes";

const content = (selectOption: (actionType: ItemType) => () => void) => {
	return <div>
		<Button onClick={selectOption(Item.FOLDER)}>Create Folder</Button>
		<Button onClick={selectOption(Item.FILE)}>Create File</Button>
	</div>
}

type ItemCreateOptionsPopoverPropsType = {
	children: React.ReactNode
	onOptionSelect: (option: ItemType) => void
}
const ItemCreateOptionsPopover: FC<ItemCreateOptionsPopoverPropsType> = ({children, onOptionSelect}) => {
	const selectOption = (option: ItemType) => () => {
		onOptionSelect(option)
	}
	
	return <Popover content={content(selectOption)} trigger="click">
		<>{children}</>
	</Popover>
}

export default ItemCreateOptionsPopover