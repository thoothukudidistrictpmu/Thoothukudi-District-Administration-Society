import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Maximize2,
  RefreshCw,
  X
} from 'lucide-react';

const DEFAULT_WORKSPACE_IMAGES = [
  "/gallery/WhatsApp Image 2026-06-17 at 5.39.45 PM.jpeg",
  "/gallery/WhatsApp Image 2026-06-17 at 5.39.47 PM.jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 11.15.24 AM.jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 11.15.25 AM (1).jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 11.15.25 AM.jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 11.15.26 AM (1).jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 11.15.26 AM (2).jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 11.15.26 AM.jpeg",
  "/gallery/WhatsApp Image 2026-06-25 at 3.57.01 PM.jpeg"
];

export default function Gallery() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isFolderLoading, setIsFolderLoading] = useState(false);
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null);

  const fetchFolderImages = async () => {
    setIsFolderLoading(true);
    try {
      const res = await fetch("/api/gallery-images");
      if (res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setUploadedImages(data.images);
        } else {
          setUploadedImages(DEFAULT_WORKSPACE_IMAGES);
        }
      } else {
        setUploadedImages(DEFAULT_WORKSPACE_IMAGES);
      }
    } catch (err) {
      console.error("Error fetching folder gallery images:", err);
      setUploadedImages(DEFAULT_WORKSPACE_IMAGES);
    } finally {
      setIsFolderLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderImages();
  }, []);

  const displayImages = uploadedImages.length > 0 ? uploadedImages : DEFAULT_WORKSPACE_IMAGES;

  return (
    <div className="bg-stone-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Dynamic Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-250/60 shadow-[0_4px_24px_rgba(40,40,40,0.02)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-sans">
              <ImageIcon className="h-3.5 w-3.5 animate-pulse text-emerald-605" />
              Official Field Repository
            </div>
            <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
              Project Media Gallery <span className="text-emerald-700 font-normal">| திட்டங்கள் கேலரி</span>
            </h1>
            <p className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed">
              Explore authentic field photographs documenting completed developmental initiatives across Thoothukudi District. This showcase features real on-site pictures of public welfare installations.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={fetchFolderImages}
              disabled={isFolderLoading}
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all active:scale-95 cursor-pointer disabled:opacity-60 font-sans shadow-md"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFolderLoading ? 'animate-spin' : ''}`} />
              {isFolderLoading ? 'Syncing...' : 'Sync Gallery'}
            </button>
          </div>
        </div>

        {/* Dynamic Image Grid */}
        {isFolderLoading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center space-y-4 bg-white rounded-3xl border border-stone-200/60 p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <RefreshCw className="h-10 w-10 text-emerald-600 animate-spin" />
            <p className="text-xs text-stone-500 font-sans font-extrabold tracking-wide uppercase">Scanning workspace gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayImages.map((imagePath, index) => {
              const encodedPath = encodeURI(imagePath);
              return (
                <motion.div
                  key={index + '_' + imagePath}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: Math.min(index * 0.05, 0.4),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    y: -6,
                    scale: 1.025,
                    boxShadow: "0 12px 30px -8px rgba(4,120,87,0.14)"
                  }}
                  onClick={() => setActiveZoomImage(encodedPath)}
                  className="bg-white rounded-2xl border border-stone-250/70 overflow-hidden shadow-xs hover:border-emerald-500 transition-all cursor-pointer group aspect-square relative"
                >
                  <div className="w-full h-full overflow-hidden bg-stone-100 flex items-center justify-center relative">
                    <img 
                      src={encodedPath} 
                      alt="Gallery Photograph" 
                      className="w-full h-full object-cover transition-transform duration-550 ease-out group-hover:scale-110 select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlay with smooth fade-in */}
                    <div className="absolute inset-0 bg-emerald-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="h-11 w-11 bg-white/95 text-emerald-800 rounded-full flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <Maximize2 className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pop-up Image Viewer Overlay (Extremely polished, simple and focused!) */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActiveZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveZoomImage(null)}
                className="absolute -top-12 sm:top-1 right-0 sm:right-1 bg-white/10 hover:bg-white/20 active:scale-95 text-white p-2.5 rounded-full shadow-lg transition-all cursor-pointer z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl relative border border-stone-800 p-2 max-w-full">
                <img 
                  src={activeZoomImage} 
                  alt="Zoomed Gallery Photograph"
                  className="max-h-[75vh] max-w-full h-auto object-contain rounded-2xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
