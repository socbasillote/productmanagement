import React from "react";

function ImageUpload({ value, onChange }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("/image")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

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
