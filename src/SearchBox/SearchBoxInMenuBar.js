import { makeStyles } from '@material-ui/core/styles';
import SearchBoxGenerator from './SearchBox.js'

const useStyles = makeStyles({
  root: {
    width: 'atuo',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 0,
  },
  paper: {
    'padding-left': 10,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});

export default SearchBoxGenerator(useStyles)
