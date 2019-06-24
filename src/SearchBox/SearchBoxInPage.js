import { makeStyles } from '@material-ui/core/styles';
import SearchBoxGenerator from './SearchBox.js'

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: "0 auto",
  },
  paper: {
    'padding-left': 10,
    margin: 28,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

export default SearchBoxGenerator(useStyles)
