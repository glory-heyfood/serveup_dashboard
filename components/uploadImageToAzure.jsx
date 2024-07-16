import { BlobServiceClient } from "@azure/storage-blob";

// Configure your Azure Storage Account details
const connectString = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.NEXT_PUBLIC_AZURE_CONTAINER_NAME;

export async function uploadImageToAzure(blob, itemName) {
  try {
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectString);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Ensure the container exists
    await containerClient.createIfNotExists();

    const blobName = `cropped-image-${Date.now()}.jpg`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Upload the Blob
    await blockBlobClient.uploadBrowserData(blob);

    const blobUrl = blockBlobClient.url;
    console.log(`Upload successful: ${blobName}`);
  } catch (error) {
    console.error("Error uploading blob:", error.message);
  }
}
