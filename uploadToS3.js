const fs = require('fs');
const mime = require('mime-types')
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

console.log('Uploading to S3(ZH)...');
uploadDir('./dist')

function uploadDir(dir) {
    fs.readdir(dir, (err, files) => {
        for (fileName of files) {
            const path = `${dir}/${fileName}`
            if (fs.lstatSync(path).isDirectory()) {
                uploadDir(path)
            } else {
                upload(path, dir.substring('./dist'.length + 1), fileName);
            }
        }
    });
}

function upload(origin, remoteDir, filename) {
    let params = {
        Bucket: 'race.wf-calc.net',
        Key: `${remoteDir}${remoteDir.length > 0 ? '/' : ''}${filename}`,
        ContentType: mime.lookup(origin)
    };
    params.Body = fs.readFileSync(origin);
    s3.putObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(`Uploaded ${remoteDir}/${filename}`);
        }
    });
}
