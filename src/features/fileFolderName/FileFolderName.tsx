import {FileManagerItemNode} from "../../app/types/fileManagerTypes";
import React, {FC, useRef, useState} from "react";
import {assocPath} from "ramda";
import {isEnterPressed} from "../../app/utils/filesManagerUtils";

type FileFolderNamePropsType = {
	item: FileManagerItemNode,
	onFileRename: (item: FileManagerItemNode) => void
}

const FileFolderName: FC<FileFolderNamePropsType> = ({item, onFileRename}) => {
	const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)
	const [isEditName, setIsEditName] = useState<boolean>(false)
	
	const makeItemEditable = () => {
		setIsEditName(true)
	}
	
	const cancelItemToUpdate = (ev: React.KeyboardEvent<HTMLElement>) => {
		if (ev.code === 'Escape') setIsEditName(false)
		if (isEnterPressed(ev.code)) {
			onFileRename(assocPath(['value', 'name'], inputRef.current.value, item))
			setIsEditName(false)
		}
	}
	
	return <>
		{!isEditName ? <span onClick={makeItemEditable}>
			{item.value.name}
		</span> : <input onBlur={() => setIsEditName(false)} autoFocus ref={inputRef} onKeyUp={cancelItemToUpdate} />}
	</>
}

export default FileFolderName