import React from 'react'
import { ELEMENT_TYPE } from '../constants/contants'
import map from 'lodash/map'
import keys from 'lodash/keys'
import upperFirst from 'lodash/upperFirst'
import FormBuilderOptions from './formBuilderOptions'
import FormElementComponent from "./formElementComponent"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  Button,
  TextField,
  NativeSelect,
  InputLabel,
  Typography,
  Grid,
  IconButton,
  InputBase
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

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
}))(InputBase);


const useStyles = makeStyles({
  root: {
    minHeight: 120
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    padding: '0 0 0 8px'
  },
  margin: {
    marginTop: 10
  }
})

function getOptions() {
  return map(keys(ELEMENT_TYPE), (key) => <option key={key} value={ELEMENT_TYPE[key]} >{upperFirst(key.toLowerCase())} </option>)
}

function FormEditElement(props) {
  const classes = useStyles()

  const { element, onRemElement, onChange, onDragEnd, editMode, onToggle, onAddOption } = props
  let textInput = React.createRef()

  const onChangeDisplayName = onChange('displayName')
  const onChangeType = onChange('type')

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddOption(element.elementId, textInput.current.value);
      textInput.current.value = ''
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{marginBottom: 10}}
        >
          <Grid>
            <Typography variant="h6" component="h3">
              Componente
            </Typography>
          </Grid>
          <Grid>
            <IconButton className={classes.button} aria-label="edit" color="default" onClick={() => onToggle(element.elementId)}>
              <EditIcon />
            </IconButton>
            <IconButton className={classes.button} aria-label="delete" color="secondary" onClick={onRemElement}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>


        <Grid>
          {!editMode[element.elementId] ? <FormElementComponent element={element} /> :
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              style={{ marginTop: 10 }}
            >
              <Grid>
                <TextField id="inputName" label="Nombre" placeholder="Ingrese nombre" value={element.displayName} onChange={(e) => onChangeDisplayName(e.target.value)} variant="outlined" size="small" />
              </Grid>
              <Grid>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="demo-customized-select-native">Tipo</InputLabel>
                  <NativeSelect
                    id="inputType"
                    value={element.type}
                    onChange={(e) => onChangeType(e.target.value)}
                    input={<BootstrapInput />}

                  >
                    {getOptions()}
                  </NativeSelect>
                </FormControl>
              </Grid>

              {element.type === ELEMENT_TYPE.SIMPLE_SELECT || element.type === ELEMENT_TYPE.RADIO ?
                <React.Fragment>
                  <Grid>
                    <FormBuilderOptions formElementValues={element.formElementValues} type={element.elementId} onDragEnd={onDragEnd} />
                  </Grid>
                  <Grid>
                    <TextField id="inputName" label="Nombre" placeholder="Ingrese nombre" ref={textInput} onKeyPress={handleKeyPress} variant="outlined" size="small" />
                  </Grid>
                </React.Fragment>
                : null}
            </Grid>}
        </Grid>
      </CardContent>
    </Card>
  )

}

export default FormEditElement
