//arquivo responsavel por configuracao de upload de arquivo
import multer from 'multer';
import path from 'node:path'; // caminho
import crypto from 'node:crypto'; //cripto

//pasta temporaria para os arquivos de upload
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
// para pegar o arquivo da pasta
const UPLOADS_FOLDER = path.relative(TMP_FOLDER, 'uploads'); //

//definindo o tamanho do arquivo que vai acertar

const MAX_FILE_SIZE = 1024 * 1024 * 3; // aceita no maximo 3mb

const ACCEPTED_IMAGE_TYPES = ['image/jpeg,', 'image/jpg', 'image/png']; //passando o formato da imagem

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
};
