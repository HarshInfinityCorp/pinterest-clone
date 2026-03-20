"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import { mockPins, currentUser } from "@/lib/data";
import { Settings, Link as LinkIcon } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("created");

  const createdPins = mockPins.slice(0, 8);
  const savedPins = mockPins.slice(8, 16);

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={true} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <button className="absolute bottom-2 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
          <p className="text-gray-500 mb-4">@{currentUser.username}</p>

          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="font-bold">{currentUser.followers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{currentUser.following.toLocaleString()}</p>
              <p className="text-sm text-gray-500">following</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold">
              Share
            </button>
            <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold">
              Edit profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b mb-8">
          <button
            onClick={() => setActiveTab("created")}
            className={`px-6 py-3 font-semibold relative ${
              activeTab === "created" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Created
            {activeTab === "created" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-3 font-semibold relative ${
              activeTab === "saved" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Saved
            {activeTab === "saved" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        </div>

        {/* Pins Grid */}
        <div>
          {activeTab === "created" ? (
            <MasonryGrid pins={createdPins} />
          ) : (
            <MasonryGrid pins={savedPins} />
          )}
        </div>
      </div>
    </div>
  );
}
