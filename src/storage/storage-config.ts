import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: '/Users/quynh/Documents/PROJECT/datn-be/bk-acr-a14b8fbd82c4.json',
  projectId: 'bk-acr',
});

export const gcsBucketName = 'datn-quynh-1';
export const gcsBucket = storage.bucket(gcsBucketName);
