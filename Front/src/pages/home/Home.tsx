import { Card, CardContent, CardHeader, CardMedia, GridList, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import CarouselMobile from '../../shared/components/carousel-mobile/CarouselMobile';
import styles from './Home.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import StarList from '../../shared/components/star-list/starList';
import Button from '@material-ui/core/Button/Button';
import Carousel from '../../shared/components/carousel/Carousel';
import Api from '../../api/api';
import { loadConfig } from '../../App';

const Home = () => {

    const [value, setValue] = React.useState(0);
    const [empresas, setValueEmpresas] = React.useState([]);

    useEffect(() => {
        Api.get('/Empresa?from=0&to=5&imagem=true')
            .then(res => {
                console.log(res.data.data);
                setValueEmpresas(res.data.data.map(e => ({
                    id: e.id,
                    titulo: e.nome,
                    desc: e.descricao,
                    img: 'https://saving-grace-app.herokuapp.com/imagem/src?id=' + e.Imagem.id,
                    rating: Math.round(((Math.random() * 10) / 2)) + 1
                })))
            })
    }, []);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

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
                    <Typography variant="h5">Mais empresas</Typography>
                    {/* <IconButton edge="end" color="inherit" aria-label="menu">
                        <SearchIcon />
                    </IconButton> */}
                </div>
                <GridList className={styles.list} cols={4}>
                    {empresas.map((empresa) => (
                        // <GridListTile key={tile.id}>
                        //     <img src={tile.img} alt={tile.titulo} />
                        //     <GridListTileBar
                        //         title={tile.titulo}
                        //     />
                        // </GridListTile>

                        <Card onClick={() => window.location.href = '/empresa?idEmpresa=' + empresa.id} className={styles.item} key={empresa.id}>
                            <CardHeader title={empresa.titulo} className={styles.header} />
                            <CardMedia image={empresa.img} className={styles.img} />
                            <CardContent>
                                <StarList count={empresa.rating} />
                                <Typography className={styles.desc}>
                                    {empresa.desc}
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