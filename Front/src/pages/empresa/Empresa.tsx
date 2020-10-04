import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Input,
    Typography
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import TextField from '@material-ui/core/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { RouteProps, withRouter } from 'react-router-dom';
import Api from '../../api/api';
import StarList from '../../shared/components/star-list/starList';
import styles from './Empresa.module.scss';

const Empresa = (props: RouteProps) => {
    const [state, setState] = useState({
        modalDoar: false,
        valorDoacao: 0
    });
    const [empresa, setEmpresa] = useState(null);
    useEffect(() => {
        const idEmpresa = new URLSearchParams(props.location.search).get(
            'idEmpresa'
        );
        Api.get('/Empresa?id=' + idEmpresa + '&to=1&imagem=true').then((res) => {
            console.log(res);
            setEmpresa({
                ...res.data.data[0],
                imgLink:
                    'https://saving-grace-app.herokuapp.com/imagem/src?id=' +
                    res.data.data[0]?.Imagem.id
            });
        });
    }, []);

    const toggleDoar = () => {
        if (!localStorage.getItem('session')) {
            window.location.href = '/SignUp';
            return;
        }
        setState({ ...state, modalDoar: !state.modalDoar });
    };

    const doar = () => {
        toggleDoar();
        const idUsuario = JSON.parse(localStorage.getItem('session'))?.id;
        const idEmpresa = new URLSearchParams(props.location.search).get(
            'idEmpresa'
        );
        Api.post('/Transacao', {
            valor: state.valorDoacao,
            EmpresaId: +idEmpresa,
            UsuarioId: idUsuario
        }).then((res) => {
            console.log(res);
            Api.get('/Empresa?id=' + idEmpresa + '&to=1&imagem=true').then((res) => {
                console.log(res);
                setEmpresa({
                    ...res.data.data[0],
                    imgLink:
                        'https://saving-grace-app.herokuapp.com/imagem/src?id=' +
                        res.data.data[0]?.Imagem.id
                });
            });
        });
    };

    return (
        <div className={styles.paginaEmpresa}>
            <Grid
                container
                justify='center'
                alignItems='flex-start'
                direction='column'>
                <img src={empresa?.imgLink} />
                <Box height='10px'></Box>
                <Typography className={styles.description} variant='h4'>
                    {empresa?.nome}
                </Typography>

                <Box height='10px'></Box>
                <StarList count={5} />
                <div className={styles?.description}>
                    <Typography variant='caption'>{empresa?.descricao}</Typography>
                </div>

                <Box height='20px'></Box>
                <Typography display='block' variant='caption'>
                    Arrecadado este mês:
                </Typography>
                <Typography variant='h5'>{empresa?.saldo} R$</Typography>

                <Box height='10px'></Box>
                <Typography className={styles.description} variant='h6'>
                    Benefícios
                </Typography>
                <ul>
                    <li>Descontos</li>
                    <li>Frete grátis</li>
                </ul>
                    <Button onClick={toggleDoar} variant="contained" color="primary">
                        Doar
                    </Button>
                {/* <Grid>
                    <Button onClick={toggleDoar} variant="contained" color="primary">
                        Avaliar
                    </Button>
                </Grid> */}
                <Box height="20px"></Box>
            </Grid>
            <Dialog open={state.modalDoar}>
                <DialogTitle>{'Doar para ' + empresa?.nome}</DialogTitle>
                <DialogContent>
                    <TextField inputProps={{inputProps: {min: 0}}}
                        value={state.valorDoacao} onChange={e => setState({ ...state, valorDoacao: +e.target.value })} label="Valor" type="number" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleDoar} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={doar} color="primary">
                        Doar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withRouter(Empresa);
