import {Select} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";

const useStyles = makeStyles({
    select: {
        "& ul": {
            backgroundColor: "#FFFFFF",
        },
        "& li": {
          padding: '10px',
          fontSize: 16,
        },
    },
  });

const CustomizedSelectForFormik = ({children, form, field }) => {
    const [selectVal, setSelectVar] = useState(false) 

    const { name, value } = field;
    const { setFieldValue } = form;
    const classes = useStyles();

    const styles = {
      border: `1px solid ${(selectVal && form.submitCount > 0 && form.initialValues.educations[0].degree_id === '' && '#E52F2F') || 
      (selectVal && form.initialValues.educations[0].degree_id !== '' && '#98E37E') || ('#BCBCBC')}`
    }
    console.log(form, field, children);
    return (
      <Select
        name={name}
        value={value}
        MenuProps={{classes: { paper: classes.select }, style: { maxWidth: 0, maxHeight: 600, position: 'absolute', }, disableScrollLock: true, }}
        style={styles}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
        onBlur={(e) => {
          setSelectVar(e.nativeEvent.isTrusted || false)
        }}
        displayEmpty={true}
      >
        {children}
      </Select>
    );
  };

  export default CustomizedSelectForFormik