import { BlobServiceClient } from "@azure/storage-blob";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();

      const file = body.base64Image;

      const storageAccount = process.env.storageAccount;
      const containerName = process.env.containerName;
      const accessKey = process.env.accessKey;
      const connectionString = process.env.connectionString;

      const blobServiceClient = BlobServiceClient.fromConnectionString(
        connectionString!,
      );
      const containerClient = blobServiceClient.getContainerClient(
        containerName!,
      );

      const filename = `${Date.now()}.png`;
      const imageBuffer = Buffer.from(file, "base64");
      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      await blockBlobClient.uploadData(imageBuffer, {
        blobHTTPHeaders: { blobContentType: "image/png" },
      });

      return Response.json({ status: 200, filename });
    } catch (error) {
      return Response.json({ status: 500, message: "an error occurred" });
    }
  } else {
    return Response.json({ status: 405, message: "not allowed" });
  }
}
