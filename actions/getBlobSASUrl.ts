"use server";
import {
  BlobSASPermissions,
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
export default async function getBlobSASUrl(filename: string) {
  const storageAccount = process.env.storageAccount;
  const accessKey = process.env.accessKey;
  const containerName = process.env.containerName;
  const connectionString = process.env.connectionString;

  const creds = new StorageSharedKeyCredential(storageAccount!, accessKey!);
  const blobSAS = generateBlobSASQueryParameters(
    {
      containerName: containerName!,
      blobName: filename,
      permissions: BlobSASPermissions.parse("r"),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 864000000),
    },
    creds,
  ).toString();

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      connectionString!,
    );
    const blob = blobServiceClient
      .getContainerClient(containerName!)
      .getBlobClient(filename);

    return blob.url + "?" + blobSAS;
  } catch (error) {
    console.log((error as Error).message);
    return "error";
  }
}
