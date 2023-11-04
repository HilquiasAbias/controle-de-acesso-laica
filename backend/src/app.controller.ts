import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

@Controller('test/upload')
export class AppController {
  constructor() {}

  @Post('file')
  @UseInterceptors(FileInterceptor('imagem', {
    storage: diskStorage({
      destination: 'uploads/',
      filename: (req, file, cb) => {
        const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: any) {
    console.log(file);
    if (file) return 'ok';
    else return 'fail';
  }

  @Post('string')
  uploadBase64Image(@Body() body: { encoded: string }) {
    if (!body || !body.encoded) {
      throw new Error('Nenhuma imagem codificada encontrada.');
    }

    const encodedImage = body.encoded.startsWith('data:image/') 
    ? body.encoded
    : `data:image/jpg;base64,${body.encoded}`;

    const matches = encodedImage.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
    const imageExtension = matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');

    const imageName = `${randomUUID()}.${imageExtension}`;
    const imagePath = `uploads/${imageName}`;

    fs.writeFile(imagePath, imageBuffer, (err) => {
      if (err) {
        throw err;
      }

      return 'Imagem salva com sucesso.';
    });
  }
}
