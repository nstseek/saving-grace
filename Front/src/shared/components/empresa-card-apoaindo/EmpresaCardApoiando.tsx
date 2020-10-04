import {Grid, Typography} from '@material-ui/core';
import  React from 'react';
import StarList from '../star-list/starList';
import styles from './EmpresaCardApoiando.module.scss';

const EmpresaCardApoiando = (props) => {
    return (
        <div className={styles.empresaCardApoiando}>
            <Grid container direction="row">
                <img src="/test.jpg">
                </img>
                <Grid container justify="center" direction="column" xs>
                    <div className={styles.infos}>
                        <Typography variant="h5">{props.empresaName}</Typography>
                        <Typography variant="h6">{props.points} Pontos</Typography>
                        <StarList count={props}></StarList>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default EmpresaCardApoiando;