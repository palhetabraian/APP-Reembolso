import { Request, Response } from 'express';
import z from 'zod';

import uploadConfig from '@/configs/upload';

class UploadsController {
  async create(request: Request, response: Response) {
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
    const { file } = fileSchema.parse(request.file);

    response.json({ message: 'ok' });

    try {
    } catch (error) {
      throw error;
    }
  }
}

export { UploadsController };
