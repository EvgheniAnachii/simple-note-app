import {FC} from "react";
import {FileManagerItemType} from "../../app/types/fileManagerTypes";

export type FileManagerPropsType = {
	treeItems: FileManagerItemType[]
}

const FileManager: FC<FileManagerPropsType> = ({ treeItems }) => {
	return <ul>
		{treeItems.map(item => {
			return <li>
				<span>{item.value.name}</span>
				{item.children.length ? <FileManager treeItems={item.children} /> : null }
			</li>
		})}
	</ul>
}

export default FileManager