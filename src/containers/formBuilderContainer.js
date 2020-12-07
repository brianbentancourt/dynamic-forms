import React, { useEffect, useReducer } from 'react'
import {
    Grid,
} from '@material-ui/core'
import FormBuilder from '../components/formBuilder'
import FormManagement from '../components/formManagement'
import formBuilder from "../reducers/formBuilder"
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import form from '../templates/data'

function init() {
    const getElement = element => ({ ...element, readOnly: true })
    const getEditMode = (result, element) => { result[element.elementId] = false; return result; }
    return {
      items: map(getElement)(form.formElements),
      editMode: reduce(getEditMode, {})(form.formElements)
    }
  }

export const FormBuilderContainer = () => {
    const [state, dispatch] = useReducer(formBuilder, init())
    const showJson = true

     useEffect(() => {
         return console.log('loading')
     }, []) 




    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item md={6}>
                <FormBuilder state={state} dispatch={dispatch} showJson={showJson} />
            </Grid>
            <Grid item md={6}>
                <FormManagement form={state.items} showJson={showJson} />
            </Grid>

        </Grid>
    )
}

export default FormBuilderContainer