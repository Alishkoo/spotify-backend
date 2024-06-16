import {S3} from '@aws-sdk/client-s3';  
import {Upload} from '@aws-sdk/lib-storage';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req: Request, file, cb) => {
        if(file.mimetype === 'audio/mpeg'){
            cb(null, true);
        }
        else{
            cb(new Error('Invalid file type'));
        }
    },
    limits: {
        fileSize: 20 * 1024 * 1024
    }
});

export const uploadFileToS3 = async (file: Express.Multer.File) => {
    const fileKey = `${uuidv4()}${path.extname(file.originalname)}`;

    const upload = new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileKey,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype
        }
    })

    const data = await upload.done();
    return data.Location;
}

export const deleteFileFromS3 = async (fileKey: string) => {
    await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileKey
    });
};




