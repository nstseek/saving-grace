import {Box, Button, Grid, Typography} from '@material-ui/core';
import React from 'react';
import styles from './Signup.module.scss';

const Signup = (props) => {
    return (
        <div className={styles.paginaSignup}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Box height="30px"></Box>
                <Typography variant="h4">Cadastro</Typography>
                <form>
                    <Box height="20px"></Box>
                    <Typography className={styles.inputLabel} variant="body1">Nome:</Typography>
                    <input></input>
                    <Box height="20px"></Box>
                    <Typography className={styles.inputLabel} variant="body1">Email:</Typography>
                    <input></input>
                    <Box height="20px"></Box>
                    <Typography className={styles.inputLabel} variant="body1">Senha:</Typography>
                    <input type="password"></input>
                    <Box height="30px"></Box>
                    <Button className={styles.signUpBtn}>Cadastrar</Button>               
                </form>
            </Grid>
        </div>
    )
}

export default Signup;