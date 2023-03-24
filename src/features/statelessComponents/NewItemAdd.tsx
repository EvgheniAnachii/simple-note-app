import {Item, ItemType} from '../../app/types/fileManagerTypes'
import React, {FC, useRef} from 'react'
import {FileManagerItemPayload} from '../../app/types/types'
import {FcFolder, FcImageFile} from 'react-icons/fc'
import {GiConfirmed} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {isEnterPressed} from '../../app/utils/filesManagerUtils'

type NewItemAddPropsType = {
	item: FileManagerItemPayload<ItemType> | null
	onConfirm: (item: FileManagerItemPayload<ItemType>) => void
	onCancel: () => void
}

const NewItemAdd: FC<NewItemAddPropsType> = ({item, onCancel, onConfirm}) => {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)
	
  const onEscOrEnter = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.code === 'Escape') onCancel()
    if (isEnterPressed(ev.code) && item && inputRef?.current.value) {
      onConfirm({...item, name: inputRef?.current.value})
    }
  }
	
  return <>
    {item?.type === Item.FOLDER ? <FcFolder size={25} /> : <FcImageFile size={25} />}
    <input autoFocus style={{width: '100px'}} ref={inputRef} onKeyUp={onEscOrEnter} />
    {item && <>
      <GiConfirmed onClick={() => onConfirm({...item, name: inputRef?.current.value})} />
      <AiFillCloseCircle onClick={onCancel} />
    </>}
  </>
}

export default NewItemAdd