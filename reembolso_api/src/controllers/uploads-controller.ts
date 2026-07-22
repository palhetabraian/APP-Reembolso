import { Request, Response } from 'express';
import z, { ZodError } from 'zod';

import uploadConfig from '@/configs/upload';
import { DiskStorage } from '@/providers/disk.storage';
import { AppError } from '@/utils/AppError';

class UploadsController {
  async create(request: Request, response: Response) {
    //instanciando o diskstorage
    const diskstorage = new DiskStorage();
    try {
      //validando o arquivo de upload
      const fileSchema = z
        .object({
          filename: z.string().min(1, 'Arquivo é obrigatório'),
          //valida o formato do arquivo passado
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              `Formato de arquivo inválido. Formatos permitidos: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`
            ),
          //validando o tamanho do arquivo ate 3mb
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `Arquivo excede o tamanho máximo de ${uploadConfig.MAX_SIZE}`
            ),
        })
        .passthrough(); // foca nas tres e ignora o restante

      //validando o arquivo
      const file = fileSchema.parse(request.file);
      const filename = await diskstorage.saveFile(file.filename);

      response.json({ filename });
    } catch (error) {
      //verificando se o erro é uma instancia de zod error
      if (error instanceof ZodError) {
        if (request.file) {
          await diskstorage.deleteFile(request.file.filename, 'tmp'); // deletando o arquivo da pasta temporaria
        }

        throw new AppError(error.issues[0].message);
      }

      throw error;
    }
  }
}

export { UploadsController };
