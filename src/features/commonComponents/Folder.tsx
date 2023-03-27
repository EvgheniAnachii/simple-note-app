import {createElement, FC} from 'react'
import {FcFolder, FcOpenedFolder} from 'react-icons/fc'

export type Folder = {
  isExpended: boolean,
  onClick: () => void
}

const Folder: FC<Folder> = ({isExpended, onClick}) => {
  const props = { size: 25, onClick }
  const componentType = isExpended ? FcOpenedFolder : FcFolder
  
  return createElement(componentType, props)
}

export default Folder