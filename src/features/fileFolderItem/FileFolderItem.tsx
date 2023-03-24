import {
  ExpandCollapseAction,
  FileFolderIdentityType,
  FileManagerItemNode,
  Item,
  ItemsVisibility,
  ItemType
} from '../../app/types/fileManagerTypes'
import {FcImageFile} from 'react-icons/fc'

import {FC, useState} from 'react'
import FileFolderControls from '../fileFolderControls/FileFolderControls'
import FileFolderName from '../fileFolderName/FileFolderName'
import {
  createNewItem,
  deleteFileManagerItem,
  getTreeFilesFolders,
  updateFileManagerItem
} from '../fileManager/fileFolderItemsSlice'
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks'
import {FileManagerItemPayload} from '../../app/types/types'
import NewItemAdd from '../statelessComponents/NewItemAdd'
import {addVisibilityForNewItem, updateExpandCollapseState} from '../fileManager/metaDataSlice'
import Folder from '../statelessComponents/Folder'

type FileFolderPresenterPropType = {
	item: FileManagerItemNode
	visibility: ItemsVisibility
}

const FileFolderItem: FC<FileFolderPresenterPropType> = ({item, visibility}) => {
  const dispatch = useAppDispatch()
  const filesAndFolders = useAppSelector(getTreeFilesFolders)
  const [isAddInProgress, setIsAddInProgress] = useState<boolean>(false)
  const [futureItem, setFutureItem] = useState<FileManagerItemPayload<ItemType>|null>(null)
	
  const renameFile = (item: FileManagerItemNode) => {
    dispatch(updateFileManagerItem(item.value))
  }
	
  const deleteItem = (data: FileFolderIdentityType) => {
    dispatch(deleteFileManagerItem(data))
  }
	
  const addNewItem = (data: FileManagerItemPayload<ItemType>) => {
    dispatch(createNewItem(data))
    cancelAddingNewItem()
    dispatch(addVisibilityForNewItem({ expandable: data.type === Item.FOLDER, id: data.id, parentId: data.parentId }))
  }
	
  const startAddingNewItem = (data: { id: string, type: ItemType, parentId: string }) => {
    setIsAddInProgress(true)
    setFutureItem({...data, name: '', refId: 0})
  }
	
  const cancelAddingNewItem = () => {
    setFutureItem(null)
    setIsAddInProgress(false)
  }
  
  const collapseExpand = () => {
    const payload = {
      tree: filesAndFolders,
      id: item.value.id,
      actionType: visibility.isExpanded ? ExpandCollapseAction.COLLAPSE : ExpandCollapseAction.EXPAND
    }

    dispatch(updateExpandCollapseState(payload))
  }
	
  return <>
    <div className="file-folder-item">
      {item.value.type === Item.FOLDER ? <Folder isExpended={visibility.isExpanded} onClick={collapseExpand} /> : <FcImageFile size={25} />}
      <FileFolderName item={item} onFileRename={renameFile} />
      <FileFolderControls
        expandable={item.value.type === Item.FOLDER}
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