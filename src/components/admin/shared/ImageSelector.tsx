'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageService, ImageItem } from '@/services/imageService';

interface ImageSelectorProps {
  value: string | null;
  onChange: (url: string) => void;
  label: string;
}

export default function ImageSelector({ value, onChange, label }: ImageSelectorProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(value);

  useEffect(() => {
    setSelectedImage(value);
  }, [value]);

  useEffect(() => {
    if (showGallery) {
      loadImages();
    }
  }, [showGallery]);

  const loadImages = async () => {
    try {
      const fetchedImages = await imageService.getAllImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const downloadURL = await imageService.uploadImage(file);
      await loadImages();
      setSelectedImage(downloadURL);
      onChange(downloadURL);
      setShowGallery(false);
    } catch (error) {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onChange(imageUrl);
    setShowGallery(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {!showGallery ? (
        <div>
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-gray-600 hover:text-blue-600"
          >
            {selectedImage ? `Change ${label}` : `Select ${label}`}
          </button>
          
          {selectedImage && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={selectedImage}
                  alt={label}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">{label}</h3>
            <button
              type="button"
              onClick={() => setShowGallery(false)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors w-full justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {uploading ? 'Uploading...' : 'Upload New Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No images in gallery</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {images.map((image) => (
                <button
                  key={image.path}
                  type="button"
                  onClick={() => handleSelectImage(image.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedImage === image.url
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                  {selectedImage === image.url && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}