import React, {useEffect} from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks/hooks";
import {getFileManagerData, getFilesFoldersData} from "./features/fileManager/fileManagerSlice";
import FileManager from "./features/fileManager/FileManager";

function App() {
  const filesAndFolders = useAppSelector(getFilesFoldersData);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getFileManagerData())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>
      <FileManager treeItems={filesAndFolders} />
    </div>
  );
}

export default App;
