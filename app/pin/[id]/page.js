"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { mockPins } from "@/lib/data";
import { Heart, Download, Share2, MoreHorizontal, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pin = mockPins.find((p) => p.id === params.id) || mockPins[0];
  
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(pin.likes);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const relatedPins = mockPins.filter((p) => p.category === pin.category && p.id !== pin.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={true} />

      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="bg-gray-100 flex items-center justify-center p-4">
              <img
                src={pin.image}
                alt={pin.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </div>

            {/* Info Section */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-6 h-6 text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Share2 className="w-6 h-6 text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Download className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                      isSaved
                        ? "bg-gray-800 text-white"
                        : "bg-[#E60023] text-white hover:bg-[#ad081b]"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{pin.title}</h1>
              <p className="text-gray-600 mb-6">{pin.description}</p>

              <div className="flex items-center justify-between py-4 border-t border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={pin.user.avatar}
                    alt={pin.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{pin.user.name}</p>
                    <p className="text-sm text-gray-500">1.2k followers</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-sm">
                  Follow
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{likes.toLocaleString()} likes</p>
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full transition-colors ${
                      isLiked ? "bg-red-50" : "hover:bg-gray-100"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isLiked ? "fill-[#E60023] text-[#E60023]" : "text-gray-700"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pins */}
        {relatedPins.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">More like this</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedPins.map((relatedPin) => (
                <Link
                  key={relatedPin.id}
                  href={`/pin/${relatedPin.id}`}
                  className="rounded-2xl overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img
                    src={relatedPin.image}
                    alt={relatedPin.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
