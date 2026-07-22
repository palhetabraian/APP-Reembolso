//arquivo responsavel por manipular os arquivos se atender o criterio ou nao
import fs from 'node:fs';
import path from 'node:path';

import uploadConfig from '@/configs/upload';

class DiskStorage {
  //metodo para salvar o arquivo no diskstorage
  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file); // pegando onde o arquivo ta
    const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); // pegando o destino do arquivo

    try {
      //verifica se o arquivo existe
      await fs.promises.access(tmpPath); //tentando acessar o arquivo na pasta temporaria. caso nao exista lança um erro
    } catch (error) {
      console.log(error);
      throw new Error(`Arquivo não encontrado: ${tmpPath}`);
    }

    await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true }); // garante que a pasta de upload exista
    await fs.promises.rename(tmpPath, destPath); // pega o arquivo na pasta temporaria e manda para destPath

    return file; // retorna o arquivo
  }

  async deleteFile(file: string, type: 'tmp' | 'upload') {
    const pathFile =
      type === 'tmp' ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER; // verificando o caminho do arquivo

    const filePath = path.resolve(pathFile, file);

    //tentando deletar o arquivo
    try {
      await fs.promises.stat(filePath); //vendop se o arquivo ta disponivel
    } catch {
      return;
    }

    await fs.promises.unlink(filePath) // deletando com o unlink
  }
}

export { DiskStorage };
