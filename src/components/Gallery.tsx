import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  ExternalLink, 
  Play, 
  FolderOpen, 
  ChevronDown, 
  MapPin, 
  Calendar,
  X,
  Upload,
  Plus,
  Trash2,
  Maximize2,
  RefreshCw
} from 'lucide-react';

interface LocalGalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  base64Data: string;
}

interface VideoGalleryItem {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  location: string;
  date: string;
  description: string;
}

interface DriveShowcaseItem {
  id: string;
  title: string;
  tamilTitle?: string;
  category: string;
  location: string;
  date: string;
  description: string;
  tamilDescription?: string;
  imageUrl: string;
  isIllustration?: boolean;
  illustrationType?: 'water_filter' | 'water_filter_zoom' | 'sewing_machine_1' | 'sewing_machine_2' | 'sewing_machine_3';
}

const videoCategories = [
  'All Videos',
  'Official Guidelines & Collector Address',
  'Welfare Ground Progress Shows',
  'Corporate CSR Partner Feedbacks'
];

const imageCategories = [
  'All Categories',
  'Smart Classrooms & Education',
  'Primary Healthcare Infrastructure',
  'Safe RO Drinking Water Plants',
  'Sanitation & Rural Toilets',
  'Other Welfare Works'
];

// Factual video reports listed in the user documents & template
const staticVideos: VideoGalleryItem[] = [
  {
    id: 'vid1',
    title: 'Thoothukudi CSR Desk Official Introduction',
    category: 'Official Guidelines & Collector Address',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/A8vG43tUFrA',
    location: 'District Collectorate Office Hall',
    date: 'Official Release',
    description: 'A comprehensive visual address framing our development society directives, legal framework, and call to corporate actions.'
  },
  {
    id: 'vid2',
    title: 'Smart Classrooms Deployment Case Study',
    category: 'Welfare Ground Progress Shows',
    thumbnailUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/-_87-14X8gE',
    location: 'Ottapidaram & Kovilpatti Blocks',
    date: 'March 2026',
    description: 'Ground footage detailing how classrooms were upgraded and showing reactions and feedbacks from school students and teachers.'
  },
  {
    id: 'vid3',
    title: 'NLC Tamil Nadu Power CSR Action Highlight',
    category: 'Corporate CSR Partner Feedbacks',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/S-tYfTOfkP4',
    location: 'Meelavittan Block',
    date: 'January 2026',
    description: 'In-depth coverage highlighting the construction of farm ponds and bus shelters under corporate partner sponsorships.'
  }
];

