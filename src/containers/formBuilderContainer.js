import React, { useEffect, useState } from 'react'
import {
    Grid,
} from '@material-ui/core'
import FormBuilder from '../components/formBuilder'
import FormManagement from '../components/formManagement'

export const FormBuilderContainer = () => {
    const [form, setForm] = useState({})

   /*  useEffect(() => {
        return setForm(jsonData)
    }, []) */




    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <FormBuilder  />
        </Grid>
    )
}

export default FormBuilderContainer