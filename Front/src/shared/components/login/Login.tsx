import { Button, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import React from 'react';
import Api from '../../../api/api';
import styles from './Login.module.scss';

const Login = () => {
    const [state, setState] = React.useState({
        email: '',
        password: ''
    });

    const click = () => {
        Api.post('/usuario/login', {
            email: state.email,
            senha: state.password,
        }).then(response => {
            localStorage.setItem('session', JSON.stringify(response.data.data));
            window.location.href = '/';
        })
    }

    return (
        <DialogContent>
            <DialogContentText>
                Bem vindo! Inicie sua sessão para continuar
            </DialogContentText>
            <div className={styles.campos}>
                <TextField value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} className={styles.campo} label="E-mail" type="email"/>
                <TextField value={state.password} onChange={(e) => {setState({...state,password: e.target.value})}} className={styles.campo} label="Senha" type="password"/>
            </div>
            <div className={styles.logar}>
                <Button onClick={click} variant="contained" color="primary">
                    Logar
                </Button>
            </div>
        </DialogContent>
    );
}

export default Login;
