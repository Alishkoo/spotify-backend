import {S3} from '@aws-sdk/client-s3';  
import {Upload} from '@aws-sdk/lib-storage';



export const s3 = new S3({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

export const listBuckets = async () => {
    await s3
        .listBuckets()
        .then((res) => console.log(res.Buckets))
        .catch((err) => console.error(err));
}    

export const createBucket = async (bucketName: string) => {
    await s3
        .createBucket({Bucket: bucketName})
        .then((res) => console.log(res))
        .catch((err) => console.error("error" + err));
}

export const deleteBucket = async (bucketName: string) => {
    await s3
        .deleteBucket({Bucket: bucketName})
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
}

export const uploadFile = async (bucketName: string, key: string, file: Buffer) => {
    const upload = new Upload({
        client: s3,
        params: {
            Bucket: bucketName,
            Key: key,
            Body: file
        }
    });

    await upload.done();
}

export const downloadFile = async (bucketName: string, key: string) => {
    await s3
        .getObject({Bucket: bucketName, Key: key})
        .then((res) => console.log(res))
        .catch((err) => console.error("error" + err));
}


export const processTextFile = async (bucketName: string, key: string) => {
    const download = await s3.getObject({Bucket: bucketName, Key: key});
    if (download.Body) {
        const text = download.Body.toString();
        console.log(text);
    } else {
        console.log('No data was returned');
    }
}

export const updateTextFile = async (bucketName: string, key: string, text: string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: text
    };

    try {
        const response = await s3.putObject(params);
        console.log(`Successfully updated file. ${response}`);
    } catch (error) {
        console.error(`Error updating file: ${error}`);
    }
}