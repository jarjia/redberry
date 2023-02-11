import {Select} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  select: {
    "& ul": {
      backgroundColor: '#FFFFFF',
    },
    "& li": {
      padding: '10px',
      fontSize: 16,
    },
  },
});

const CustomizedSelectForFormik = ({children, form, field}) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    const classes = useStyles();

    return (
      <Select
        name={name}
        value={value}
        MenuProps={{classes: { paper: classes.select }, style: { maxWidth: 0, maxHeight: 600},  disableScrollLock: false, }}
        defaultValue={''}
        style={{border: ((field.value.length === 0 && form.submitCount > 0 && '1px solid #E52F2F') 
        || (field.value.length === undefined && '1px solid #98E37E'))}}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
        displayEmpty={true}
        id={name}
      >
        {children}
      </Select>
    );
  };

  export default CustomizedSelectForFormik