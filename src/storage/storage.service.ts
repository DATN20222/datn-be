import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {

  async uploadBase64Image(img) {
    const image = 'data:image/jpeg;base64,'+ img;
    const newFileName = (Math.random() + 1).toString(36).substring(2);
    const base64Data = image as string;
    const [, imageExtension] = base64Data.split(';')[0].split('/');
    const filename = newFileName + '.' + imageExtension;
  
    const base64_img = image.replace('/^data:image\/jpeg;base64,/', '');
    const imgBuffer = Buffer.from(base64_img, 'base64');
    const blobName = `images/slider/${filename}`;
    // const stream = Readable.from(base64_img); //Tried that too
    // const containerClient: ContainerClient = (
    //   this.blobServiceClient as BlobServiceClient
    // ).getContainerClient('public');
    // const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // // await blockBlobClient.create
    // await blockBlobClient.uploadStream(
    //   imgBuffer,
    //   { blobHTTPHeaders: { blobContentType: 'image/jpeg' } }
    // );
  }

}