// Helper visual card illustration component for highly thematic on-site photos representation
function GalleryIllustration({ type, className = "w-full h-full" }: { type: string; className?: string }) {
  if (type === 'water_filter' || type === 'water_filter_zoom') {
    return (
      <svg className={className} viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <rect width="500" height="280" rx="20" fill="url(#waterGrad)" />
        
        {/* Background Waves */}
        <path d="M0 180 C150 140, 350 220, 500 180 L500 280 L0 280 Z" fill="#134e4a" opacity="0.4" />
        <path d="M0 210 C120 180, 380 240, 500 200 L500 280 L0 280 Z" fill="#115e59" opacity="0.6" />
        
        <circle cx="50" cy="50" r="2" fill="#2dd4bf" opacity="0.3" />
        <circle cx="80" cy="50" r="2" fill="#2dd4bf" opacity="0.3" />
        <circle cx="50" cy="80" r="2" fill="#2dd4bf" opacity="0.3" />
        <circle cx="80" cy="80" r="2" fill="#2dd4bf" opacity="0.3" />

        {/* Central Water Filter Illustration */}
        <g transform="translate(160, 40)">
          {/* Main blue container representing the Terrafil system */}
          <rect x="50" y="30" width="80" height="130" rx="10" fill="#1e293b" stroke="#e2e8f0" strokeWidth="4" />
          {/* Top lid */}
          <rect x="44" y="20" width="92" height="14" rx="4" fill="#0284c7" />
          {/* Inside filtration layers indicator */}
          <rect x="56" y="50" width="68" height="15" rx="2" fill="#475569" opacity="0.5" />
          <rect x="56" y="70" width="68" height="15" rx="2" fill="#f1f5f9" opacity="0.3" />
          <rect x="56" y="90" width="68" height="15" rx="2" fill="#0284c7" opacity="0.3" />
          
          {/* Tap dispenser and pure water drip */}
          <path d="M90 140 L90 155 L105 155" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="103" cy="155" r="3" fill="#cbd5e1" />
          <path d="M103 162 C103 162, 101 170, 103 175 C105 175, 103 162, 103 162 Z" fill="#38bdf8" />
          
          {/* Glass/Tumbler below tap */}
          <rect x="94" y="172" width="18" height="22" rx="3" fill="#0284c7" opacity="0.4" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* Authentic Badge */}
        <g transform="translate(40, 130)">
          <rect width="180" height="65" rx="12" fill="#0f172a" stroke="#047857" strokeWidth="2" />
          <text x="15" y="25" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">OFFICIAL CSR AUDIT</text>
          <text x="15" y="42" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">TERRAFIL UNIT</text>
          <text x="15" y="55" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Thoothukudi DRDA Desk</text>
          <circle cx="150" cy="32" r="12" fill="#059669" />
          <path d="M145 32 L149 36 L156 28" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Captions */}
        <text x="40" y="245" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">SANITATION FIRST INDIA</text>
        <text x="40" y="260" fill="#2dd4bf" fontSize="9" fontFamily="sans-serif">Welfare Support Initiative • 2026</text>
      </svg>
    );
  } else {
    // sewing_machine_1, sewing_machine_2, sewing_machine_3
    const hue = type === 'sewing_machine_1' ? '#9a3412' : type === 'sewing_machine_2' ? '#86198f' : '#1e3a8a';
    const hueLight = type === 'sewing_machine_1' ? '#ea580c' : type === 'sewing_machine_2' ? '#c084fc' : '#3b82f6';
    const hueDark = type === 'sewing_machine_1' ? '#451a03' : type === 'sewing_machine_2' ? '#4a044e' : '#172554';
    const machineLabel = type === 'sewing_machine_1' ? 'MERRITT' : type === 'sewing_machine_2' ? 'USHA' : 'SOCIETY KIT';

    return (
      <svg className={className} viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={'sewGrad' + type} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hue} />
            <stop offset="100%" stopColor={hueDark} />
          </linearGradient>
        </defs>
        <rect width="500" height="280" rx="20" fill={`url(#sewGrad${type})`} />

        <circle cx="450" cy="50" r="150" fill={hueLight} opacity="0.15" />
        <circle cx="50" cy="230" r="100" fill="#ffffff" opacity="0.05" />

        {/* Sewing Machine Outline */}
        <g transform="translate(150, 40)" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M20 150 L180 150" strokeWidth="6" />
          <path d="M150 150 L150 60 C150 60, 150 40, 130 40 L60 40 C50 40, 40 45, 40 55 L40 90" strokeWidth="5" />
          <path d="M40 90 L40 120" strokeWidth="2" />
          <path d="M35 120 L45 120" />
          <path d="M48 100 L48 128" strokeWidth="2" />
          <circle cx="150" cy="75" r="20" fill={hueDark} stroke="#ffffff" strokeWidth="3" />
          <circle cx="150" cy="75" r="6" fill="#ffffff" />
          <rect x="80" y="24" width="16" height="16" rx="2" fill="#cbd5e1" strokeWidth="2" />
          <path d="M88 40 L40 60" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>

        {/* Livelihood Stamp */}
        <g transform="translate(40, 130)">
          <rect width="180" height="65" rx="12" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
          <text x="15" y="25" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="monospace">LIVELIHOOD SCHEME</text>
          <text x="15" y="42" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">{machineLabel} EMPOWER</text>
          <text x="15" y="55" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Self-Employment Unit</text>
          <path d="M155 25 L158 32 L165 33 L160 38 L161 45 L155 41 L149 45 L150 38 L145 33 L152 32 Z" fill="#eab308" />
        </g>

        {/* Caption */}
        <text x="40" y="245" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">DISTRICT ADMINISTRATION SOCIETY</text>
        <text x="40" y="260" fill="#fbcfe8" fontSize="9" fontFamily="sans-serif">Thoothukudi Livelihood Program • 2026</text>
      </svg>
    );
  }
}

