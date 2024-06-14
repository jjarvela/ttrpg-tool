"use server";
import {
  BlobSASPermissions,
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";

/**
 * This function generates an SAS url for a specific file on Azure.
 * SAS allows third party limited-time access to the file
 * @param filename type: string - the filename to look for from the Azure storage
 * @returns string in the form of azure SAS url
 */

export default async function getBlobSASUrl(filename: string) {
  const storageAccount = process.env.storageAccount;
  const accessKey = process.env.accessKey;
  const containerName = process.env.containerName;
  const connectionString = process.env.connectionString;

  const creds = new StorageSharedKeyCredential(storageAccount!, accessKey!);
  //Generate SAS string with given permissions and credentials
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
    console.error((error as Error).message);
    return "error";
  }
}
