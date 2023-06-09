import React, {useEffect} from 'react'
import './App.css'
import {useAppDispatch, useAppSelector} from './app/hooks/hooks'
import {getDataStatus, getFileManagerData, getTreeFilesFolders} from './features/fileManager/fileFolderItemsSlice'
import FileManager from './features/fileManager/FileManager'
import styled from 'styled-components'
import Loading from './features/commonComponents/Loading'

function App() {
  const filesAndFolders = useAppSelector(getTreeFilesFolders)
  const retrieveStatus = useAppSelector(getDataStatus)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getFileManagerData())
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        File Manager App
      </header>
      <LeftStyledWrapper>
        <Loading isLoading={retrieveStatus === 'loading'} />
        {retrieveStatus !== 'failed' ? <FileManager treeItems={filesAndFolders}/> : <div>Failed</div>}
      </LeftStyledWrapper>
    </div>
  )
}

export default App

const LeftStyledWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  
  ul, li {
    list-style: none;
  }
  
  .file-folder-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  
  .file-folder-item.feature-item {
    margin-left: 40px;
  }
  
  .file-folder-item:hover {
    opacity: 0.7;
  }
`
