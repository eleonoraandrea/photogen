import React, { useRef, useState } from 'react';
import { ReferenceImage } from '../types';
import { Upload, X, Plus } from 'lucide-react';

interface ImageUploaderProps {
  images: ReferenceImage[];
  onImagesChange: (images: ReferenceImage[]) => void;
  label?: string;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  images, 
  onImagesChange, 
  label = "Reference Images",
  maxImages = 4
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => processFile(file as File));
    }
    // Reset input
    if (inputRef.current) inputRef.current.value = '';
  };

  const processFile = (file?: File) => {
    if (!file) return;
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed.`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const newImage: ReferenceImage = {
        id: Math.random().toString(36).substring(7),
        data: result,
        mimeType: file.type
      };
      onImagesChange([...images, newImage]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onImagesChange(images.filter(img => img.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach((file) => processFile(file as File));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-xs text-slate-500">{images.length} / {maxImages}</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((img) => (
          <div key={img.id} className="relative group aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <img src={img.data} alt="Reference" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={(e) => handleRemove(img.id, e)}
                className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        {images.length < maxImages && (
          <div 
            className={`relative aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
              dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input 
              ref={inputRef}
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleFileChange} 
              className="hidden" 
            />
            <Plus className="w-6 h-6 text-slate-400 mb-1" />
            <span className="text-xs text-slate-400">Add Image</span>
          </div>
        )}
      </div>
    </div>
  );
};