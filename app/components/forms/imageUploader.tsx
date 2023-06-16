"use client"
import { useState } from 'react';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_cloudinary_upload_preset');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setSelectedImage(data.secure_url);
          setErrorMessage('');
        } else {
          throw new Error('Failed to upload image.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setSelectedImage(null);
        setErrorMessage('Failed to upload image. Please try again later.');
      }
    } else {
      setSelectedImage(null);
      setErrorMessage('Please select an image file.');
    }
  };

  return (
    <div>
      <label htmlFor="image" className="block mb-2 font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        id="image"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
        className="mb-2"
      />
      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="mt-2 w-32 h-32" />
      )}
      {selectedImage && (
        <button
          onClick={() => ()}
          className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Open Image
        </button>
      )}
    </div>
  );
};

