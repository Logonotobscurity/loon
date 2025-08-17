import React from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageHandlerProps {
  attachedImage: File | null;
  onImageChange: (image: File | null) => void;
  onImageRemove: () => void;
}

export const ImageHandler: React.FC<ImageHandlerProps> = ({
  attachedImage,
  onImageChange,
  onImageRemove,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    }
  };

  return (
    <div className="image-handler">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div
        className="image-drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {attachedImage ? (
          <div className="image-preview flex items-center space-x-2 bg-bg-white-5 rounded-lg p-2">
            <div className="image-info flex-1">
              <p className="text-sm text-text-white truncate">{attachedImage.name}</p>
              <p className="text-xs text-text-white-60">
                {(attachedImage.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={onImageRemove}
              className="p-1 hover:bg-bg-white-10 rounded transition-colors"
              aria-label="Remove image"
            >
              <XMarkIcon className="w-4 h-4 text-text-white-60" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="image-upload-btn flex items-center space-x-2 text-text-white-60 hover:text-primary transition-colors"
          >
            <PhotoIcon className="w-5 h-5" />
            <span className="text-sm">Add Image</span>
          </button>
        )}
      </div>
    </div>
  );
};