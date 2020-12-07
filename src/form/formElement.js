import React from 'react'
import map from 'lodash/map'
import get from 'lodash/get'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  TextField,
  Typography,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
  InputBase,
  InputLabel,
  NativeSelect
} from '@material-ui/core'

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase)

export const RadioOption = ({ item, currentValue, handleChange, readOnly }) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" id={item.elementvalueId} disabled={readOnly}
        value={item.elementvalueId} checked={item.elementvalueId === currentValue} onChange={handleChange} />
      <label className="form-check-label" htmlFor={item.elementvalueId}>
        {item.displayName}
      </label>
    </div>
  )
}

function getOptionList(formElementValues) {
  const list = formElementValues && formElementValues.length ? map(formElementValues, (item) => {
    return (
      <option key={item.elementvalueId} value={item.elementvalueId}>{item.displayName}</option>
    )
  }) : null

  return list
}

export const SimpleSelectElement = (props) => {

  const { valueMap, element, handleChange } = props
  const { formElementValues } = element

  return (
    <FormControl >
      <InputLabel htmlFor={element.elementId}>{element.displayName}</InputLabel>
      <NativeSelect
        id={element.elementId}
        disabled={element.readOnly}
        value={get(valueMap, element.elementId)}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {getOptionList(formElementValues)}
      </NativeSelect>
    </FormControl>
  )
}

export const PasswordElement = (props) => {
  const { valueMap, element, handleChange } = props
  return (
    <TextField
      type="password"
      placeholder={element.placeholder}
      onChange={handleChange}
      error={element.displayError}
      name={element.elementId}
      id={element.elementId}
      label={element.displayName}
      defaultValue={get(valueMap, element.elementId)}
      helperText={element.displayError}
      variant="outlined"
      disabled={element.readOnly}
      size="small"
    />
  )
}

export const CheckboxElement = (props) => {
  const { valueMap, element, handleChange } = props

  return (
    <FormControlLabel
      disabled={element.readOnly}
      control={
        <Checkbox
          checked={get(valueMap, element.elementId)}
          onChange={handleChange}
          name={element.elementId}
        />
      }
      label={element.displayName}
    />
  )
}

export const LabelElement = (props) => {
  const { element } = props
  return (
    <Typography >{element.displayName}</Typography>
  )
}



export const TextElement = (props) => {

  const { valueMap, element, handleChange } = props

  return (
    <TextField
      onChange={handleChange}
      error={element.displayError}
      name={element.elementId}
      placeholder={element.placeholder}
      id={element.elementId}
      label={element.displayName}
      defaultValue={get(valueMap, element.elementId)}
      helperText={element.displayError}
      variant="outlined"
      disabled={element.readOnly}
      size="small"
    />
  )
}

export const TextAreaElement = (props) => {

  const { valueMap, element, handleChange } = props

  return (
    <TextField
      id={element.elementId}
      label={element.displayName}
      disabled={element.readOnly}
      multiline
      rows={3}
      onChange={handleChange}
      defaultValue={get(valueMap, element.elementId)}
      variant="outlined"
    />
  )
}


export const RadioElement = (props) => {

  const { valueMap, element, handleChange } = props
  const { formElementValues } = element;
  const currentValue = get(valueMap, element.elementId)
  const list = formElementValues && formElementValues.length ? map(formElementValues, (item) => <FormControlLabel key={item.elementvalueId} value={item.elementvalueId} control={<Radio />} label={item.displayName} disabled={element.readOnly} />) : null;


  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{element.displayName}</FormLabel>
      <RadioGroup aria-label="radio" name="radio" value={currentValue} onChange={handleChange} >
        {list}
      </RadioGroup>
    </FormControl>
  )
}
