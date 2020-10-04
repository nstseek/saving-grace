import {Box, Button, Grid, Typography} from '@material-ui/core';
import React from 'react';
import StarList from '../../shared/components/star-list/starList';
import styles from './Empresa.module.scss';

const Empresa = () => {
    return (
        <div className={styles.paginaEmpresa}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Box height="20px"></Box>
                <Typography className={styles.description} variant="h3">Empresa 0001</Typography>

                <Box height="30px"></Box>
                <StarList count={4} />

                <Box height="20px"></Box>
                <div className={styles.description}>
                    <Typography variant="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis libero vel lectus blandit, vel porta nisl viverra. Quisque in placerat est. Nam porta dui in ligula iaculis dictum. Donec interdum ligula nisi, sit amet feugiat ligula interdum eu. Donec dapibus tortor sed urna mattis convallis. Cras pulvinar quam id sem pharetra, vitae eleifend elit interdum. Cras maximus risus et ullamcorper efficitur. Curabitur ac blandit orci. </Typography>
                </div>
            
                <Box height="30px"></Box>
                <img src="/test.jpg">
                </img>

                <Box height="20px"></Box>
                <Typography display="block" variant="caption">Arrecadado este mês:</Typography>
                <Typography variant="h5">1000 Pontos</Typography>

                <Button>
                    Doar
                </Button>
            </Grid>
        </div>
    )
}

export default Empresa;