import React, { useRef } from 'react';
import List from '@material-ui/core/List';
import Folder from './Folder.js'

function buildHierarchy(folderObject, props, _hierarchy={}){
  return folderObject.map(({displayName, restriction, icon, children}) => {
    const hierarchy = {..._hierarchy, ...restriction}
    if(children == null){
      return (
        <Folder
          name={displayName}
          key={displayName}
          onClick={e => props.onClickFile != null && props.onClickFile(e, hierarchy)}
          {...{icon:icon ? icon : null}}
          {...props.properties}
        />
      )
    }else{
      return (
        <Folder
          name={displayName}
          key={displayName}
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
