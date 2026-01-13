import React from "react";
import { useState, useEffect } from "react";

function ImageUpload({ value, onChange }) {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) return;

    onChange(file);

    // Local preview only
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  useEffect(() => {
    if (typeof value === "string" && value) {
      setPreview(value);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blobl:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <div className="mt-4">
      <input
        type="file"
        accept="image/*"
        placeholder="Select Photo"
        onChange={handleImageUpload}
      />

      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="h-32 rounded object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
