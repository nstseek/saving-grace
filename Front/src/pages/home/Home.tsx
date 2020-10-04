import { Card, CardContent, CardHeader, CardMedia, GridList, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import CarouselMobile from '../../shared/components/carousel-mobile/CarouselMobile';
import styles from './Home.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import StarList from '../../shared/components/star-list/starList';
import Button from '@material-ui/core/Button/Button';
import Carousel from '../../shared/components/carousel/Carousel';

const Home = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const empresas = [
        {
            id: 1,
            img: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            titulo: 'Nome empresa'
        },
        {
            id: 2,
            img: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            titulo: 'Nome empresa 2'
        },
        {
            id: 3,
            img: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            titulo: 'Nome empresa 3'
        },
        {
            id: 4,
            img: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            titulo: 'Nome empresa 4'
        }
    ]

    return (
        <div className={styles.paginaHome}>
            <div className={styles.mobile}>
                <CarouselMobile />
            </div>
            <div className={styles.pc}>
                <Carousel />
            </div>
            <div className={styles.maisEmpresas}>
                <div className={styles.heading}>
                    <Typography>Mais empresas</Typography>
                    <IconButton edge="end" color="inherit" aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                </div>
                <GridList className={styles.list} cols={4}>
                    {empresas.map((empresa) => (
                        // <GridListTile key={tile.id}>
                        //     <img src={tile.img} alt={tile.titulo} />
                        //     <GridListTileBar
                        //         title={tile.titulo}
                        //     />
                        // </GridListTile>

                        <Card className={styles.item} key={empresa.id}>
                            <CardHeader title={empresa.titulo} />
                            <CardMedia image={empresa.img} className={styles.img} />
                            <CardContent>
                                <StarList count={4} />
                                <Typography>
                                    Descrição empresa lorem ipsum dolor sit amet ashduasd ashdad auheue h.
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </GridList>
            </div>
            <Tabs className={styles.abas} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Sou Empresa" />
                <Tab label="Sou Cliente" />
            </Tabs>
            <div className={styles.cadastreSe} hidden={value !== 0}>
                <div>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </p>
                    <Button variant="outlined" color="inherit">
                        Cadastre-se
                    </Button>
                </div>
            </div>
            <div className={styles.cadastreSe} hidden={value !== 1}>
                <div>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Cont
                    </p>
                    <Button variant="outlined" color="inherit">
                        Cadastre-se
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;