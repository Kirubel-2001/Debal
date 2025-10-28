import { Upload, X, AlertCircle } from "lucide-react";

function PhotoUpload({ previewImages, onImageUpload, onRemoveImage, error }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Photos (Maximum 5)
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {previewImages.map((img) => (
          <div key={img.id} className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => onRemoveImage(img.id)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {previewImages.length < 5 && (
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}

      <p className="text-sm text-gray-500">
        Upload up to 5 photos. First photo will be the cover image.
      </p>
    </div>
  );
}

export default PhotoUpload;