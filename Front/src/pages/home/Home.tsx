import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  GridList,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
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

  const [empresasCarrosel, setEmpresasCarrosel] = React.useState([]);

  useEffect(() => {
    Api.get('/Empresa?from=0&to=3&imagem=true').then((res) => {
      setEmpresasCarrosel(
        res.data.data.map((e) => ({
          id: e.id,
          titulo: e.nome,
          desc: e.descricao,
          img:
            'https://saving-grace-app.herokuapp.com/imagem/src?id=' +
            e.Imagem.id,
          rating: Math.round((Math.random() * 10) / 2) + 1
        }))
      );
    });
    Api.get('/Empresa?from=3&imagem=true').then((res) => {
      console.log(res.data.data);
      setValueEmpresas(
        res.data.data.map((e) => ({
          id: e.id,
          titulo: e.nome,
          desc: e.descricao,
          img:
            'https://saving-grace-app.herokuapp.com/imagem/src?id=' +
            e.Imagem.id,
          rating: Math.round((Math.random() * 10) / 2) + 1
        }))
      );
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.paginaHome}>
      <div className={styles.mobile}>
        {empresasCarrosel.length ? <CarouselMobile itens={empresasCarrosel} /> : null}
      </div>
      <div className={styles.pc}>
        {empresasCarrosel.length ? <Carousel itens={empresasCarrosel} /> : null}
      </div>
      <div className={styles.maisEmpresas}>
        <div className={styles.heading}>
          <Typography variant='h5'>Mais empresas</Typography>
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

            <Card
              onClick={() =>
                (window.location.href = '/empresa?idEmpresa=' + empresa.id)
              }
              className={styles.item}
              key={empresa.id}>
              <CardHeader title={empresa.titulo} className={styles.header} />
              <CardMedia image={empresa.img} className={styles.img} />
              <CardContent>
                <StarList count={empresa.rating} />
                <Typography className={styles.desc}>{empresa.desc}</Typography>
              </CardContent>
            </Card>
          ))}
        </GridList>
      </div>
      <Tabs
        className={styles.abas}
        value={value}
        onChange={handleChange}
        aria-label='simple tabs example'>
        <Tab label='Sou Empresa' />
        <Tab label='Sou Cliente' />
      </Tabs>
      <div className={styles.cadastreSe} hidden={value !== 0}>
        <div>
          <p>
            Cadastre aqui a sua empresa e lute pelo seu negócio ao lado dos seus
            clientes!
          </p>
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => (window.location.href = '/SignUp?cadastro=empresa')}>
            Cadastre-se
          </Button>
        </div>
      </div>
      <div className={styles.cadastreSe} hidden={value !== 1}>
        <div>
          <p>
            Cadastre-se já e ajude sua empresa preferida a continuar operando
            durante e após a pandemia!
          </p>
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => (window.location.href = '/SignUp')}>
            Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
