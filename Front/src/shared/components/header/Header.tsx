import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoSavingGrace from '../../../assets/images/logo_sg.png';
import styles from './Header.module.scss';
import Drawer from '@material-ui/core/Drawer';
import { Dialog, DialogTitle } from '@material-ui/core';
import Login from '../login/Login';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function Header() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        menuLateral: false,
        login: false
    });

    const toggleMenuLateral = () => setState({...state, menuLateral: !state.menuLateral });

    const toggleLogin = () => setState({...state, login: !state.login, menuLateral: false});

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={styles.header}>
                    <IconButton edge="start" onClick={toggleMenuLateral} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}
                    <img src={LogoSavingGrace} />
                    <h4>SAVING GRACE</h4>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Drawer anchor={'left'} open={state.menuLateral} onClose={toggleMenuLateral}>
                <div className={styles.menuLateral}>
                        <p onClick={() => window.location.href = '/'}>Home</p>
                        <p onClick={toggleLogin}>Login</p>
                        <p onClick={() => window.location.href = '/SignUp?cadastro=empresa'}>Cadastro Empresa</p>
                        <p onClick={() => window.location.href = '/SignUp'}>Cadastro Cliente</p>
                </div>
            </Drawer>
            <Dialog open={state.login} onClose={toggleLogin}>
                <DialogTitle>Login</DialogTitle>
                <Login />
            </Dialog>
        </div>
    );
}
