import {Select} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";

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
    const [selectVal, setSelectVal] = useState(false)

    const { name, value } = field;
    const { setFieldValue } = form;
    const classes = useStyles();

    return (
      <Select
        name={name}
        value={value}
        MenuProps={{classes: { paper: classes.select }, style: { maxWidth: 0, maxHeight: 600},  disableScrollLock: false, }}
        defaultValue={''}
        style={{border: ((field.value.length === 0 && selectVal && '1px solid #E52F2F') 
        || (field.value.length === undefined && '1px solid #98E37E'))}}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
        onClick={() => {
          if(value.length === 0) {
            setSelectVal(true)
          }else if(value.length === undefined) {
            setSelectVal(false)
          }
        }}
        displayEmpty={true}
      >
        {children}
      </Select>
    );
  };

  export default CustomizedSelectForFormik