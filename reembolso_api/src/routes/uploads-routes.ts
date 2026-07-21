import { Router } from 'express';
import multer from 'multer';

//middleware responsavel por qual usuario pode fazer o upload
import uploadConfig from '@/configs/upload';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorizations';
import { UploadsController } from '@/controllers/uploads-controller';

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

const upload = multer(uploadConfig.MULTER); //passando o multer

//somente o funcionario pode fazer upload de imagem
uploadsRoutes.use(verifyUserAuthorization(['employee']));
//passando o multer como middleware para enviar o arquivo e validar ele
uploadsRoutes.post('/', upload.single('file'), uploadsController.create);

export { uploadsRoutes };
