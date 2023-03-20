import React, {useEffect} from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks/hooks";
import {getFileManagerData, getTreeFilesFolders} from "./features/fileManager/fileManagerSlice";
import FileManager from "./features/fileManager/FileManager";
import styled from "styled-components";

function App() {
  const filesAndFolders = useAppSelector(getTreeFilesFolders);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getFileManagerData())
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        Simple File Manager App
      </header>
      <LeftStyledWrapper>
        <FileManager treeItems={filesAndFolders} />
      </LeftStyledWrapper>
    </div>
  );
}

export default App;

const LeftStyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  
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
  
  .file-folder-item:hover {
    opacity: 0.7;
  }
`
