import { makeStyles } from '@material-ui/core/styles';
import SearchBoxGenerator from './SearchBox.js'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: "fixed",
    zIndex: 1,
    padding: "10px", //調整値
    height: "9%", //調整値
  },
  paper: {
    display: "flex",
    alignItems: 'center',
    backgroundColor: 'white',
    height: "100%",
  },
  input: {
    marginLeft: 8,
    flexGrow: 1,
  },
  iconButton: {
    padding: 10,
  },
});

export default SearchBoxGenerator(useStyles)
