"use client";

import { useState } from "react";
import { Heart, Download, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function PinCard({ pin }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(pin.likes);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <Link href={`/pin/${pin.id}`}>
      <div
        className="masonry-item pin-card relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={pin.image}
          alt={pin.title}
          className="w-full h-auto object-cover rounded-2xl"
          loading="lazy"
        />

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-between p-3">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  isSaved
                    ? "bg-gray-800 text-white"
                    : "bg-[#E60023] text-white hover:bg-[#ad081b]"
                }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-[#E60023] text-[#E60023]" : "text-gray-700"
                    }`}
                  />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Title below image */}
        <div className="p-2">
          <p className="text-sm font-semibold text-gray-800 truncate">{pin.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <img
              src={pin.user.avatar}
              alt={pin.user.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-600">{pin.user.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
