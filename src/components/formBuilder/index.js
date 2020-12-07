
import React from 'react'
import FormEditElement from "../../form/formEditElement"
import map from 'lodash/fp/map'
import entries from 'lodash/fp/entries'
import flow from 'lodash/fp/flow'
import cond from 'lodash/fp/cond'
import { ELEMENT_TYPE, ACTIONS, TYPES } from '../../constants/contants'
import { DraggableItem } from "../dragAndDrop/draggableItem"
import { DDDroppable } from "../dragAndDrop/dDDroppable"
import { DragDropContext } from "react-beautiful-dnd"
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core'
import {
  TextFormat as TextFormatIcon,
  ShortText as ShortTextIcon,
  Subject as SubjectIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  Lock as LockIcon,
  List as ListIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const getFalse = _ => false;
const getNull = _ => null;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
}));

function FormItems({ items, onRemElement, onChangeValue, onDragEnd, editMode, onToggle, onAddOption }) {

  const hasItems = (items) => items && items.length;

  const currentItem = ([index, item]) => (
    <DraggableItem key={item.elementId} draggableId={item.elementId} index={parseInt(index)}>
      <FormEditElement key={item.elementId} element={item} onRemElement={() => onRemElement(item.elementId)}
        onChange={onChangeValue(item.elementId)} onDragEnd={onDragEnd} editMode={editMode}
        onToggle={onToggle} onAddOption={onAddOption} />
    </DraggableItem>)

  return cond([
    [hasItems, flow(entries, map(currentItem))],
    [getFalse, getNull]
  ])(items)

}

function Form(props) {
  const { onDragEnd, items, onRemElement, onChangeValue, editMode, onToggle, onAddOption } = props;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DDDroppable droppableId="droppable" type={TYPES.MAIN}>
        <FormItems items={items} onRemElement={onRemElement} onChangeValue={onChangeValue} onDragEnd={onDragEnd} editMode={editMode} onToggle={onToggle} onAddOption={onAddOption} />
      </DDDroppable>
    </DragDropContext>
  )
}



function FormBuilder({ state, dispatch , showJson }) {
  const classes = useStyles()
  
  const onAddElement = (elementType) => dispatch({ type: ACTIONS.ADD_ELEMENT, elementType })
  const onRemElement = (elementId) => dispatch({ type: ACTIONS.REM_ELEMENT, elementId })
  const onChangeValue = (elementId) => (key) => (value) => { dispatch({ type: ACTIONS.CHANGE_VALUE, key, value, elementId }) }

  const onDragEnd = (result) => {
    if (result.type === TYPES.MAIN) {
      dispatch({ type: ACTIONS.DRAG_END, result })
    }
    else {
      dispatch({ type: ACTIONS.OPTION_DRAG_END, result })
    }
  }

  const onToggle = (elementId) => dispatch({ type: ACTIONS.CHANGE_EDIT_MODE, elementId })
  const onAddOption = (elementId, value) => dispatch({ type: ACTIONS.ADD_OPTION, elementId, value })

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Form items={state.items} onDragEnd={onDragEnd} onRemElement={onRemElement} onChangeValue={onChangeValue} editMode={state.editMode} onToggle={onToggle} onAddOption={onAddOption} />
      <Grid>
        <Typography variant="h4" color="primary">Components</Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<TextFormatIcon />} onClick={() => onAddElement(ELEMENT_TYPE.PRINT)} >Label</Button>
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<ShortTextIcon />} onClick={() => onAddElement(ELEMENT_TYPE.TEXT)} >Text</Button>
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<SubjectIcon />} onClick={() => onAddElement(ELEMENT_TYPE.TEXTAREA)} >Text Area</Button>
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<LockIcon />} onClick={() => onAddElement(ELEMENT_TYPE.PASSWORD)} >Password</Button>
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<CheckBoxIcon />} onClick={() => onAddElement(ELEMENT_TYPE.CHECKBOX)} >Checkbox</Button>
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<RadioButtonCheckedIcon />} onClick={() => onAddElement(ELEMENT_TYPE.RADIO)} >Radio</Button>
        <Button variant="outlined" color="primary" className={classes.button} startIcon={<ListIcon />} onClick={() => onAddElement(ELEMENT_TYPE.SIMPLE_SELECT)} >Select</Button>
      </Grid>
      {
        showJson &&
        <Grid>
          <pre>{JSON.stringify(state.items, null, 2)}</pre>
        </Grid>
      }
    </Grid>
  )
}

export default FormBuilder;
