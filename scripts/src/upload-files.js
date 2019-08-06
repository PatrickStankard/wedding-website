const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const s3Client = new S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function uploadFiles(directoryPath) {
    fs.readdir(directoryPath, (error, files) => {
        if (error) {
            throw error;
        }

        for (const fileName of files) {
            if (fileName.startsWith('.')) {
                continue;
            }

            const filePath = path.join(directoryPath, fileName);

            if (fs.lstatSync(filePath).isDirectory()) {
                uploadFiles(filePath);
            } else {
                uploadFile(filePath);
            }
        }
    });
}

function uploadFile(filePath) {
    const key = filePath.replace(`${process.env.PUBLIC_DIRECTORY_PATH}/`, '');
    const contentType = mime.lookup(key);

    fs.readFile(filePath, (error, fileContent) => {
        if (error) {
            throw error;
        }

        s3Client.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: contentType,
        }, () => {
            console.log(`${filePath} -> s3://${process.env.S3_BUCKET_NAME}/${key} (${contentType})`);
        });
    });
}

module.exports = uploadFiles;
