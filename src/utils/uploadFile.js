import imageCompression from "browser-image-compression";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/firebase";

export const uploadFile = async (files) => {
  const storage = getStorage(app);
  const imgUrls = [];
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    useWebWorker: true,
  };
  for (const file of files) {
    const compressedFile = await imageCompression(file, options);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    await uploadBytesResumable(storageRef, compressedFile);
    const imgUrl = await getDownloadURL(storageRef);
    imgUrls.push(imgUrl);
  }
  return imgUrls;
  // setImg(imgUrls);
  // setUploaded(true);
};
