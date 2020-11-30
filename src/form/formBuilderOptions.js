import React from 'react'
import get from 'lodash/get'
import { DDDroppable } from "../components/dragAndDrop/dDDroppable"
import { DraggableItem } from "../components/dragAndDrop/draggableItem"
import map from 'lodash/fp/map'
import entries from 'lodash/fp/entries'
import flow from 'lodash/fp/flow'
import cond from 'lodash/fp/cond'
import stubTrue from 'lodash/fp/stubTrue'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Grid,
  Card
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minHeight: 50,
    padding: 10
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

const getNull = _ => null

function FormListOptions({ formElementValues }) {

  const hasItems = (items) => items && items.length
  const classes = useStyles()

  const currentItem = ([index, item]) => (
    <DraggableItem key={item.elementvalueId} draggableId={item.elementvalueId} index={index}>
      <Card className={classes.root} variant="outlined">
      <Grid 
      container
      direction="column"
      justify="center"
      alignItems="center"
      >
        <TextField id={item.elementvalueId} name={item.elementvalueId} label="Opción" placeholder="Ingrese nombre" value={item.displayName} onChange={() => { }} value={get(item, 'displayName')} variant="outlined" size="small" />
      </Grid>
      </Card>
    </DraggableItem>
  )

  return cond([
    [hasItems, flow(entries, map(currentItem))],
    [stubTrue, getNull]
  ])(formElementValues)

}

function FormBuilderOptions(props) {
  const { formElementValues, type } = props;

  return (
    <DDDroppable droppableId={type} type={type}>
      <FormListOptions formElementValues={formElementValues} />
    </DDDroppable>
  )
}

export default FormBuilderOptions;
