import {Box, Button, Grid, Typography} from '@material-ui/core';
import React from 'react';
import EmpresaCardApoiando from '../../shared/components/empresa-card-apoaindo/EmpresaCardApoiando';
import styles from './Apoiando.module.scss';

const Apoiando = () => {
    return (
        <div className={styles.paginaApoiando}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Box height="20px"></Box>
                <Typography variant="h4">Apoiando</Typography>
                <Box height="20px"></Box>
                <div className={styles.list}>
                    <EmpresaCardApoiando empresaName="Empresa 00001" points={16} stars={4} ></EmpresaCardApoiando>
                    <Box height="20px"></Box>
                    <EmpresaCardApoiando empresaName="Empresa 00002" points={26} stars={5} ></EmpresaCardApoiando>
                </div>
            </Grid>
        </div>
    )
}

export default Apoiando;