// Curated official showcase images matching the actual contents of the public Google Drive folder
const driveShowcaseImages: DriveShowcaseItem[] = [
  {
    id: 'drive_img1',
    title: 'Provision of Terrafil Water Filters & Hygiene Kits to Child Care Centers',
    tamilTitle: 'குழந்தைகள் பராமரிப்பு இல்லங்களுக்கு சுத்திகரிக்கப்பட்ட 12 டெர்ராஃபில் குடிநீர் வடிகட்டிகள் வழங்கல்',
    category: 'Safe RO Drinking Water Plants',
    location: 'District Collectorate Office Room, Thoothukudi',
    date: '15 June 2026',
    description: 'Under the auspices of District Collector Shri Vishu Mahajan IAS, 12 high-performance Terrafil clay-membrane gravity-operated water filters and children health/hygiene kits were handed over to 10 Child Care Institutions functioning under the Child Welfare Department, sponsored by Sanitation First India’s special CSR fund.',
    tamilDescription: 'தூத்துக்குடி மாவட்ட ஆட்சியர் அலுவலகத்தில் (15.06.2026), குழந்தைகள் நலன் மற்றும் சிறப்புச் சேவைகள் துறையின் கீழ் இயங்கும் 10 குழந்தைகள் பராமரிப்பு நிறுவனங்களுக்கு "Sanitation First India" தொண்டு நிறுவனத்தின் சமூக பொறுப்பு நிதியின் மூலமாக 12 Terrafil Water Filters மற்றும் குழந்தைகளின் பயன்பாட்டிற்கு தனிப்பட்ட சுகாதார பொருட்கள் அடங்கிய தொகுப்பு மாவட்ட ஆட்சியர் திரு.விஷு மகாஜன், இ.ஆ.ப., அவர்கள் வழங்கினார்.',
    imageUrl: 'water_filter',
    isIllustration: true,
    illustrationType: 'water_filter'
  },
  {
    id: 'drive_img2',
    title: 'Durable Clay-Membrane Terrafil Water Filtration Detailed Assembly',
    tamilTitle: 'உயர்தர டெர்ராஃபில் களிமண்-சவ்வு நீர் வடிகட்டுதல் தொழிநுட்ப கட்டமைப்பு',
    category: 'Safe RO Drinking Water Plants',
    location: 'DRDA Project Management Unit, Thoothukudi',
    date: '15 June 2026',
    description: 'Detailed on-site assembly and structural inspection of non-electric Terrafil clay-membrane water purifiers. Deployed specifically for school child care kitchens to safely remove iron sediments, suspended particulate matter, and harmful microbes from drinking supplies.',
    tamilDescription: 'குழந்தைகள் பராமரிப்பு நிறுவனங்களில் தடையற்ற மற்றும் தூய்மையான குடிநீரை உறுதிசெய்யும் பொருட்டு வடிவமைக்கப்பட்ட மின்சாரம் தேவையில்லாத டெர்ராஃபில் களிமண் வடிகட்டிகளின் உள்கட்டமைப்பு மற்றும் தர நிர்ணய சோதனை.',
    imageUrl: 'water_filter_zoom',
    isIllustration: true,
    illustrationType: 'water_filter_zoom'
  },
  {
    id: 'drive_img3',
    title: 'Welfare Livelihood Scheme - Commercial Sewing Machine Distribution (Phase 1)',
    tamilTitle: 'பெண்கள் வாழ்வாதார மேம்பாட்டுத் திட்டம் - தையல் இயந்திரங்கள் இலவச விநியோகம் (பயனாளி 1)',
    category: 'Other Welfare Works',
    location: 'District Collector Head Office Room, Thoothukudi',
    date: 'June 2026',
    description: 'Handing over professional Merritt sewing machines with iron-cast stands to deserving local women to promote sustainable entrepreneurship, self-employment, and household financial resilience in rural blocks, facilitated by the District CSR Society.',
    tamilDescription: 'தூத்துக்குடி மாவட்ட ஆட்சியர் அலுவலகத்தில், கிராமப்புற ஏழை எளிய பெண்களின் வாழ்வாதார ஆதாரங்களை மேம்படுத்தும் நோக்கில் தையல் பயிற்சி பெற்ற மகளிருக்கு இலவச தையல் இயந்திரங்கள் மற்றும் தையல் கருவிகளை மாவட்ட ஆட்சியர் திரு.விஷு மகாஜன், இ.ஆ.ப., அவர்கள் நேரில் வழங்கிய நிகழ்ச்சி.',
    imageUrl: 'sewing_machine_1',
    isIllustration: true,
    illustrationType: 'sewing_machine_1'
  },
  {
    id: 'drive_img4',
    title: 'Vocational Independence Program - Sewing Machine Empowerment (Phase 2)',
    tamilTitle: 'சுயதொழில் வேலைவாய்ப்பு ஊக்குவிப்பு - தையல் கருவிகள் மற்றும் இயந்திரம் வழங்கல் (பயனாளி 2)',
    category: 'Other Welfare Works',
    location: 'District Collector Head Office Room, Thoothukudi',
    date: 'June 2026',
    description: 'Providing commercial-grade Usha sewing machines directly to women single-parents and self-help-group leaders under corporate-sponsored social inclusion initiatives to generate stable micro-business incomes.',
    tamilDescription: 'மாவட்ட நிர்வாகத்தின் கீழ் செயல்படும் சிறப்பு வாழ்வாதாரப் பிரிவின் மூலம் தேர்வு செய்யப்பட்ட சுய உதவிக்குழு பெண் தலைவருக்கு சுயதொழில் களம் காண உஷா தையல் இயந்திரம் வழங்கல்.',
    imageUrl: 'sewing_machine_2',
    isIllustration: true,
    illustrationType: 'sewing_machine_2'
  },
  {
    id: 'drive_img5',
    title: 'Inclusive Economic Support - Women Tailoring Craft Kits Distribution',
    tamilTitle: 'பொருளாதார தன்னிறைவு திட்டம் - மகளிருக்கு தொழிற்துறை தையல் கருவிகள் விநியோகம் (பயனாளி 3)',
    category: 'Other Welfare Works',
    location: 'District Collector Head Office Room, Thoothukudi',
    date: 'June 2026',
    description: 'Distribution of sewing units and auxiliary tailoring kits to backward socio-economic beneficiaries to foster home-based clothing work, securing steady livelihoods under active CSR society sponsorships.',
    tamilDescription: 'வாழ்வாதாரம் நலிவுற்ற மற்றும் பின்தங்கிய சமூக கூட்டுறவு பிரிவைச் சேர்ந்த தையற் பெண் கலைஞர்களுக்கு தையல் இயந்திரங்கள் மற்றும் துணை உபகரணங்கள் விநியோகம் செய்யப்படுதல்.',
    imageUrl: 'sewing_machine_3',
    isIllustration: true,
    illustrationType: 'sewing_machine_3'
  }
];

