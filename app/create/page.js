"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Upload, X } from "lucide-react";
import { categories } from "@/lib/data";

export default function CreatePinPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would upload the pin
    // For now, just redirect to home
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={true} />

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Create Pin</h1>
          <button
            onClick={handleSubmit}
            disabled={!image || !title}
            className="px-6 py-2 bg-[#E60023] text-white font-semibold rounded-full hover:bg-[#ad081b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Publish
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div>
            {!image ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl h-96 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragActive
                    ? "border-[#E60023] bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-600 mb-2">Drag and drop or click to upload</p>
                <p className="text-sm text-gray-400">Recommendation: Use high-quality .jpg files less than 20MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={image}
                  alt="Upload preview"
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a title"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell everyone what your Pin is about"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E60023] focus:border-transparent bg-white"
              >
                <option value="">Select a category</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
