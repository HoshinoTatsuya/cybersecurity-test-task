import { extname } from 'path'

import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

export function UploadAvatar(): ReturnType<typeof applyDecorators> {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: diskStorage({
          destination: './uploads/avatars',
          filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0]
            const fileExtName = extname(file.originalname)
            callback(null, `${name}-${Date.now()}${fileExtName}`)
          },
        }),
      }),
    ),
  )
}
