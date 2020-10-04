import {Box, Button, Grid, Input, Typography} from '@material-ui/core';
import Axios from 'axios';
import React from 'react';
import styles from './Signup.module.scss';

const Signup = (props) => {
    const [state, setState] = React.useState({
        nome: '',
        email: '',
        password: ''
    });

    const click = () => {
        Axios.post('/Usuario', {
            nome: state.nome,
            saldo: 0,
            email: state.email,
            senha: state.password,
        }).then(response => {
            localStorage.setItem('session', response.data);
        })
    }

    return (
        <div className={styles.paginaSignup}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Box height="30px"></Box>
                <Typography variant="h4">Cadastro</Typography>
                <form>
                    <Box height="20px"></Box>
                    <Typography className={styles.inputLabel} variant="body1">Nome:</Typography>
                    <Input value={state.nome} onChange={(e) => {setState({...state,nome: e.target.value})}}></Input>
                    <Box height="20px"></Box>
                    <Typography className={styles.inputLabel} variant="body1">Email:</Typography>
                    <Input value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} ></Input>
                    <Box height="20px"></Box>
                    <Typography className={styles.inputLabel} variant="body1">Senha:</Typography>
                    <Input value={state.password} onChange={(e) => {setState({...state,password: e.target.value})}} type="password"></Input>
                    <Box height="30px"></Box>
                    <Button onClick={click} className={styles.signUpBtn}>Cadastrar</Button>               
                </form>
            </Grid>
        </div>
    )
}

export default Signup;