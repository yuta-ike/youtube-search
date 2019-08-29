import React from 'react';
import List from '@material-ui/core/List';
import Folder from './Folder.js'

function buildHierarchy(folderObject, props, _hierarchy={}){
    return Object.entries(folderObject).map(([folderName, {dbname, dbtype, icon, children}], i) => {
        const hierarchy = {..._hierarchy, [dbtype]: dbname}
        if(children == null){
          return (
            <Folder
              name={folderName}
              key={i}
              onClick={e => props.onClickFile != null && props.onClickFile(e, hierarchy)}
              {...{icon:icon ? icon : null}}
            />
          )
        }else{
          return (
            <Folder
              name={folderName}
              key={i}
              onClick={e => props.onClickFolder != null && props.onClickFolder(e, hierarchy)}
            >
              {buildHierarchy(children, props, {...hierarchy})}
            </Folder>
          )
        }
    })
}
// console.log(buildHierarchy(folderStructure))
//50も取ってこないようにする
export default function FolderHierarchy(props){
  return (
    <List>
      {buildHierarchy(props.folderStructure, props, {})}
    </List>
  )
}


{/*<Folder name='wldd'>
  <Folder name='2017'>
    <Folder name='open'
      onClick={async () => dispatchEvent('GRID_OPERATION', await actionCreate('We Love Double Dutch', 2017, 'OPEN'))}></Folder>
  </Folder>
  <Folder name='2016'>
    <Folder name='open'></Folder>
    <Folder name='novice'></Folder>
  </Folder>
</Folder>
<Folder name='ddcw'>
  <Folder name='2018'>
    <Folder name='open'></Folder>
    <Folder name='novice'></Folder>
  </Folder>
  <Folder name='2017'>
    <Folder name='open'></Folder>
    <Folder name='novice'></Folder>
  </Folder>
</Folder>*/}
