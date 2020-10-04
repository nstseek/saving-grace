import { IconButton, Typography } from '@material-ui/core';
import React from 'react';
import CarouselMobile from '../../shared/components/carousel-mobile/CarouselMobile';
import styles from './Home.module.scss';
import SearchIcon from '@material-ui/icons/Search';

const Home = () => {

    return (
        <div className={styles.paginaHome}>
            <CarouselMobile />
            <div className={styles.maisEmpresas}>
                <div className={styles.heading}>
                    <Typography>Mais empresas</Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu">
                        <SearchIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Home;