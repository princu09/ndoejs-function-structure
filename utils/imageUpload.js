import { BlobServiceClient } from "@azure/storage-blob";

import { v1 as uuidv1 } from "uuid";

import multer from "multer";

const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=sagellc;AccountKey=BjbZ7gV7NTpoabVPoX7e3cRSBzZtujAFOnp4cwPc0bEgu3b9mqYSwMHpbXcbnL+Lk0s25P8FsbxT+AStu8Advg==;EndpointSuffix=core.windows.net";

const containerName = "sageimages";

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadImage(file) {
  console.log("FILE::", file);
  const filename = `${uuidv1()}_${file.originalname}`;

  const blockBlobClient = containerClient.getBlockBlobClient(filename);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });

  const imageUrl = blockBlobClient.url;

  return imageUrl;
}

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Adjust the file size limit as needed
});

export { uploadImage, upload };
