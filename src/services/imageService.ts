import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  listAll, 
  deleteObject,
  ListResult 
} from 'firebase/storage';
import { storage } from './firebase';

export interface ImageItem {
  url: string;
  name: string;
  path: string;
}

const IMAGES_PATH = 'images';

export const imageService = {
  async uploadImage(file: File): Promise<string> {
    try {
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}_${sanitizedName}`;
      const storageRef = ref(storage, `${IMAGES_PATH}/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  async getAllImages(): Promise<ImageItem[]> {
    try {
      const imagesRef = ref(storage, IMAGES_PATH);
      const result: ListResult = await listAll(imagesRef);
      
      const images = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            url,
            name: itemRef.name,
            path: itemRef.fullPath,
          };
        })
      );
      
      return images.sort((a, b) => b.name.localeCompare(a.name));
    } catch (error) {
      console.error('Error fetching images:', error);
      throw new Error('Failed to fetch images');
    }
  },

  async deleteImage(imagePath: string): Promise<void> {
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  },
};