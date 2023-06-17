"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function UploadForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeInBytes = 1024 * 1024;

    if (file && allowedTypes.includes(file.type)) {
      if (file.size <= maxSizeInBytes) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
          );
          formData.append('folder', "Lugano");

          const response = await axios.post(
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
            formData
          );

          if (response.status === 200) {
            const data = response.data;
            setSelectedImage(data.secure_url);
            console.log(data);
            setErrorMessage('');
          }
        } catch (error) {
          console.log('Error uploading image:', error);
          setSelectedImage(null);
          setErrorMessage('Failed to upload image. Please try again later.');
        }
      } else {
        setSelectedImage(null);
        setErrorMessage('Please select an image file smaller than 1MB.');
      }
    } else {
      setSelectedImage(null);
      setErrorMessage('Please select a valid image file (JPEG or PNG).');
    }
  }

  return (
    <div>
      <label htmlFor="image" className="block mb-2 font-medium text-gray-700">
        <span className="px-4 py-2 text-white bg-transparent rounded-md cursor-pointer">
          Upload Image
        </span>
      </label>
      <input
        type="file"
        id="image"
        accept=".jpg, .jpeg, .png, .webp"
        onChange={handleImageChange}
        className="hidden"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {selectedImage && (
        <div className="mt-2">
          <Image src={selectedImage} alt="Selected" width={200} height={200}  className="w-auto h-auto" />
        </div>
      )}
    </div>
  );
}
