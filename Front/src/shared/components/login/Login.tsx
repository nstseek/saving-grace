import { Button, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import React from 'react';
import styles from './Login.module.scss';

const Login = () => {
    return (
        <DialogContent>
            <DialogContentText>
                Bem vindo! Inicie sua sessão para continuar
            </DialogContentText>
            <div className={styles.campos}>
                <TextField className={styles.campo} label="E-mail" type="email"/>
                <TextField className={styles.campo} label="Senha" type="password"/>
            </div>
            <div className={styles.logar}>
                <Button variant="contained" color="primary">
                    Logar
                </Button>
            </div>
        </DialogContent>
    );
}

export default Login;
