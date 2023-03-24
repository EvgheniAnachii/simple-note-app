import {FC} from 'react'
import {FileManagerItemNode} from '../../app/types/fileManagerTypes'
import FileFolderItem from '../fileFolderItem/FileFolderItem'
import {useAppSelector} from '../../app/hooks/hooks'
import {getVisibilitySettings} from './metaDataSlice'

export type FileManagerPropsType = {
	treeItems: FileManagerItemNode[]
}

const FileManager: FC<FileManagerPropsType> = ({treeItems}) => {
  const visibilitySettings = useAppSelector(getVisibilitySettings)
  
  return <ul>
    {treeItems.map(item => {
      return <li
        key={item.value.id}
        className={`${item.value.type}
          ${visibilitySettings[item.value.id].isExpanded ? 'expanded' : 'collapsed'}
          ${visibilitySettings[item.value.id].isDisplayed ? 'displayed' : 'hidden'}`}>
        <FileFolderItem item={item} visibility={visibilitySettings[item.value.id]}/>
        {item?.children?.length ? <FileManager treeItems={item.children}/> : null}
      </li>
    })}
  </ul>
}

export default FileManager