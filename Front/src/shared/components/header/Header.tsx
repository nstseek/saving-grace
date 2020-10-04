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
    });

    const toggleMenuLateral = () => setState({ menuLateral: !state.menuLateral });

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
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Drawer anchor={'left'} open={state.menuLateral} onClose={toggleMenuLateral}>
                <div className={styles.menuLateral}>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                </div>
            </Drawer>
        </div>
    );
}
