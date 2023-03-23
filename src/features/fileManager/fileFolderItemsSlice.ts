import {FileFolderIdentityType, ItemType} from '../../app/types/fileManagerTypes'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createItem, deleteItem, fetchData, updateItem} from './fileManagerAPI'
import {getItemPayloadIds, getTree, removeDeletedItems} from '../../app/utils/filesManagerUtils'
import {RootState} from '../../app/store'
import {assoc, indexBy, pipe, prop, values} from 'ramda'
import {FileManagerItemPayload} from '../../app/types/types'

export interface FileManagerState {
	items: Record<string, FileManagerItemPayload<ItemType>>
	status: 'idle' | 'loading' | 'failed'
	error: unknown
}

const initialState: FileManagerState = {
  items: {},
  status: 'idle',
  error: null
}

export const getFileManagerData = createAsyncThunk(
  'fileManager/fetchData',
  async () => {
    const response = await fetchData()
    const [items, content] = response
		
    return items
  }
)

export const updateFileManagerItem = createAsyncThunk(
  'fileManager/updateItem',
  async (item: FileManagerItemPayload<ItemType>) => {
    await updateItem(item)
    return item
  }
)

export const deleteFileManagerItem = createAsyncThunk(
  'fileManager/deleteItem',
  async (item: FileFolderIdentityType, { rejectWithValue, dispatch, getState }) => {
    try {
      const items = getPayloadItems(getState() as RootState)
      const ids = getItemPayloadIds(items, item)
      const arr = [...ids, item.id]
			
      await Promise.all(arr.map(id => deleteItem(id)))

      return {ids: [item.id, ...ids], items: getPayloadItems(getState() as RootState)} // response[0]
    } catch (error: any) {
      rejectWithValue(error.message)
      return {ids: [], items: {}}
    }
  }
)

export const createNewItem = createAsyncThunk(
  'fileManager/createItem',
  async (item: Partial<FileManagerItemPayload<ItemType>>) => {
    await createItem(item)
    return await fetchData()
  }
)

export const fileFolderItemsSlice = createSlice({
  name: 'fileManager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET
      .addCase(getFileManagerData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFileManagerData.fulfilled,  (state, action) => {
        const data = indexBy(prop('id'), action.payload)
				
        return {...assoc('items', data, state), status: 'idle'}
      })
      .addCase(getFileManagerData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
    // UPDATE
      .addCase(updateFileManagerItem.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateFileManagerItem.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items[action.payload.id] = action.payload
      })
      .addCase(updateFileManagerItem.rejected, (state) => {
        state.status = 'failed'
      })
    // DELETE
      .addCase(deleteFileManagerItem.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteFileManagerItem.fulfilled, (state, action) => {
        /* The alternative way to handle redux store updates could be: In the deleteFileManagerItem function
					after DELETE request was sent, make a call to backend to get all items and here we could
					just place these items without the need of use removeDeletedItems. *  */
        const updatedRecords = removeDeletedItems(action as any)
				
        return {...assoc('items', updatedRecords, state), status: 'idle'}
      })
      .addCase(deleteFileManagerItem.rejected, (state) => {
        state.status = 'failed'
      })
    // CREATE
      .addCase(createNewItem.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createNewItem.fulfilled, (state, action) => {
        const updated = indexBy(prop('id'), action.payload[0])
        return {...assoc('items', updated, state), status: 'idle'}
      })
      .addCase(createNewItem.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const getTreeFilesFolders = (state: RootState) => {
  return pipe(values, getTree)(state.filesAndFolders.items)
}

export const getPayloadItems = (state: RootState) => state.filesAndFolders.items
export const getDataStatus = (state: RootState) => state.filesAndFolders.status

export default fileFolderItemsSlice.reducer
