import {FileFolderIdentityType, FileManagerItemType, ItemType} from "../../app/types/fileManagerTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteItem, fetchData, updateItem} from "./fileManagerAPI";
import {getTree} from "../../app/utils/filesManagerUtils";
import {RootState} from "../../app/store";
import {assoc, filter, indexBy, map, mergeRight, omit, pipe, prop, propEq, values} from "ramda";
import {TreeValuePayloadType} from "../../app/types/types";

export interface FileManagerState {
	items: Record<string, TreeValuePayloadType<ItemType>>
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
	async (item: TreeValuePayloadType<ItemType>) => {
		await updateItem(item)
		return item
	}
)

export const deleteFileManagerItem = createAsyncThunk(
	'fileManager/deleteItem',
	async (item: FileFolderIdentityType, { rejectWithValue, dispatch, getState }) => {
		try {
			const items = getPayloadItems(getState() as RootState)
			const ids = pipe<any, any, any, any>(
				values,
				filter(propEq('parentId', item.id)),
				map((item: any) => item.id)
			)(items)
			const arr = [...ids, item.id]
			
			await Promise.all(arr.map(id => deleteItem(id)))
			const response = await fetchData()
			console.log('upde: ', response[0])
			return response[0]
		} catch (error: any) {
			rejectWithValue(error.message)
		}
	}
)

export const fileManagerSlice = createSlice({
	name: 'fileManager',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFileManagerData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getFileManagerData.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = {...state.items, ...indexBy(prop('id'), action.payload)}
			})
			.addCase(getFileManagerData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload
			})
			// updateFileManagerItem
			.addCase(updateFileManagerItem.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(updateFileManagerItem.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items[action.payload.id] = action.payload
			})
			.addCase(updateFileManagerItem.rejected, (state) => {
				state.status = 'failed';
			})
			// deleteFileManagerItem
			.addCase(deleteFileManagerItem.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(deleteFileManagerItem.fulfilled, (state, action) => {
				state.status = 'idle';
				/*const ids = pipe<any, any, any, any>(
					values,
					filter(propEq('parentId', action?.payload?.id)),
					map((item: any) => item.id)
				)(state.items)*/
				console.log('========', {...indexBy(prop('id'), action.payload)})
				state.items = {...indexBy(prop('id'), action.payload)}
				/*ids.forEach((id: any) => {
					delete state.items[id]
				})*/
				
			})
			.addCase(deleteFileManagerItem.rejected, (state) => {
				state.status = 'failed';
			});
	}
})

export const getTreeFilesFolders = (state: RootState) => {
	return pipe(values, getTree)(state.fileManager.items)
}

export const getPayloadItems = (state: RootState) => state.fileManager.items

export const {} = fileManagerSlice.actions

export default fileManagerSlice.reducer
