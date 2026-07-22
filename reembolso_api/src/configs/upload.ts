//arquivo responsavel por configuracao de upload de arquivo
import multer from 'multer';
import path from 'node:path'; // caminho
import crypto from 'node:crypto'; //cripto

//pasta temporaria para os arquivos de upload
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
// para pegar o arquivo da pasta
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads'); //

const MAX_SIZE = 3; //3mb

//definindo o tamanho do arquivo que vai acertar
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE; // aceita no maximo 3mb
//definindo imagens que vao ser aceitas
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']; //passando o formato da imagem

//configurando o middleware multer para pegar imagem, criar um hash e retornar ela.
const MULTER = {
  storage: multer.diskStorage({
    // passando que vai ser salvo no disco de onde ta hospedado
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`; //evita que os arquivos com o mesmo nome sejam sobrescrito

      return callback(null, fileName); // retorna a callback que entrou em filha e responde null que deu tudo certo
    },
  }),
};

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
  MAX_FILE_SIZE,
  MAX_SIZE,
  ACCEPTED_IMAGE_TYPES,
};
