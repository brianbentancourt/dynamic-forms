import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Title from '../components/title'
import FormBuilderContainer from '../containers/formBuilderContainer'

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
}))

export const FormBuilder = () => {
    const classes = useStyles()

    return (
        <Grid container style={{ padding: 20 }}>
            <Title>Builder</Title>
            <Grid container className={classes.root}>
                <FormBuilderContainer />
            </Grid>
        </Grid>
    )
}

export default FormBuilder