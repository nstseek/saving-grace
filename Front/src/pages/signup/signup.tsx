import {Box, Button, Grid, Input, TextField, Typography} from '@material-ui/core';
import React from 'react';
import { RouteProps, withRouter } from 'react-router-dom';
import Api from '../../api/api';
import Wrapper from '../../shared/components/Wrapper';
import styles from './Signup.module.scss';

const Signup = (props: RouteProps) => {

    const isEmpresa = props.location.search.includes('empresa');

    const [state, setState] = React.useState({
        nome: '',
        email: '',
        cpf: '',
        cnpj: undefined,
        imagem: undefined,
        password: '',
        descricao: ''
    });

    const click = () => {

        Api.post('/Usuario', {
            nome: state.nome,
            saldo: 10,
            email: state.email,
            senha: state.password,
            cpf: state.cpf
        }).then(response => {
            localStorage.setItem('session', JSON.stringify(response.data.data));
            if (isEmpresa) {
                Api.post('/Empresa', {
                    nome: state.nome,
                    saldo: 10,
                    cnpj: state.cnpj,
                    Imagem: state.imagem,
                    descricao: state.descricao,
                    UsuarioId: JSON.parse(localStorage.getItem('session')).id
                }).then(response => {
                    console.log(response.data.data);
                })
            }
        });
    }

    const inputImagemHandler = (e) => {
        const reader = new FileReader();
        const target = e.target as HTMLInputElement;

        if (target.files && target.files.length) {
            reader.onload = () => {
                const result = reader.result as ArrayBuffer;
                setState({
                    ...state,
                    imagem: {
                        nomeArquivo: target.files[0].name,
                        conteudo: Array.from(new Uint8Array(result))
                    }
                });
                console.log(state);
            };
            reader.readAsArrayBuffer(target.files[0]);
          }
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

                    {
                        isEmpresa ? (
                            <Wrapper>
                                <Typography className={styles.inputLabel} variant="body1">CNPJ:</Typography>
                                <TextField value={state.cnpj} onChange={(e) => {setState({...state, cnpj: e.target.value})}} ></TextField>
                                <Box height="20px"></Box>

                                <Typography className={styles.inputLabel} variant="body1">Descrição:</Typography>
                                <TextField value={state.descricao} onChange={(e) => {setState({...state, descricao: e.target.value})}} multiline rows={5}/>
                                <Box height="20px"></Box>

                                <Typography className={styles.inputLabel} variant="body1">Imagem:</Typography>
                                <TextField onChange={inputImagemHandler} type="file"/>
                                <Box height="20px"></Box>
                            </Wrapper>
                        ) : null
                    }

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

export default withRouter(Signup);