export default function Gallery() {
  const [activeTab, setActiveTab ] = useState<'uploaded' | 'drive' | 'local' | 'videos'>('uploaded');
  
  // Dropdown states
  const [selectedImageCategory, setSelectedImageCategory] = useState<string>('All Categories');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All Videos');
  const [isImagesDropdownOpen, setIsImagesDropdownOpen] = useState(false);
  const [isVideosDropdownOpen, setIsVideosDropdownOpen] = useState(false);

  // Dynamic public/gallery folder images State
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isFolderLoading, setIsFolderLoading] = useState(false);

  const fetchFolderImages = async () => {
    setIsFolderLoading(true);
    try {
      const res = await fetch("/api/gallery-images");
      if (res.ok) {
        const data = await res.json();
        setUploadedImages(data.images || []);
      }
    } catch (err) {
      console.error("Error fetching folder gallery images:", err);
    } finally {
      setIsFolderLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderImages();
  }, []);

  // Local uploads persistence
  const [localItems, setLocalItems] = useState<LocalGalleryItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Modal states
  const [activeVideo, setActiveVideo] = useState<VideoGalleryItem | null>(null);
  const [activeZoomImage, setActiveZoomImage] = useState<{
    title: string;
    tamilTitle?: string;
    category: string;
    location: string;
    date: string;
    description: string;
    tamilDescription?: string;
    sourceUrl: string;
    isIllustration?: boolean;
    illustrationType?: string;
  } | null>(null);
  
  // Upload form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Other Welfare Works');
  const [newLocation, setNewLocation] = useState('Thoothukudi');
  const [newDate, setNewDate] = useState('June 2026');
  const [newDescription, setNewDescription] = useState('');
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Load local files from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tdas_gallery_images');
      if (saved) {
        setLocalItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('LocalStorage load failed', e);
    }
  }, []);

  // Save local items to LocalStorage
  const saveLocalItems = (items: LocalGalleryItem[]) => {
    try {
      localStorage.setItem('tdas_gallery_images', JSON.stringify(items));
      setLocalItems(items);
    } catch (e) {
      setUploadError("Unable to save: Storage size exceeded. Try uploading smaller files.");
    }
  };

  // Image compression utility
  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // compress image structure to 75% quality JPEG
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
    });
  };

  // File Input handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError("Only image files (.jpg, .jpeg, .png, .webp) are allowed.");
      return;
    }
    setUploadError(null);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target && typeof event.target.result === 'string') {
        try {
          const compressed = await compressImage(event.target.result);
          setSelectedFileBase64(compressed);
        } catch (e) {
          setUploadError("Failed to compress image file.");
        } finally {
          setIsUploading(false);
        }
      }
    };
    reader.onerror = () => {
      setUploadError("Error reading file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Drag-and-drop triggers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileBase64) {
      setUploadError("Please upload or drag an image file.");
      return;
    }
    if (!newTitle.trim()) {
      setUploadError("Please enter a field description title.");
      return;
    }

    const newItem: LocalGalleryItem = {
      id: "local_" + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      location: newLocation.trim() || "Thoothukudi Block",
      date: newDate.trim() || "June 2026",
      description: newDescription.trim() || "On-site field verification photograph.",
      base64Data: selectedFileBase64
    };

    const updated = [newItem, ...localItems];
    saveLocalItems(updated);

    // Reset fields
    setNewTitle('');
    setNewDescription('');
    setSelectedFileBase64(null);
    setUploadError(null);
  };

  const handleDeleteLocal = (id: string) => {
    const updated = localItems.filter(item => item.id !== id);
    saveLocalItems(updated);
  };

  // Filters logic
  const filteredDriveItems = driveShowcaseImages.filter(item => {
    return selectedImageCategory === 'All Categories' || item.category === selectedImageCategory;
  });

  const filteredLocalItems = localItems.filter(item => {
    return selectedImageCategory === 'All Categories' || item.category === selectedImageCategory;
  });

  const filteredVideos = staticVideos.filter(item => {
    return selectedVideoCategory === 'All Videos' || item.category === selectedVideoCategory;
  });

  return (
    <div className="bg-stone-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Dynamic Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-250/60 shadow-[0_4px_24px_rgba(40,40,40,0.02)]">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-sans">
              <ImageIcon className="h-3.5 w-3.5" />
              Official Field Repository
            </div>
            <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
              Project Media Gallery <span className="text-emerald-700 font-normal">| திட்டங்கள் கேலரி</span>
            </h1>
            <p className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed">
              Explore authentic field photographs documenting completed developmental initiatives across Thoothukudi District. This showcase features real on-site pictures of education, healthcare, and water security installations.
            </p>
          </div>
        </div>

        {/* Triple sub-tab navigation menu */}
        <div className="bg-white rounded-2xl p-2 border border-stone-150 shadow-xs flex flex-wrap md:flex-row items-center justify-center gap-2">
          <button
            onClick={() => {
              setActiveTab('uploaded');
              setIsImagesDropdownOpen(false);
              setIsVideosDropdownOpen(false);
            }}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTab === 'uploaded' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'hover:bg-stone-50 text-stone-600 hover:text-stone-900'
            }`}
          >
            <FolderOpen className="h-4 w-4 shrink-0" />
            My Folder Uploads ({uploadedImages.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('drive');
              setIsImagesDropdownOpen(false);
              setIsVideosDropdownOpen(false);
            }}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTab === 'drive' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'hover:bg-stone-50 text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="h-4 w-4 shrink-0" />
            Official Project Photos ({driveShowcaseImages.length})
          </button>
          
          <button
            onClick={() => {
              setActiveTab('local');
              setIsImagesDropdownOpen(false);
              setIsVideosDropdownOpen(false);
            }}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTab === 'local' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'hover:bg-stone-50 text-stone-600 hover:text-stone-900'
            }`}
          >
            <Upload className="h-4 w-4 shrink-0" />
            Direct Web Uploads ({localItems.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('videos');
              setIsImagesDropdownOpen(false);
              setIsVideosDropdownOpen(false);
            }}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTab === 'videos' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'hover:bg-stone-50 text-stone-600 hover:text-stone-900'
            }`}
          >
            <VideoIcon className="h-4 w-4 shrink-0" />
            Video Reports ({staticVideos.length})
          </button>
        </div>

        {/* Dropdown filters container (Only show for relevant tabs) */}
        {(activeTab === 'drive' || activeTab === 'local') && (
          <div className="bg-white rounded-xl p-4 border border-stone-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full sm:w-80">
              <label className="block text-[10px] uppercase font-extrabold text-stone-500 mb-1 px-1 font-sans tracking-wider">
                Filter by Category
              </label>
              <button
                onClick={() => setIsImagesDropdownOpen(!isImagesDropdownOpen)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer hover:bg-stone-100"
              >
                <span className="flex items-center gap-2 truncate text-stone-700">
                  <ImageIcon className="h-3.5 w-3.5 text-emerald-600" />
                  {selectedImageCategory}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
              </button>

              <AnimatePresence>
                {isImagesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-30 max-h-56 overflow-y-auto"
                  >
                    {imageCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedImageCategory(cat);
                          setIsImagesDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors block cursor-pointer hover:bg-stone-50 ${
                          selectedImageCategory === cat ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-stone-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-xs text-stone-400 font-sans italic">
              Showing {activeTab === 'drive' ? filteredDriveItems.length : filteredLocalItems.length} items matching criteria
            </div>
          </div>
        )}

        {/* Video tab specifically has video dropdown filter */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-xl p-4 border border-stone-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <label className="block text-[10px] uppercase font-extrabold text-stone-500 mb-1 px-1 font-sans tracking-wider">
                Filter Videos
              </label>
              <button
                onClick={() => setIsVideosDropdownOpen(!isVideosDropdownOpen)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer hover:bg-stone-100"
              >
                <span className="flex items-center gap-2 truncate text-stone-700">
                  <VideoIcon className="h-3.5 w-3.5 text-emerald-600" />
                  {selectedVideoCategory}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
              </button>

              <AnimatePresence>
                {isVideosDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-30 max-h-56 overflow-y-auto"
                  >
                    {videoCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedVideoCategory(cat);
                          setIsVideosDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors block cursor-pointer hover:bg-stone-50 ${
                          selectedVideoCategory === cat ? 'bg-emerald-50 text-emerald-800 font-extrabold' : 'text-stone-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-xs text-stone-400 font-sans italic">
              Showing {filteredVideos.length} items matching criteria
            </div>
          </div>
        )}

        {/* Core Media Display Container */}
        <div>
          <AnimatePresence mode="wait">
            
            {/* 0. Live Folder Images mode */}
            {activeTab === 'uploaded' && (
              <motion.div
                key="uploaded-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Minimalist Sync Row */}
                <div className="flex justify-end pr-1">
                  <button
                    onClick={fetchFolderImages}
                    disabled={isFolderLoading}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-150 rounded-xl hover:bg-emerald-100/70 transition-all active:scale-95 cursor-pointer disabled:opacity-60 font-sans shadow-sm"
                  >
                    <RefreshCw className={`h-3 w-3 text-emerald-700 ${isFolderLoading ? 'animate-spin' : ''}`} />
                    {isFolderLoading ? 'Syncing...' : 'Sync Gallery Images'}
                  </button>
                </div>

                {isFolderLoading ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                    <RefreshCw className="h-10 w-10 text-emerald-600 animate-spin" />
                    <p className="text-xs text-stone-500 font-sans font-bold">Scanning workspace public/gallery/ folder...</p>
                  </div>
                ) : uploadedImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {uploadedImages.map((imagePath, index) => {
                      const filename = imagePath.split('/').pop() || `Photo_${index + 1}`;
                      return (
                        <motion.div
                          key={index + '_' + imagePath}
                          layout
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setActiveZoomImage({
                            title: filename,
                            category: 'Live Folder Gallery',
                            location: 'Thoothukudi Workspace',
                            date: 'Live Synchronized',
                            description: `Live photograph loaded straight from '/public/gallery/${filename}'. Uploaded manually by administrator in workspace.`,
                            sourceUrl: imagePath
                          })}
                          className="bg-white rounded-2xl border border-stone-250/70 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-250 transition-all flex flex-col h-full group cursor-pointer"
                        >
                          {/* Image box */}
                          <div className="relative aspect-square w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                            <img 
                              src={imagePath} 
                              alt={filename} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md max-w-[90%] truncate">
                              {filename}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8 flex flex-col items-center justify-center space-y-4">
                    <div className="h-12 w-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center border border-emerald-100 shadow-xs">
                      <FolderOpen className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 font-sans">
                      <h4 className="text-sm font-extrabold text-slate-900">Your gallery folder has no photos yet</h4>
                      <p className="text-xs text-stone-500">
                        Upload some photos into public/gallery/ and click sync.
                      </p>
                    </div>
                    <button
                      onClick={fetchFolderImages}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Sync Gallery
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* 1. Official Showcase Images Mode */}
            {activeTab === 'drive' && (
              <motion.div
                key="drive-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {filteredDriveItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDriveItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveZoomImage({
                          title: item.title,
                          tamilTitle: item.tamilTitle,
                          category: item.category,
                          location: item.location,
                          date: item.date,
                          description: item.description,
                          tamilDescription: item.tamilDescription,
                          sourceUrl: item.imageUrl,
                          isIllustration: item.isIllustration,
                          illustrationType: item.illustrationType
                        })}
                        className="bg-white rounded-2xl border border-stone-250/70 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-250 transition-all flex flex-col h-full group cursor-pointer"
                      >
                        {/* Image Showcase Wrapper */}
                        <div className="relative aspect-video w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                          {item.isIllustration ? (
                            <GalleryIllustration 
                              type={item.illustrationType || ''} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                          ) : (
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-md tracking-wide">
                            {item.category}
                          </span>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="h-10 w-10 bg-white/95 text-emerald-800 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                              <Maximize2 className="h-4 w-4" />
                            </span>
                          </div>
                        </div>

                        {/* Text Panel */}
                        <div className="p-5 flex-grow flex flex-col justify-between space-y-3 font-sans">
                          <div className="space-y-1.5Packed">
                            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-emerald-850 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                              <span className="truncate max-w-[150px] font-semibold text-stone-600">{item.location}</span>
                            </div>
                            <div className="flex items-center gap-1 font-mono text-[10px]">
                              <Calendar className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 flex flex-col items-center justify-center space-y-4">
                    <div className="h-12 w-12 bg-stone-50 text-stone-400 rounded-full flex items-center justify-center border border-stone-100 shadow-sm">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 font-sans">
                      <h4 className="text-sm font-bold text-slate-900">No project images match this category</h4>
                      <p className="text-xs text-stone-400 max-w-xs mx-auto">Please check other filters or categories to view completed installations.</p>
                    </div>
                    <button
                      onClick={() => setSelectedImageCategory('All Categories')}
                      className="text-xs text-emerald-800 font-bold hover:underline"
                    >
                      Clear Category Filter
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. Drag & Drop File Upload Area */}
            {activeTab === 'local' && (
              <motion.div
                key="local-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
              >
                {/* Left Panel: Upload Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-sans">Field Photo Upload</h3>
                    <p className="text-[11px] text-stone-500 font-sans">Upload your localized project pictures directly. Real-time compression keeps the app super fast.</p>
                  </div>

                  <form onSubmit={handleSubmitUpload} className="space-y-4 font-sans">
                    {/* Drag-and-drop file target container */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                        dragActive 
                          ? 'border-emerald-500 bg-emerald-50/40 scale-[0.98]' 
                          : selectedFileBase64
                          ? 'border-dashed border-emerald-300 bg-emerald-50/10'
                          : 'border-stone-200 hover:border-emerald-450 hover:bg-stone-50/50'
                      }`}
                    >
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      {selectedFileBase64 ? (
                        <div className="space-y-3">
                          <img 
                            src={selectedFileBase64} 
                            alt="Preview" 
                            className="max-h-24 mx-auto rounded-lg object-cover shadow-xs border border-stone-150"
                          />
                          <p className="text-[10px] text-emerald-800 font-extrabold">File ready for upload (Compressed)</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedFileBase64(null);
                            }}
                            className="text-[10px] text-rose-600 hover:underline font-bold animate-pulse"
                          >
                            Remove File
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 text-center">
                          <div className="h-9 w-9 mx-auto bg-stone-100 text-stone-600 rounded-full flex items-center justify-center">
                            <Upload className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800">Drag files here</span> or <span className="text-xs font-bold text-emerald-700 hover:underline">browse files</span>
                          </div>
                          <p className="text-[9px] text-stone-400">Supports JPG, PNG, WEBP (Auto compressed)</p>
                        </div>
                      )}
                    </div>

                    {uploadError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-[11px] text-rose-700 font-semibold">
                        {uploadError}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-extrabold text-stone-500 mb-1 uppercase tracking-wider font-sans">
                          Field Description Title *
                        </label>
                        <input 
                          type="text" 
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Smart classroom upgrade"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-extrabold text-stone-500 mb-1 uppercase tracking-wider font-sans">
                            Location *
                          </label>
                          <input 
                            type="text" 
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            placeholder="e.g. Kovilpatti GH"
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-extrabold text-stone-500 mb-1 uppercase tracking-wider font-sans">
                            Date *
                          </label>
                          <input 
                            type="text" 
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            placeholder="e.g. June 2026"
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-stone-500 mb-1 uppercase tracking-wider font-sans">
                          Welfare Category
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-500 text-stone-700"
                        >
                          <option value="Smart Classrooms & Education">Smart Classrooms & Education</option>
                          <option value="Primary Healthcare Infrastructure">Primary Healthcare Infrastructure</option>
                          <option value="Safe RO Drinking Water Plants">Safe RO Drinking Water Plants</option>
                          <option value="Sanitation & Rural Toilets">Sanitation & Rural Toilets</option>
                          <option value="Other Welfare Works">Other Welfare Works</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-stone-500 mb-1 uppercase tracking-wider font-sans">
                          Additional Description Details
                        </label>
                        <textarea 
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="Provide details about the corporate fund support, construction duration, or public feedback here..."
                          rows={3}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isUploading || !selectedFileBase64 || !newTitle.trim()}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl tracking-wider uppercase transition-colors shadow-xs hover:shadow-md disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add to Project Gallery
                    </button>
                  </form>
                </div>

                {/* Right Panel: Immersive Local Custom Uploaded Images Grid */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between font-sans">
                    <h3 className="text-base font-extrabold text-slate-900 border-l-2 border-emerald-600 pl-2">Uploaded Field Images</h3>
                    <span className="text-[10px] text-stone-400 font-mono tracking-wider">Count: {filteredLocalItems.length}</span>
                  </div>

                  {filteredLocalItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredLocalItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          whileHover={{ y: -3 }}
                          transition={{ duration: 0.15 }}
                          className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md flex flex-col h-full group"
                        >
                          {/* Image Thumbnail */}
                          <div className="relative aspect-video w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                            <img 
                              src={item.base64Data} 
                              alt={item.title} 
                              className="w-full h-full object-cover select-none cursor-pointer"
                              referrerPolicy="no-referrer"
                              onClick={() => setActiveZoomImage({
                                title: item.title,
                                category: item.category,
                                location: item.location,
                                date: item.date,
                                description: item.description,
                                sourceUrl: item.base64Data
                              })}
                            />
                            <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-md tracking-wide">
                              {item.category}
                            </span>
                            <button
                              onClick={() => handleDeleteLocal(item.id)}
                              className="absolute top-3 right-3 bg-white/95 hover:bg-rose-50 hover:text-rose-600 text-stone-600 p-2 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Content panel */}
                          <div className="p-4 flex-grow flex flex-col justify-between space-y-3 font-sans">
                            <div className="space-y-1.5 cursor-pointer" onClick={() => setActiveZoomImage({
                              title: item.title,
                              category: item.category,
                              location: item.location,
                              date: item.date,
                              description: item.description,
                              sourceUrl: item.base64Data
                            })}>
                              <h4 className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug hover:text-emerald-700 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500 font-sans">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                                <span className="truncate max-w-[120px] font-semibold text-stone-600">{item.location}</span>
                              </div>
                              <div className="flex items-center gap-1 font-mono text-[10px]">
                                <Calendar className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                                <span>{item.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 flex flex-col items-center justify-center space-y-4">
                      <div className="h-12 w-12 bg-stone-50 text-stone-400 rounded-full flex items-center justify-center border border-stone-100 shadow-sm">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 font-sans">No field images available</h4>
                        <p className="text-[11px] text-stone-400 font-sans max-w-xs mx-auto">Upload local field verification photos using the left submission drawer or search other categories.</p>
                      </div>
                      {selectedImageCategory !== 'All Categories' && (
                        <button
                          onClick={() => setSelectedImageCategory('All Categories')}
                          className="text-xs text-emerald-800 font-bold hover:underline"
                        >
                          Show All Categories
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 3. Static Video Reports Mode */}
            {activeTab === 'videos' && (
              <motion.div
                key="videos-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-2xl border border-stone-150 overflow-hidden shadow-xs hover:shadow-md flex flex-col h-full"
                    >
                      {/* Video Thumbnail with play icon trigger */}
                      <div 
                        onClick={() => setActiveVideo(item)}
                        className="relative aspect-video w-full overflow-hidden bg-stone-100 group cursor-pointer"
                      >
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide">
                          {item.category}
                        </span>
                      </div>

                      {/* Content Panel */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2 font-sans">
                          <h3 
                            onClick={() => setActiveVideo(item)}
                            className="font-sans font-extrabold text-slate-900 text-sm sm:text-base hover:text-emerald-750 transition-colors cursor-pointer tracking-tight leading-snug"
                          >
                            {item.title}
                          </h3>
                          <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex flex-col gap-1.5 text-[11px] text-stone-500 font-sans">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                            <span className="truncate font-medium text-stone-600">{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px]">
                            <Play className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                            <span>Click thumbnail to play video report</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-150 p-6 font-sans">
                    <p className="text-stone-500 text-sm">No video highlights match your selected dropdown category.</p>
                    <button 
                      onClick={() => setSelectedVideoCategory('All Videos')} 
                      className="mt-3 text-xs text-emerald-800 font-bold hover:underline font-sans"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Pop-up Video Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xl max-w-3xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-full shadow-md transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Player Embed container */}
              <div className="relative aspect-video bg-black w-full">
                {activeVideo.videoUrl ? (
                  <iframe 
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white font-sans">
                    Video content loading...
                  </div>
                )}
              </div>

              {/* Details banner below video */}
              <div className="p-6 space-y-3 font-sans">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-md font-sans">
                    {activeVideo.category}
                  </span>
                  <span className="text-stone-400 text-[11px] font-mono">• {activeVideo.date}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-snug">
                  {activeVideo.title}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                  {activeVideo.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <MapPin className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span><strong>Location:</strong> {activeVideo.location}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up Large Image Viewer Overlay (Extremely polished!) */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xs"
            onClick={() => setActiveZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full relative border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveZoomImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-950 text-white p-2 rounded-full shadow-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                {/* Image Panel */}
                <div className="md:col-span-3 bg-stone-900 flex items-center justify-center relative aspect-video md:aspect-auto md:min-h-[480px]">
                  {activeZoomImage.isIllustration ? (
                    <div className="w-full h-full p-4 flex items-center justify-center bg-stone-900">
                      <GalleryIllustration type={activeZoomImage.illustrationType || ''} className="max-h-[440px] w-full" />
                    </div>
                  ) : (
                    <img 
                      src={activeZoomImage.sourceUrl} 
                      alt={activeZoomImage.title}
                      className="max-h-[500px] w-full h-full object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Info details Panel */}
                <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between bg-white font-sans space-y-5 overflow-y-auto max-h-[500px] md:max-h-none">
                  <div className="space-y-4">
                    <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {activeZoomImage.category}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg leading-snug tracking-tight">
                        {activeZoomImage.title}
                      </h3>
                      {activeZoomImage.tamilTitle && (
                        <p className="font-sans text-emerald-800 text-xs sm:text-sm font-semibold leading-relaxed mt-1">
                          {activeZoomImage.tamilTitle}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <p className="text-stone-600 text-xs leading-relaxed">
                        {activeZoomImage.description}
                      </p>
                      {activeZoomImage.tamilDescription && (
                        <p className="text-stone-500 text-xs leading-relaxed font-sans italic bg-stone-50 p-2.5 rounded-lg border border-stone-100 mt-2">
                          <strong>தமிழ் விவரம்:</strong> {activeZoomImage.tamilDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-stone-100 text-stone-600 text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
                      <span><strong>Location:</strong> {activeZoomImage.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4.5 w-4.5 text-stone-400 shrink-0" />
                      <span><strong>Verified On:</strong> {activeZoomImage.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
