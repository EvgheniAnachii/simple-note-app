import React, {FC} from 'react'
import {FileFolderIdentityType, Item, ItemType} from '../../app/types/fileManagerTypes'
import { RiAddCircleFill, RiDeleteBinLine } from 'react-icons/ri'
import ItemCreateOptionsPopover from '../statelessComponents/ItemCreateOptionsPopover'
import { v4 as uuidv4 } from 'uuid'

type FileFolderControlsPropsType = {
	isToDisplay?: boolean
	expandable: boolean
	id: string
	isRoot: boolean
	onDelete: (data: FileFolderIdentityType) => void
	onHover?: (ev: Event) => void
	onAdd: (data: { id: string, type: ItemType, parentId: string }) => void
}

const FileFolderControls: FC<FileFolderControlsPropsType> = (props) => {
  const { expandable, isToDisplay = true, id, isRoot, onDelete, onAdd } = props
  const deleteItem = () => onDelete({ expandable, id })
	
  const startAddingNewItem = (option: ItemType) => {
    onAdd({ id: uuidv4(), parentId: id, type: option })
  }
	
  return <>
    {isToDisplay ?
      <>
        { expandable ?
          <ItemCreateOptionsPopover onOptionSelect={startAddingNewItem}>
            <RiAddCircleFill />
          </ItemCreateOptionsPopover> : null
        }
        {!isRoot && <RiDeleteBinLine onClick={deleteItem}/>}
      </> : null}
  </>
}

export default FileFolderControls