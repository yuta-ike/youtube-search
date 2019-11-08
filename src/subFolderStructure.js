import FolderSpecialOpenIcon from '@material-ui/icons/FolderSpecialOutlined'
import HistoryIcon from '@material-ui/icons/History'

export default [
  {
    displayName:"Favorite",
    restriction:{category:"favorite",},
    icon:FolderSpecialOpenIcon,
    children:null,
  },
  {
    displayName:"WatchHistory（未実装）",
    restriction:{category:"history",},
    icon:HistoryIcon,
    children:null,
  },
]
