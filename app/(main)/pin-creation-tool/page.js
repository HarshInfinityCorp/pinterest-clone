"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown, Plus, ChevronsRight, ChevronsLeft, X, Upload, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PinCreationTool() {
  const router = useRouter();
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [board, setBoard] = useState("");
  const [tags, setTags] = useState("");
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  
  // Drafts
  const [drafts, setDrafts] = useState([]);
  
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Handle file upload
  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPG, PNG, GIF) or video (MP4) file');
      return;
    }
    
    // Validate file size (20MB for images, 200MB for videos)
    const maxSize = file.type.startsWith('video/') ? 200 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(file.type.startsWith('video/') 
        ? 'Video file must be less than 200MB' 
        : 'Image file must be less than 20MB');
      return;
    }
    
    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle save from URL
  const handleSaveFromUrl = async () => {
    if (!urlInput.trim()) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would fetch the image from the URL
      // For now, we'll simulate it
      setImagePreview(urlInput);
      setUploadedImage({ name: 'url-image', type: 'image/jpeg' });
      setIsUrlModalOpen(false);
      setUrlInput("");
    } catch (error) {
      alert('Failed to load image from URL');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save as draft
  const saveAsDraft = () => {
    const draft = {
      id: Date.now(),
      title,
      description,
      link,
      board,
      tags,
      imagePreview,
      createdAt: new Date().toISOString(),
    };
    setDrafts([...drafts, draft]);
    alert('Draft saved successfully!');
  };

  // Load draft
  const loadDraft = (draft) => {
    setTitle(draft.title);
    setDescription(draft.description);
    setLink(draft.link);
    setBoard(draft.board);
    setTags(draft.tags);
    setImagePreview(draft.imagePreview);
  };

  // Delete draft
  const deleteDraft = (draftId) => {
    setDrafts(drafts.filter(d => d.id !== draftId));
  };

  // Publish pin
  const handlePublish = async () => {
    if (!uploadedImage && !imagePreview) {
      alert('Please upload an image or video');
      return;
    }
    
    if (!title.trim()) {
      alert('Please add a title');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPin = {
        id: Date.now().toString(),
        title,
        description,
        link,
        board,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        image: imagePreview,
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, send to backend
      console.log('Publishing pin:', newPin);
      
      alert('Pin published successfully!');
      router.push('/');
    } catch (error) {
      alert('Failed to publish pin. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add product tag
  const handleAddProduct = () => {
    const productName = prompt('Enter product name:');
    if (productName) {
      setTaggedProducts([...taggedProducts, { id: Date.now(), name: productName }]);
    }
  };

  // Remove product tag
  const handleRemoveProduct = (productId) => {
    setTaggedProducts(taggedProducts.filter(p => p.id !== productId));
  };

  return (
    <div className="flex w-[calc(100%+32px)] -ml-4 h-[calc(100vh-64px)] bg-white font-sans text-[#111] overflow-hidden relative border-t border-gray-200">
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,video/mp4"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* URL Modal */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Save from URL</h3>
              <button 
                onClick={() => setIsUrlModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-[#E60023] outline-none mb-4"
            />
            <button
              onClick={handleSaveFromUrl}
              disabled={isLoading || !urlInput.trim()}
              className="w-full py-3 bg-[#E60023] hover:bg-[#AD081B] text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Main Content (Left) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar for Create Pin */}
        <div className="h-[72px] border-b border-gray-200 flex items-center justify-between px-8 bg-white z-10 shrink-0">
          <h1 className="text-xl font-bold tracking-tight">Create Pin</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={saveAsDraft}
              className="px-4 py-2 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Save as draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="px-6 py-2 bg-[#E60023] hover:bg-[#AD081B] text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-white border-t-transparent">
          <div className="max-w-[850px] w-full flex flex-col md:flex-row gap-10 mt-2 pb-10">

            {/* Image Upload Column */}
            <div className="w-full md:w-[320px] shrink-0">
              {imagePreview ? (
                <div className="relative w-full h-[450px] rounded-[32px] overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  ref={dropZoneRef}
                  onClick={handleUploadClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full h-[450px] bg-[#E9E9E9] rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all px-6 text-center border-2 ${
                    isDragging 
                      ? 'border-[#E60023] bg-[#E60023]/10' 
                      : 'border-transparent hover:border-[#d3d3d3]'
                  }`}
                >
                  <div className="mb-4 mt-8">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="1.5" />
                      <path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-[15px] font-medium leading-tight text-[#111]">
                    {isDragging ? 'Drop your file here' : 'Choose a file or drag and drop it here'}
                  </p>

                  <div className="mt-auto pt-8 pb-4">
                    <p className="text-[12px] text-[#555] px-2 leading-[1.4]">We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.</p>
                  </div>
                </div>
              )}

              <hr className="w-full border-t border-gray-200 my-6" />

              <div>
                <button 
                  onClick={() => setIsUrlModalOpen(true)}
                  className="w-full py-3 bg-[#E9E9E9] text-[#111] text-[15px] font-bold rounded-full transition-colors hover:bg-[#E0E0E0] flex items-center justify-center gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  Save from URL
                </button>
              </div>
            </div>

            {/* Form Column */}
            <div className="flex-1 flex flex-col pl-0 md:pl-2">

              {/* Title (Floating inner label) */}
              <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3 min-h-[72px]">
                <label className="text-[11px] font-normal text-[#767676] mb-1">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title" 
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-[18px] md:text-[22px] font-bold placeholder-[#767676] text-[#111] outline-none" 
                />
              </div>

              {/* Description (Outer label) */}
              <div className="flex flex-col mt-6">
                <label className="text-[12px] font-normal text-[#111] mb-2 px-1">Description</label>
                <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl h-[120px] px-4 py-4">
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a detailed description" 
                    className="w-full h-full bg-transparent border-none p-0 focus:ring-0 text-[15px] placeholder-[#767676] text-[#111] outline-none resize-none" 
                  />
                </div>
              </div>

              {/* Link (Outer label) */}
              <div className="flex flex-col mt-6">
                <label className="text-[12px] font-normal text-[#111] mb-2 px-1">Link</label>
                <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3.5">
                  <input 
                    type="text" 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Add a link" 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[15px] placeholder-[#767676] text-[#111] outline-none" 
                  />
                </div>
              </div>

              {/* Board (Outer label) */}
              <div className="flex flex-col mt-6">
                <label className="text-[12px] font-normal text-[#111] mb-2 px-1">Board</label>
                <div className="relative">
                  <select 
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3.5 appearance-none focus:outline-none text-[15px] text-[#767676] cursor-pointer"
                  >
                    <option value="">Choose a board</option>
                    <option value="home">Home</option>
                    <option value="fashion">Fashion</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676] pointer-events-none" />
                </div>
              </div>

              {/* Tagged topics (Floating inner label) */}
              <div className="flex flex-col bg-[#E9E9E9] border border-[#d3d3d3] rounded-2xl px-4 py-3 mt-6 min-h-[64px]">
                <label className="text-[11px] font-normal text-[#767676] mb-1">Tagged topics ({tags ? tags.split(',').filter(Boolean).length : 0})</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Search for a tag (comma separated)" 
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-[15px] placeholder-[#767676] text-[#111] outline-none" 
                />
              </div>

              {/* Tag Products */}
              <div className="flex flex-col mt-6">
                <p className="text-[12px] font-normal text-[#111] mb-2 px-1">Tag Products</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {taggedProducts.map(product => (
                    <span 
                      key={product.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {product.name}
                      <button 
                        onClick={() => handleRemoveProduct(product.id)}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <button 
                  onClick={handleAddProduct}
                  className="self-start px-4 py-[10px] bg-[#E9E9E9] text-[#767676] font-semibold rounded-lg text-[13px] hover:bg-[#E0E0E0]"
                >
                  Add products
                </button>
              </div>

              {/* More options */}
              <div className="mt-6">
                <button 
                  onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                  className="flex items-center gap-1 cursor-pointer w-max hover:opacity-80 transition-opacity"
                >
                  <p className="text-[13px] font-bold text-[#555]">More options</p>
                  <ChevronDown className={`w-[18px] h-[18px] text-[#555] transition-transform ${isMoreOptionsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreOptionsOpen && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Additional options coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Drafts Panel */}
      <div className={`flex flex-col bg-white border-l border-[#d3d3d3] transition-all duration-300 ease-in-out ${isDraftsOpen ? 'w-[320px]' : 'w-[80px]'} shrink-0 z-20 h-full overflow-hidden`}>

        {/* Top section of right sidebar */}
        <div className="h-[72px] flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
          {isDraftsOpen && (
            <h2 className="text-[16px] font-bold text-black pl-2 whitespace-nowrap">Pin drafts ({drafts.length})</h2>
          )}
          <button
            onClick={() => setIsDraftsOpen(!isDraftsOpen)}
            className={`w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0 ${!isDraftsOpen ? 'mx-auto' : ''}`}
          >
            {isDraftsOpen ? <ChevronsRight className="w-[22px] h-[22px] text-black" /> : <ChevronsLeft className="w-[22px] h-[22px] text-black" />}
          </button>
        </div>

        {/* Content area of right sidebar */}
        {!isDraftsOpen ? (
          <div className="flex items-center justify-center py-4 border-b border-gray-200">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0">
              <Plus className="w-[22px] h-[22px] text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="p-4 bg-white flex-1 flex flex-col gap-2 overflow-y-auto">
            <button className="w-full py-2.5 bg-[#E9E9E9] text-[#767676] text-[13px] font-bold rounded-lg transition-colors text-center hover:bg-[#E0E0E0] mb-4">
              Create new
            </button>
            
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No drafts yet</p>
            ) : (
              drafts.map(draft => (
                <div 
                  key={draft.id}
                  className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {draft.imagePreview && (
                      <img 
                        src={draft.imagePreview} 
                        alt="" 
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{draft.title || 'Untitled'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(draft.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDraft(draft.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => loadDraft(draft)}
                      className="text-xs text-[#E60023] font-semibold hover:underline"
                    >
                      Load
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
