import {Box, Button, Grid, Typography} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteProps, withRouter } from 'react-router-dom';
import Api from '../../api/api';
import StarList from '../../shared/components/star-list/starList';
import styles from './Empresa.module.scss';

const Empresa = (props: RouteProps) => {

    const [empresa, setEmpresa] = useState(null);
    useEffect(() => {
        const idEmpresa = new URLSearchParams(props.location.search).get('idEmpresa');
        Api.get('/Empresa?id=' + idEmpresa + '&to=1&imagem=true')
            .then(res => {
                console.log(res);
                setEmpresa({
                    ...res.data.data[0],
                    imgLink: 'https://saving-grace-app.herokuapp.com/imagem/src?id=' + res.data.data[0]?.Imagem.id
                });
            });
    }, []);

    return (
        <div className={styles.paginaEmpresa}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Box height="20px"></Box>
                <img src={empresa?.imgLink} />
                <Box height="30px"></Box>
                <Typography className={styles.description} variant="h4">
                    {empresa?.nome}
                </Typography>

                <Box height="30px"></Box>
                <StarList count={5} />

                <Box height="20px"></Box>
                <div className={styles?.description}>
                    <Typography variant="caption">
                        {empresa?.descricao}
                    </Typography>
                </div>

                <Box height="20px"></Box>
                <Typography display="block" variant="caption">Arrecadado este mês:</Typography>
                <Typography variant="h5">1000 Pontos</Typography>

                <Button>
                    Doar
                </Button>
                <Box height="20px"></Box>
            </Grid>
        </div>
    )
}

export default withRouter(Empresa);