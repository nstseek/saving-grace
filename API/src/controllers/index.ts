import express from 'express';
import avaliacaoRouter from './Avaliacao';
import comentarioRouter from './Comentario';
import empresaRouter from './Empresa';
import favoritoRouter from './Favorito';
import imagemRouter from './Imagem';
import premioRouter from './Premio';
import transacaoRouter from './Transacao';
import usuarioRouter from './Usuario';

const router = express.Router();

console.log('to setando as rotas');

router.use('/avaliacao', avaliacaoRouter);
router.use('/comentario', comentarioRouter);
router.use('/empresa', empresaRouter);
router.use('/favorito', favoritoRouter);
router.use('/imagem', imagemRouter);
router.use('/premio', premioRouter);
router.use('/transacao', transacaoRouter);
router.use('/usuario', usuarioRouter);

export default router;
