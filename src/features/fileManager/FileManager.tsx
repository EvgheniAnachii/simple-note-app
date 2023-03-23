import {FC} from 'react'
import {FileManagerItemNode} from '../../app/types/fileManagerTypes'
import FileFolderItem from '../fileFolderItem/FileFolderItem'

export type FileManagerPropsType = {
	treeItems: FileManagerItemNode[]
}

const FileManager: FC<FileManagerPropsType> = ({ treeItems }) => {
	
  return <ul>
    {treeItems.map(item => {
      return <li key={item.value.id} className={`${item.value.type}`} >
        <FileFolderItem item={item} />
        {item?.children?.length ? <FileManager treeItems={item.children} /> : null }
      </li>
    })}
  </ul>
}

export default FileManager