import React, { useReducer } from "react"
import FormElementComponent from '../../form/formElementComponent'
import orderBy from 'lodash/fp/orderBy'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import formRenderReducer from '../../reducers/formRender'
import { ACTIONS } from '../../constants/contants'
import {
  Grid,
  Button
} from '@material-ui/core'

function ListElements(props) {

  const { valueMap, setValue, formElements } = props

  return flow(orderBy('displayOrder', 'asc'), map((element) => {
    return (
      <Grid key={element.elementId} item xs={12} style={{ padding: '5px 0 5px 0' }}>
        <FormElementComponent
          formElements={formElements}
          element={element}
          setValue={setValue}
          valueMap={valueMap}
        />
      </Grid>)

  }))(formElements)
}


function init() {
  return { valueMap: {} }
}

export default function FormManagement({ showJson, form }) {
  const [state, dispatch] = useReducer(formRenderReducer, init())
  const setValue = (id, value) => dispatch({ type: ACTIONS.ON_CHANGE_RENDER, id, value })

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <form>
        <Grid style={{ padding: 5 }}>
          <ListElements formElements={form} valueMap={state.valueMap} setValue={setValue} />
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" className="btn btn-success" onClick={() => console.log('valueMap', state.valueMap)}>Send</Button>
        </Grid>
        {
          showJson &&
          <Grid>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </Grid>
        }
      </form>
    </Grid>

  )
}


