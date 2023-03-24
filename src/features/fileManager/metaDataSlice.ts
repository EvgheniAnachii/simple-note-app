import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FileManagerItemPayload} from '../../app/types/types'
import {
  ExpandCollapseActionType,
  FileFolderIdentityType,
  Item,
  ItemsVisibility,
  ItemType,
} from '../../app/types/fileManagerTypes'
import {assoc, clone, mergeRight} from 'ramda'
import {getCollapseExpandSettings} from '../../app/utils/filesManagerUtils'
import {RootState} from '../../app/store'

export type MetaDataState = Record<string, ItemsVisibility>
const initialState = {} as MetaDataState

const reducers = {
  setDefaultExpandCollapseState: (state: MetaDataState, action: PayloadAction<FileManagerItemPayload<ItemType>[]>) => {
    const settings: MetaDataState = {}
    action.payload.forEach((item) => {
      if (!item.parentId)
        settings[item.id] = {isExpanded: false, isDisplayed: true}
      else settings[item.id] = {isExpanded: false, isDisplayed: false}
    })
    return mergeRight(state, settings)
  },
  addVisibilityForNewItem: (state: MetaDataState, action: PayloadAction<FileFolderIdentityType & {parentId: string}>) => {
    const expanded = { isExpanded: false }
    const displayed = { isDisplayed: state[action.payload.parentId].isExpanded }
    const result = action.payload.type === Item.FOLDER ? { ...expanded, ...displayed } : displayed
    
    return assoc(action.payload.id, result, state) as MetaDataState
  },
  updateExpandCollapseState: (state: MetaDataState, action: PayloadAction<ExpandCollapseActionType>) => {
    const unfolded: MetaDataState = getCollapseExpandSettings(action.payload, clone(state))
    
    return {...state, ...unfolded}
  }
}

export const metaDataSlice = createSlice({name: 'metaData', initialState, reducers})

export const getVisibilitySettings = (state: RootState) => state.metaData

export const {setDefaultExpandCollapseState, updateExpandCollapseState, addVisibilityForNewItem} = metaDataSlice.actions

export default metaDataSlice.reducer