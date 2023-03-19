import {FileManagerItemType} from "../../app/types/fileManagerTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchData} from "./fileManagerAPI";
import {getTree} from "../../app/utils/filesManagerUtils";
import {RootState} from "../../app/store";
import {values} from "ramda";

export interface FileManagerState {
	value: FileManagerItemType[]
	status: 'idle' | 'loading' | 'failed'
}

const initialState: FileManagerState = {
	value: [],
	status: 'idle',
}

export const getFileManagerData = createAsyncThunk(
	'fileManager/fetchData',
	async () => {
		const response = await fetchData()
		const [items, content] = response
		
		return getTree({items, content})
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
				state.value = {...state.value, ...action.payload }
			})
			.addCase(getFileManagerData.rejected, (state) => {
				state.status = 'failed';
			});
	}
})

export const getFilesFoldersData = (state: RootState) => values(state.fileManager.value) as FileManagerItemType[]

export const {} = fileManagerSlice.actions

export default fileManagerSlice.reducer
