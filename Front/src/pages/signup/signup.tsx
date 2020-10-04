import {Box, Button, Grid, Input, TextField, Typography} from '@material-ui/core';
import React from 'react';
import Api from '../../api/api';
import styles from './Signup.module.scss';

const Signup = (props) => {
    const [state, setState] = React.useState({
        nome: '',
        email: '',
        cpf: '',
        imagem: '',
        password: ''
    });

    const click = () => {
        Api.post('/Usuario', {
            nome: state.nome,
            saldo: 10,
            email: state.email,
            senha: state.password,
            cpf: state.cpf
        }).then(response => {
            console.log(response.data.data);
            localStorage.setItem('session', JSON.stringify(response.data.data));
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
                    <TextField value={state.nome} onChange={(e) => {setState({...state,nome: e.target.value})}}></TextField>
                    <Box height="20px"></Box>

                    <Typography className={styles.inputLabel} variant="body1">Email:</Typography>
                    <TextField value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} ></TextField>
                    <Box height="20px"></Box>

                    <Typography className={styles.inputLabel} variant="body1">CPF:</Typography>
                    <TextField value={state.cpf} onChange={(e) => {setState({...state, cpf: e.target.value})}} ></TextField>
                    <Box height="20px"></Box>

                    <Typography className={styles.inputLabel} variant="body1">Senha:</Typography>
                    <TextField value={state.password} onChange={(e) => {setState({...state,password: e.target.value})}} type="password"></TextField>
                    <Box height="20px"></Box>

                    <Typography className={styles.inputLabel} variant="body1">Confirmar Senha:</Typography>
                    <TextField type="password"></TextField>
                    <Box height="30px"></Box>

                    <Button onClick={click} className={styles.signUpBtn}>Cadastrar</Button>               
                </form>
            </Grid>
        </div>
    )
}

export default Signup;