import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_STATIC } from '../data';
import { Project, SubProject } from '../types';
import { DETAILED_CONTRIBUTORS } from '../data/contributors_data';
import schoolStudentsBoard from '../assets/images/school_students_board_1782901784503.jpg';
import adiDravidarWelfareEntrance from '../assets/images/adi_dravidar_welfare_entrance_1782902929585.jpg';
import mahalirThittamSHG from '../assets/images/mahalir_thittam_shg_1782904500000_1782904030145.jpg';
import socialWelfareGroup from '../assets/images/social_welfare_group_1782904439937.jpg';

function getDepartmentForWork(heading: string, workName: string): string {
  const h = (heading || '').toLowerCase();
  const w = (workName || '').toLowerCase();

  if (
    h.includes('school') || h.includes('stem') || h.includes('science') || h.includes('education') || h.includes('learning') || h.includes('classroom') || h.includes('anganwadi') || h.includes('kindergarten') ||
    w.includes('school') || w.includes('stem') || w.includes('science') || w.includes('education') || w.includes('learning') || w.includes('classroom') || w.includes('anganwadi') || w.includes('kindergarten')
  ) {
    return 'Education';
  }
  if (
    h.includes('health') || h.includes('hearing') || h.includes('medical') || h.includes('hospital') || h.includes('addiction') || h.includes('newborn') || h.includes('phc') || h.includes('doctor') || h.includes('patient') ||
    w.includes('health') || w.includes('hearing') || w.includes('medical') || w.includes('hospital') || w.includes('addiction') || w.includes('newborn') || w.includes('phc') || w.includes('doctor') || w.includes('patient')
  ) {
    return 'Health and Family Welfare';
  }
  if (
    h.includes('disabled') || h.includes('differently abled') || h.includes('scooter') || h.includes('wheelchair') || h.includes('pwd') ||
    w.includes('disabled') || w.includes('differently abled') || w.includes('scooter') || w.includes('wheelchair') || w.includes('pwd')
  ) {
    return 'Welfare of differently abled Person';
  }
  if (
    h.includes('farm') || h.includes('pond') || h.includes('agriculture') || h.includes('irrigation') || h.includes('borewell') || h.includes('water harvesting') ||
    w.includes('farm') || w.includes('pond') || w.includes('agriculture') || w.includes('irrigation') || w.includes('borewell') || w.includes('water harvesting')
  ) {
    return 'Agriculture and Family Welfare';
  }
  if (
    h.includes('veterinary') || h.includes('livestock') || h.includes('animal') || h.includes('cow') || h.includes('cattle') ||
    w.includes('veterinary') || w.includes('livestock') || w.includes('animal') || w.includes('cow') || w.includes('cattle')
  ) {
    return 'Animal Husbandry';
  }
  return 'Municipal Administration and water Supply';
}

function getStaticMergedProjects(): Project[] {
  const list = [...PROJECTS_STATIC];
  DETAILED_CONTRIBUTORS.forEach(c => {
    c.works.forEach(w => {
      const alreadyExists = list.some(p => 
        p.title.toLowerCase().trim() === w.heading.toLowerCase().trim() ||
        p.description.toLowerCase().trim() === w.workName.toLowerCase().trim()
      );
      if (!alreadyExists) {
        list.push({
          department: getDepartmentForWork(w.heading, w.workName),
          title: w.heading || 'CSR Welfare Work',
          description: w.workName || 'Detailed corporate social responsibility initiative.',
          financialOutlay: w.sanctionedAmountStr || 'N/A',
          status: 'Completed',
          contributor: c.companyName || 'General Administration',
          imageUrl: ''
        });
      }
    });
  });
  return list;
}
import { 
  GraduationCap, 
  HeartPulse, 
  Accessibility, 
  Leaf, 
  Sparkles, 
  ShieldAlert,
  FolderDot,
  Coins, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  Maximize2,
  X,
  TrendingUp,
  LayoutGrid,
  Briefcase,
  CheckSquare,
  Check,
  ShoppingCart,
  Trash2,
  Minus,
  Users,
  Anchor,
  Trees,
  Smile,
  Flower2,
  Building2
} from 'lucide-react';

// Department color theme map for interactive visual borders and badges
const getDepartmentTheme = (dept: string) => {
  const d = dept.toLowerCase().trim();
  
  if (d.includes('education') || d.includes('school') || d.includes('learning') || d.includes('collegiate') || d.includes('literacy')) {
    return {
      accent: 'emerald',
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200 hover:border-emerald-400',
      borderGroup: 'border-emerald-500/30 hover:border-emerald-500',
      borderColor: 'border-emerald-500',
      text: 'text-emerald-800',
      indicator: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'hover:shadow-emerald-100',
      iconColor: 'text-emerald-600',
      categoryImage: schoolStudentsBoard // Beautiful modern school students bulletin board
    };
  }
  
  if (d.includes('health') || d.includes('medical') || d.includes('hospital') || d.includes('clinical') || d.includes('hud') || d.includes('jdhs') || (d.includes('welfare') && d.includes('family'))) {
    return {
      accent: 'rose',
      bg: 'bg-rose-50/80',
      border: 'border-rose-200 hover:border-rose-400',
      borderGroup: 'border-rose-500/30 hover:border-rose-500',
      borderColor: 'border-rose-500',
      text: 'text-rose-800',
      indicator: 'bg-rose-500',
      gradient: 'from-rose-500 to-pink-600',
      shadow: 'hover:shadow-rose-100',
      iconColor: 'text-rose-600',
      categoryImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80' // Clean modern clinic/medical facility
    };
  }
  
  if (d.includes('abled') || d.includes('disable') || d.includes('person') || d.includes('pwds')) {
    return {
      accent: 'indigo',
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-200 hover:border-indigo-400',
      borderGroup: 'border-indigo-500/30 hover:border-indigo-500',
      borderColor: 'border-indigo-500',
      text: 'text-indigo-805',
      indicator: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-purple-600',
      shadow: 'hover:shadow-indigo-100',
      iconColor: 'text-indigo-600',
      categoryImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140e2b8?auto=format&fit=crop&w=1200&q=80' // Supportive rehabilitation / therapy / community empowerment
    };
  }

  if (d.includes('mahalir') || d.includes('thittam') || d.includes('shg') || d.includes('women') || d.includes('livelihood')) {
    return {
      accent: 'fuchsia',
      bg: 'bg-fuchsia-50/80',
      border: 'border-fuchsia-200 hover:border-fuchsia-400',
      borderGroup: 'border-fuchsia-500/30 hover:border-fuchsia-500',
      borderColor: 'border-fuchsia-500',
      text: 'text-fuchsia-800',
      indicator: 'bg-fuchsia-500',
      gradient: 'from-fuchsia-500 to-pink-600',
      shadow: 'hover:shadow-fuchsia-100',
      iconColor: 'text-fuchsia-650',
      categoryImage: mahalirThittamSHG
    };
  }

  if (d.includes('horticulture') || d.includes('garden') || d.includes('flower') || d.includes('plant')) {
    return {
      accent: 'lime',
      bg: 'bg-lime-50/80',
      border: 'border-lime-200 hover:border-lime-400',
      borderGroup: 'border-lime-500/30 hover:border-lime-500',
      borderColor: 'border-lime-500',
      text: 'text-lime-800',
      indicator: 'bg-lime-500',
      gradient: 'from-lime-500 to-emerald-600',
      shadow: 'hover:shadow-lime-100',
      iconColor: 'text-lime-600',
      categoryImage: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80' // Beautiful modern organic greenhouse/garden
    };
  }
  
  if (d.includes('agricultur') || d.includes('farm') || d.includes('pond') || d.includes('irrigation') || d.includes('agri') || d.includes('soil')) {
    return {
      accent: 'teal',
      bg: 'bg-teal-50/80',
      border: 'border-teal-200 hover:border-teal-400',
      borderGroup: 'border-teal-500/30 hover:border-teal-500',
      borderColor: 'border-teal-500',
      text: 'text-teal-800',
      indicator: 'bg-teal-500',
      gradient: 'from-teal-500 to-emerald-600',
      shadow: 'hover:shadow-teal-100',
      iconColor: 'text-teal-600',
      categoryImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80' // Lush green agri landscapes
    };
  }
  
  if (d.includes('husbandry') || d.includes('veterinary') || d.includes('animal') || d.includes('livestock') || d.includes('dairy')) {
    return {
      accent: 'amber',
      bg: 'bg-amber-50/80',
      border: 'border-amber-200 hover:border-amber-400',
      borderGroup: 'border-amber-500/30 hover:border-amber-500',
      borderColor: 'border-amber-500',
      text: 'text-amber-800',
      indicator: 'bg-amber-500',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-amber-100',
      iconColor: 'text-amber-600',
      categoryImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80' // Professional veterinary farm
    };
  }

  if (d.includes('forest') || d.includes('tree') || d.includes('plantation') || d.includes('nature') || d.includes('greenery')) {
    return {
      accent: 'green',
      bg: 'bg-green-50/80',
      border: 'border-green-200 hover:border-green-400',
      borderGroup: 'border-green-500/30 hover:border-green-500',
      borderColor: 'border-green-500',
      text: 'text-green-800',
      indicator: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-700',
      shadow: 'hover:shadow-green-100',
      iconColor: 'text-green-600',
      categoryImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' // Deep green woodland forest pathway
    };
  }

  if (d.includes('municipal') || d.includes('water supply') || d.includes('sanitation') || d.includes('waste') || d.includes('drain') || d.includes('city') || d.includes('town') || d.includes('corporation')) {
    return {
      accent: 'sky',
      bg: 'bg-sky-50/80',
      border: 'border-sky-200 hover:border-sky-400',
      borderGroup: 'border-sky-500/30 hover:border-sky-500',
      borderColor: 'border-sky-500',
      text: 'text-sky-800',
      indicator: 'bg-sky-500',
      gradient: 'from-sky-500 to-blue-600',
      shadow: 'hover:shadow-sky-100',
      iconColor: 'text-sky-650',
      categoryImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80' // Smart green modern urban cityscape/clean water
    };
  }

  if (d.includes('police') || d.includes('cctv') || d.includes('camera') || d.includes('security') || d.includes('monitoring')) {
    return {
      accent: 'violet',
      bg: 'bg-violet-50/80',
      border: 'border-violet-200 hover:border-violet-400',
      borderGroup: 'border-violet-500/30 hover:border-violet-500',
      borderColor: 'border-violet-500',
      text: 'text-violet-800',
      indicator: 'bg-violet-500',
      gradient: 'from-violet-500 to-fuchsia-600',
      shadow: 'hover:shadow-violet-100',
      iconColor: 'text-violet-650',
      categoryImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80' // Surveillance & public safety monitor
    };
  }

  if (d.includes('sport') || d.includes('stadium') || d.includes('youth') || d.includes('recreation')) {
    return {
      accent: 'fuchsia',
      bg: 'bg-fuchsia-50/80',
      border: 'border-fuchsia-200 hover:border-fuchsia-400',
      borderGroup: 'border-fuchsia-500/30 hover:border-fuchsia-500',
      borderColor: 'border-fuchsia-500',
      text: 'text-fuchsia-800',
      indicator: 'bg-fuchsia-500',
      gradient: 'from-fuchsia-500 to-pink-600',
      shadow: 'hover:shadow-fuchsia-100',
      iconColor: 'text-fuchsia-650',
      categoryImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80' // Sports track field
    };
  }

  if (d.includes('fisher') || d.includes('marine') || d.includes('port') || d.includes('coastal') || d.includes('ocean')) {
    return {
      accent: 'cyan',
      bg: 'bg-cyan-50/80',
      border: 'border-cyan-200 hover:border-cyan-400',
      borderGroup: 'border-cyan-500/30 hover:border-cyan-500',
      borderColor: 'border-cyan-500',
      text: 'text-cyan-800',
      indicator: 'bg-cyan-500',
      gradient: 'from-cyan-500 to-blue-600',
      shadow: 'hover:shadow-cyan-100',
      iconColor: 'text-cyan-650',
      categoryImage: 'https://images.unsplash.com/photo-1513553404607-988bf2703777?auto=format&fit=crop&w=1200&q=80' // Beautiful coastal port/sea harbor
    };
  }

  if (d.includes('social welfare')) {
    return {
      accent: 'purple',
      bg: 'bg-purple-50/80',
      border: 'border-purple-200 hover:border-purple-400',
      borderGroup: 'border-purple-500/30 hover:border-purple-500',
      borderColor: 'border-purple-500',
      text: 'text-purple-800',
      indicator: 'bg-purple-500',
      gradient: 'from-purple-500 to-indigo-600',
      shadow: 'hover:shadow-purple-100',
      iconColor: 'text-purple-650',
      categoryImage: socialWelfareGroup
    };
  }

  if (d.includes('adi dravidar') || d.includes('marginalized') || d.includes('welfare')) {
    return {
      accent: 'purple',
      bg: 'bg-purple-50/80',
      border: 'border-purple-200 hover:border-purple-400',
      borderGroup: 'border-purple-500/30 hover:border-purple-500',
      borderColor: 'border-purple-500',
      text: 'text-purple-800',
      indicator: 'bg-purple-500',
      gradient: 'from-purple-500 to-indigo-600',
      shadow: 'hover:shadow-purple-100',
      iconColor: 'text-purple-650',
      categoryImage: adiDravidarWelfareEntrance
    };
  }

  if (d.includes('child') || d.includes('icds') || d.includes('protection officer') || d.includes('anganwadi') || d.includes('nutritional') || d.includes('nursery') || d.includes('baby')) {
    return {
      accent: 'blue',
      bg: 'bg-blue-50/80',
      border: 'border-blue-200 hover:border-blue-400',
      borderGroup: 'border-blue-500/30 hover:border-blue-500',
      borderColor: 'border-blue-500',
      text: 'text-blue-800',
      indicator: 'bg-blue-500',
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'hover:shadow-blue-100',
      iconColor: 'text-blue-600',
      categoryImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80' // Happy children playing in safe supportive play spaces
    };
  }

  // General default fallback
  return {
    accent: 'slate',
    bg: 'bg-slate-50/80',
    border: 'border-slate-200 hover:border-slate-400',
    borderGroup: 'border-slate-500/30 hover:border-slate-500',
    borderColor: 'border-slate-500',
    text: 'text-slate-800',
    indicator: 'bg-slate-500',
    gradient: 'from-slate-500 to-zinc-600',
    shadow: 'hover:shadow-slate-100',
    iconColor: 'text-slate-650',
    categoryImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' // High quality executive administration
  };
};

const getDepartmentIcon = (dept: string) => {
  const d = dept.toLowerCase();
  if (d.includes('education') || d.includes('school') || d.includes('learning') || d.includes('collegiate')) {
    return <GraduationCap className="h-5 w-5" />;
  }
  if (d.includes('health') || d.includes('medical') || d.includes('hospital') || d.includes('clinical') || d.includes('hud') || d.includes('jdhs')) {
    return <HeartPulse className="h-5 w-5" />;
  }
  if (d.includes('abled') || d.includes('disable') || d.includes('person') || d.includes('pwds')) {
    return <Accessibility className="h-5 w-5" />;
  }
  if (d.includes('mahalir') || d.includes('thittam') || d.includes('shg') || d.includes('women') || d.includes('livelihood')) {
    return <Users className="h-5 w-5" />;
  }
  if (d.includes('horticulture') || d.includes('garden') || d.includes('flower') || d.includes('plant')) {
    return <Flower2 className="h-5 w-5" />;
  }
  if (d.includes('agricultur') || d.includes('farm') || d.includes('pond') || d.includes('irrigation') || d.includes('agri') || d.includes('soil')) {
    return <Leaf className="h-5 w-5" />;
  }
  if (d.includes('husbandry') || d.includes('veterinary') || d.includes('animal') || d.includes('livestock') || d.includes('dairy')) {
    return <Sparkles className="h-5 w-5" />;
  }
  if (d.includes('fisher') || d.includes('marine') || d.includes('port') || d.includes('coastal') || d.includes('ocean')) {
    return <Anchor className="h-5 w-5" />;
  }
  if (d.includes('forest') || d.includes('tree') || d.includes('plantation')) {
    return <Trees className="h-5 w-5" />;
  }
  if (d.includes('municipal') || d.includes('water supply') || d.includes('sanitation') || d.includes('waste') || d.includes('drain') || d.includes('city') || d.includes('town') || d.includes('corporation')) {
    return <Building2 className="h-5 w-5" />;
  }
  if (d.includes('police') || d.includes('cctv') || d.includes('camera') || d.includes('security') || d.includes('monitoring')) {
    return <ShieldAlert className="h-5 w-5" />;
  }
  if (d.includes('adi dravidar') || d.includes('social welfare') || d.includes('marginalized') || d.includes('welfare')) {
    return <Briefcase className="h-5 w-5" />;
  }
  if (d.includes('child') || d.includes('icds') || d.includes('protection officer') || d.includes('anganwadi') || d.includes('nutritional') || d.includes('baby')) {
    return <Smile className="h-5 w-5" />;
  }
  return <FolderDot className="h-5 w-5" />;
};

const getProjectFallbackImage = (title: string, description: string = '', department: string = ''): string => {
  const theme = getDepartmentTheme(department || title);
  return theme.categoryImage;
};

// Simple standalone CSV parser
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [''];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

// Convert dynamic outlays to numeric value for sum computation
const parseCostToNumeric = (outlay: string | undefined): number => {
  if (!outlay) return 0;
  const cleaned = outlay.replace(/Rs\./i, '').replace(/,/g, '').trim().toLowerCase();
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  
  if (cleaned.includes('lakh')) {
    return num * 100000;
  }
  if (cleaned.includes('cr') || cleaned.includes('crore')) {
    return num * 10000000;
  }
  return num;
};

const formatCostNumeric = (value: number): string => {
  if (value >= 10000000) {
    return `Rs. ${(value / 10000000).toFixed(2)} Crore`;
  }
  if (value >= 100000) {
    return `Rs. ${(value / 100000).toFixed(2)} Lakhs`;
  }
  if (value === 0) return 'Custom / TBD';
  return `Rs. ${value.toLocaleString()}`;
};

interface ProjectsPageProps {
  cart?: Project[];
  onToggleCart?: (project: Project) => void;
  onCartChange?: (newCart: Project[]) => void;
  onNavClick?: (tabId: string) => void;
}

export default function ProjectsPage({
  cart = [],
  onToggleCart = () => {},
  onCartChange = () => {},
  onNavClick = () => {}
}: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const cached = localStorage.getItem('thoothukudi_cached_projects');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load cached projects', e);
    }
    return getStaticMergedProjects();
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);


  // Load live data silently in the background
  const loadLiveDataSilently = async () => {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow/gviz/tq?tqx=out:csv&t=${Date.now()}`
      );
      if (!response.ok) return;
      const csvText = await response.text();
      const parsedRows = parseCSV(csvText);

      if (parsedRows.length <= 1) return;

      const parsedProjects: Project[] = [];
      let currentDept = '';

      for (let i = 1; i < parsedRows.length; i++) {
        const row = parsedRows[i];
        if (row.length < 5) continue;
        
        let dept = row[0]?.trim() || '';
        const title = row[1]?.trim() || '';
        const description = row[2]?.trim() || '';
        const outlay = row[3]?.trim() || '';
        const location = row[4]?.trim() || '';
        const contributor = row[5]?.trim() || '';

        if (!title && !description) continue;
        if (dept.toLowerCase().includes('name of the department')) continue;

        if (dept !== '') {
          currentDept = dept;
        } else {
          dept = currentDept;
        }

        const normalizedTitle = (title || 'Untitled Project').trim();
        const normalizedDept = (dept || 'Other General Initiatives').trim();
        const normalizedOutlay = (outlay || 'N/A').trim();
        const normalizedLocation = (location || 'General District Areas').trim();
        const normalizedDescription = (description || 'No detailed description specified.').trim();

        const existingProject = parsedProjects.find(p => p.title.toLowerCase().trim() === normalizedTitle.toLowerCase());

        if (existingProject) {
          if (!existingProject.subProjects) {
            existingProject.subProjects = [];
          }
          existingProject.subProjects.push({
            location: normalizedLocation,
            financialOutlay: normalizedOutlay,
            description: normalizedDescription,
            status: 'Not taken up'
          });

          // Accumulate cost
          const currentTotalVal = parseCostToNumeric(existingProject.financialOutlay) + parseCostToNumeric(normalizedOutlay);
          existingProject.financialOutlay = formatCostNumeric(currentTotalVal);
        } else {
          parsedProjects.push({
            department: normalizedDept,
            title: normalizedTitle,
            description: normalizedDescription,
            financialOutlay: normalizedOutlay,
            status: 'Not taken up',
            contributor: contributor || 'General Administration',
            imageUrl: getProjectFallbackImage(normalizedTitle, normalizedDescription, normalizedDept),
            subProjects: [
              {
                location: normalizedLocation,
                financialOutlay: normalizedOutlay,
                description: normalizedDescription,
                status: 'Not taken up'
              }
            ]
          });
        }
      }

      // Fetch dynamic completed partner works from CSR Contributors sheet
      try {
        const CONTRIBUTORS_CSV_URL = `https://docs.google.com/spreadsheets/d/1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow/gviz/tq?tqx=out:csv&sheet=CSR%20Contributors&t=${Date.now()}`;
        const contribResponse = await fetch(CONTRIBUTORS_CSV_URL);
        if (contribResponse.ok) {
          const contribCsvText = await contribResponse.text();
          const contribRows = parseCSV(contribCsvText);
          let currentCompany = '';
          
          for (let j = 1; j < contribRows.length; j++) {
            const row = contribRows[j];
            if (row.length < 4) continue;
            let company = row[1] ? row[1].trim() : '';
            const workName = row[2] ? row[2].trim() : '';
            const amountStr = row[3] ? row[3].trim() : '';
            const heading = row[4] ? row[4].trim() : '';

            if (!company && currentCompany) {
              company = currentCompany;
            } else if (company) {
              currentCompany = company;
            }
            if (!company) continue;
            if (!workName && !amountStr && !heading) continue;

            const finalHeading = heading || 'CSR Welfare Initiative';
            const finalWorkName = workName || 'CSR welfare development work';

            const alreadyExists = parsedProjects.some(p => 
              p.title.toLowerCase().trim() === finalHeading.toLowerCase().trim() ||
              p.description.toLowerCase().trim() === finalWorkName.toLowerCase().trim()
            );

            if (!alreadyExists) {
              const computedDept = getDepartmentForWork(finalHeading, finalWorkName);
              parsedProjects.push({
                department: computedDept,
                title: finalHeading,
                description: finalWorkName,
                financialOutlay: amountStr || 'Rs. 0',
                status: 'Completed',
                contributor: company,
                imageUrl: getProjectFallbackImage(finalHeading, finalWorkName, computedDept)
              });
            }
          }
        }
      } catch (errContrib) {
        console.warn('Silent live contributors load failed for Projects page: ', errContrib);
      }

      if (parsedProjects.length > 0) {
        setProjects(parsedProjects);
        try {
          localStorage.setItem('thoothukudi_cached_projects', JSON.stringify(parsedProjects));
        } catch (e) {
          console.warn('Failed to save projects to cache', e);
        }
      }
    } catch (err) {
      console.log('Background update skipped, serving secure local database: ', err);
    }
  };

  useEffect(() => {
    loadLiveDataSilently();
  }, []);

  // Filter out completed projects for display purposes
  const activeNotTakenUpProjects = projects.filter(p => !p.status.toLowerCase().includes('complete'));

  // Compute stats on the current parsed set for the creative summary block
  const totalProjectsCount = activeNotTakenUpProjects.length;
  const completedProjectsCount = projects.filter(p => p.status.toLowerCase().includes('complete')).length;
  const notStartedCount = activeNotTakenUpProjects.length;

  // Unique categories helper
  const departments: string[] = Array.from(new Set(activeNotTakenUpProjects.map(p => p.department)));
  const categories: string[] = ['All Categories', ...departments];

  // Helper helper to count total items in a department
  const getCategoryCount = (catName: string) => {
    if (catName === 'All Categories') return activeNotTakenUpProjects.length;
    return activeNotTakenUpProjects.filter(p => p.department === catName).length;
  };

  const getDetailedGroupedWording = (project: Project): string => {
    return `THOOTHUKUDI DISTRICT ADMINISTRATION CSR PROJECTS INITIATIVE
============================================================

Department Sector: ${project.department}
Consolidated Target: ${project.title}
Estimated Budget Allocation: ${project.financialOutlay}
Administrative Desk: CSR Project Management Unit (PMU)

OPERATIONAL CONTEXT & DEVELOPMENT JUSTIFICATION
------------------------------------------------------------
The District of Thoothukudi, guided by the dynamic vision of the District Collector, has launched an innovative Corporate Social Responsibility (CSR) convergence platform. The primary goal is to channel corporate philanthropy directly into underserved grassroots pockets, ensuring high impact, strict transparency, and sustainable development.

This specific blueprint initiative, "${project.title}", represents a priority sector requirement compiled directly from field assessments conducted by the District's block officers and public departments. In order to streamline administrative processing and maximize procurement efficiency, several location-specific implementations have been consolidated under this unified project umbrella.

GEOGRAPHICAL & SOCIO-ECONOMIC SUB-PROJECT CRITERIA
------------------------------------------------------------
1. TARGETED COMMUNITY DEVELOPMENT: Rather than implementing generic projects, each individual block and institution is custom-targeted based on current infrastructural deficits. This ensures that every rupee contributed directly serves localized public interest.
2. TAILORED CORPORATE PARTICIPATION: Corporate sponsors have the unique flexibility to support specific local blocks, municipal panchayats, or educational institutions that align with their corporate mandates, rather than having to fund the entire aggregated project sum.
3. STRICT GOVERNMENT OVERSIGHT: To maintain absolute accountability, all funded sub-projects are overseen directly by the Thoothukudi District Administration Society. Periodic third-party physical inspections, audits, and completion tracking are integrated.
4. SUSTAINABLE REPLICABILITY MODEL: All constructed assets and modernizations are handed over directly to municipal councils, public health committees, or parent-teacher associations, securing ongoing operations and community ownership.

MOU PROTOCOLS & CSR COMPLIANCE CRITERIA
------------------------------------------------------------
We invite companies, public-sector undertakings, and social foundations to partner with us under Section 135 of the Companies Act. Once a submission of interest is registered, our PMU desk will fast-track the project allocation.

Upon receiving formal approval, sponsors will be provided with:
- Formal tripartite Memorandum of Understanding (MOU) blueprints.
- Prominent sponsor branding, project nameboards, and digital maps.
- Regular progress updates with high-resolution site photographs.
- Standard audited expenditure statements and completion certificates.

Together, let us build a progressive, resilient, and inclusive Thoothukudi through transparent and strategic public-private synergy.`;
  };

  const isSubProjectSelected = (projTitle: string, subLocation: string): boolean => {
    const cartItem = cart.find(c => c.title.toLowerCase().trim() === projTitle.toLowerCase().trim());
    if (!cartItem) return false;
    if (!cartItem.subProjects) return false;
    return cartItem.subProjects.some(sub => sub.location.toLowerCase().trim() === subLocation.toLowerCase().trim());
  };

  const handleToggleSubProject = (project: Project, sub: SubProject) => {
    const existingCartItem = cart.find(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim());
    
    if (!existingCartItem) {
      // Add new project to cart with just this sub-project
      const newProjectCartItem: Project = {
        ...project,
        subProjects: [sub],
        financialOutlay: sub.financialOutlay // Outlay is just this sub-project's outlay
      };
      onCartChange([...cart, newProjectCartItem]);
    } else {
      // Project exists in cart. Toggle sub-project
      const subExists = existingCartItem.subProjects?.some(
        s => s.location.toLowerCase().trim() === sub.location.toLowerCase().trim()
      );
      
      let updatedSubProjects = existingCartItem.subProjects || [];
      if (subExists) {
        updatedSubProjects = updatedSubProjects.filter(
          s => s.location.toLowerCase().trim() !== sub.location.toLowerCase().trim()
        );
      } else {
        updatedSubProjects = [...updatedSubProjects, sub];
      }
      
      if (updatedSubProjects.length === 0) {
        // Remove project from cart entirely
        onCartChange(cart.filter(c => c.title.toLowerCase().trim() !== project.title.toLowerCase().trim()));
      } else {
        // Update the project's sub-projects and sum up their financial outlay
        const totalOutlayVal = updatedSubProjects.reduce((sum, s) => sum + parseCostToNumeric(s.financialOutlay), 0);
        const updatedCart = cart.map(c => {
          if (c.title.toLowerCase().trim() === project.title.toLowerCase().trim()) {
            return {
              ...c,
              subProjects: updatedSubProjects,
              financialOutlay: formatCostNumeric(totalOutlayVal)
            };
          }
          return c;
        });
        onCartChange(updatedCart);
      }
    }
  };

  const isProjectFullySelected = (project: Project): boolean => {
    const allSubs = project.subProjects || [];
    if (allSubs.length <= 1) {
      return cart.some(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim());
    }
    const existingCartItem = cart.find(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim());
    if (!existingCartItem) return false;
    return (existingCartItem.subProjects?.length === allSubs.length);
  };

  const isProjectPartiallySelected = (project: Project): boolean => {
    const allSubs = project.subProjects || [];
    if (allSubs.length <= 1) return false;
    const existingCartItem = cart.find(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim());
    if (!existingCartItem) return false;
    const count = existingCartItem.subProjects?.length || 0;
    return count > 0 && count < allSubs.length;
  };

  const isAllDepartmentSelected = (deptName: string, deptProjects: Project[]) => {
    return deptProjects.length > 0 && deptProjects.every(p => isProjectFullySelected(p));
  };

  const handleToggleDepartmentSelect = (deptName: string, deptProjects: Project[]) => {
    const isAll = isAllDepartmentSelected(deptName, deptProjects);
    if (isAll) {
      const updated = cart.filter(c => !deptProjects.some(p => p.title.toLowerCase().trim() === c.title.toLowerCase().trim()));
      onCartChange(updated);
    } else {
      let updatedCart = [...cart];
      deptProjects.forEach(p => {
        const allSubs = p.subProjects || [];
        const totalOutlayVal = allSubs.reduce((sum, s) => sum + parseCostToNumeric(s.financialOutlay), 0);
        const fullProjectCartItem: Project = {
          ...p,
          subProjects: [...allSubs],
          financialOutlay: formatCostNumeric(totalOutlayVal)
        };

        const existsIdx = updatedCart.findIndex(c => c.title.toLowerCase().trim() === p.title.toLowerCase().trim());
        if (existsIdx >= 0) {
          updatedCart[existsIdx] = fullProjectCartItem;
        } else {
          updatedCart.push(fullProjectCartItem);
        }
      });
      onCartChange(updatedCart);
    }
  };

  const handleMainProjectCheckToggle = (project: Project) => {
    const allSubs = project.subProjects || [];
    if (allSubs.length <= 1) {
      onToggleCart(project);
      return;
    }

    const existingCartItem = cart.find(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim());
    if (existingCartItem && existingCartItem.subProjects?.length === allSubs.length) {
      // If all are selected, deselect all (remove from cart)
      const updatedCart = cart.filter(c => c.title.toLowerCase().trim() !== project.title.toLowerCase().trim());
      onCartChange(updatedCart);
    } else {
      // Select all subProjects
      const totalOutlayVal = allSubs.reduce((sum, s) => sum + parseCostToNumeric(s.financialOutlay), 0);
      const fullProjectCartItem: Project = {
        ...project,
        subProjects: [...allSubs],
        financialOutlay: formatCostNumeric(totalOutlayVal)
      };
      
      const exists = cart.some(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim());
      if (exists) {
        onCartChange(cart.map(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim() ? fullProjectCartItem : c));
      } else {
        onCartChange([...cart, fullProjectCartItem]);
      }
    }
  };

  // Grouped search and filter mapping helper
  const filteredProjects = activeNotTakenUpProjects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contributor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All Categories') {
      return matchesSearch;
    }
    return p.department === selectedCategory && matchesSearch;
  });

  // Group matched results by department
  const groupedProjects: Record<string, Project[]> = {};
  filteredProjects.forEach(p => {
    if (!groupedProjects[p.department]) {
      groupedProjects[p.department] = [];
    }
    groupedProjects[p.department].push(p);
  });

  // Dynamic aesthetic badges for status tracker
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('completed')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg backdrop-blur-3xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
          Completed
        </span>
      );
    }
    return null;
  };

  return (
    <section className="py-14 bg-mesh-gradient animate-in fade-in duration-500 relative min-h-screen overflow-hidden">
      
      {/* Dynamic ambient graphic backdrop */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-96 -mt-40"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-96"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Creative Artistic Page Intro Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 text-center sm:text-left bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden bg-grid-glow"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-amber-50 rounded-bl-full pointer-events-none -z-10"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-[10px] uppercase font-bold tracking-widest py-1.5 px-3.5 rounded-full shadow-inner">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Development Blueprints</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-none mt-1">
                District Administrative Projects
              </h1>
              <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                Explore local CSR allocations and infrastructure welfare campaigns across departments, structured cleanly for full citizen transparency.
              </p>
            </div>

            {/* Total count creative bubble */}
            <div className="bg-gradient-to-tr from-stone-900 to-slate-850 text-white rounded-2xl p-4 sm:p-5 text-center shadow-xl border border-stone-800 shrink-0 min-w-[160px] transform hover:scale-102 transition-transform duration-300">
              <span className="text-sm font-sans font-semibold tracking-wider text-stone-350 block">Total Initiatives</span>
              <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-emerald-400 block mt-1">
                {totalProjectsCount}
              </span>
              <div className="h-1 bg-stone-800 rounded-full mt-2 overflow-hidden mx-auto max-w-[80px]">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Creative Mini Dashboard Indicators Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-dashed border-stone-200 text-stone-650">
            <div className="bg-slate-50/50 px-4 py-3 rounded-xl border border-stone-150">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Departments</span>
              <span className="text-lg font-extrabold text-slate-800 block mt-0.5">{departments.length} Sectors</span>
            </div>
            <div className="bg-emerald-50/40 px-4 py-3 rounded-xl border border-emerald-150/40">
              <span className="text-[11px] font-bold text-emerald-700/60 uppercase tracking-widest block">Completed</span>
              <span className="text-lg font-extrabold text-emerald-800 block mt-0.5">{completedProjectsCount} Projects</span>
            </div>
            <div className="bg-stone-100/50 px-4 py-3 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-450 uppercase tracking-widest block">In Queue</span>
              <span className="text-lg font-extrabold text-stone-700 block mt-0.5">{notStartedCount} Upcoming</span>
            </div>
          </div>
        </motion.div>

        {/* Two column grid layout for filters (left) and search & projects (right) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 items-start mt-8">
          
          {/* Left Column: Vertical Category Filter Panel with Prominent CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 md:sticky md:top-24 flex flex-col gap-5"
          >
            {/* Vertical Category Filter Panel */}
            <div className="bg-white border border-stone-150 rounded-2xl p-5 shadow-3xs order-1 md:order-2">
              <div className="flex items-center gap-2.5 mb-4 border-b border-stone-100 pb-3">
                <LayoutGrid className="h-4.5 w-4.5 text-emerald-700 shrink-0" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-sans">
                  Filter by Category
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count = getCategoryCount(cat);
                  const isAll = cat === 'All Categories';
                  
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setTimeout(() => {
                          const element = document.getElementById('sponsorship-portal-card');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 80);
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-between border shadow-3xs text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-800 to-teal-900 border-emerald-950 text-white shadow-md'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 hover:border-stone-300 text-slate-650 hover:text-slate-900'
                      }`}
                    >
                      <span className="pr-2 leading-snug break-words">{isAll ? '★ All Channels' : cat}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md shrink-0 ${
                        isActive
                          ? 'bg-white/15 text-emerald-100'
                          : 'bg-stone-200/80 text-stone-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action: Submit Interest Activation Card (Sponsorship Portal) */}
            <div id="sponsorship-portal-card" className="bg-gradient-to-br from-emerald-900 to-teal-950 border border-emerald-950 rounded-2xl p-5 shadow-sm text-white relative overflow-hidden order-2 md:order-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none -mr-8 -mt-8"></div>
              
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare className="h-4 w-4 text-emerald-300 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 font-sans block">
                  Sponsorship Portal
                </span>
              </div>
              
              <h4 className="text-xs sm:text-sm font-black tracking-tight leading-snug mb-3">
                Want to Sponsor Projects?
              </h4>
              
              <button
                onClick={() => setSelectionMode(!selectionMode)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border shadow-sm ${
                  selectionMode
                    ? 'bg-rose-600 border-rose-700 text-white hover:bg-rose-700 shadow-inner'
                    : 'bg-white border-white text-emerald-950 hover:bg-stone-100 hover:shadow-md'
                }`}
              >
                {selectionMode ? (
                  <>
                    <X className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>Exit Selection</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>Submit Interest</span>
                  </>
                )}
              </button>

              {selectionMode ? (
                <p className="text-[10px] font-sans text-emerald-100 mt-3 leading-normal bg-white/10 px-2 py-1.5 rounded-lg border border-white/5 font-medium animate-pulse">
                  ✓ Selection Mode Active: Click checkboxes on project cards below to choose items.
                </p>
              ) : (
                <p className="text-[10px] font-sans text-emerald-200 mt-3 leading-normal bg-white/5 px-2 py-1.5 rounded-lg border border-white/5">
                  💡 Click <strong>"Submit Interest"</strong> first, then select welfare items you wish to back.
                </p>
              )}
            </div>
          </motion.div>

          {/* Right Column: Search Engine & Clustered Projects Grid System */}
          <div id="projects-list-view" className="md:col-span-3 space-y-6">
            
            {/* Dynamic Smart Search Engine block & Active Cart Link Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-stone-150 rounded-2xl p-4 shadow-3xs flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by keywords, contributors (NTPL etc.) or specific services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-slate-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3.5 p-1 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors"
                    title="Clear Search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {cart.length > 0 && (
                <button
                  onClick={() => onNavClick('sponsorship')}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 hover:from-amber-600 hover:to-teal-800 text-white rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Selected Cart ({cart.length})</span>
                </button>
              )}
            </motion.div>

            {/* Dynamic Clustered Projects Grid System */}
            {Object.keys(groupedProjects).length > 0 ? (
              <div className="space-y-12">
                {Object.keys(groupedProjects).map((departmentName) => {
                  const departmentProjects = groupedProjects[departmentName];
                  const theme = getDepartmentTheme(departmentName);

                  return (
                    <div 
                      key={departmentName} 
                      className={`group/sector bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${theme.borderGroup}`}
                    >
                      {/* Top Category Hero Banner with signature meaningful image */}
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden flex items-end">
                        <img 
                          src={theme.categoryImage} 
                          alt={departmentName} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover/sector:scale-105 transition-transform duration-700 brightness-[0.4]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                        
                        {/* Banner Content overlay */}
                        <div className="relative z-10 p-5 sm:p-6 w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {selectionMode && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleDepartmentSelect(departmentName, departmentProjects);
                                }}
                                className={`p-2 rounded-xl border transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                                  isAllDepartmentSelected(departmentName, departmentProjects)
                                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-md'
                                    : 'bg-white/20 backdrop-blur-xs border-white/40 text-transparent hover:bg-white/30 hover:border-white'
                                }`}
                                title={isAllDepartmentSelected(departmentName, departmentProjects) ? "Unselect All in Sector" : "Select All in Sector"}
                              >
                                <Check className="h-4 w-4 stroke-[3]" />
                              </button>
                            )}
                            
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm shrink-0">
                              {getDepartmentIcon(departmentName)}
                            </div>
                            <div>
                              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-black text-white tracking-tight leading-none drop-shadow-xs">
                                {departmentName}
                              </h2>
                              <span className="text-[10px] font-bold text-emerald-300 font-sans uppercase tracking-widest mt-1.5 block">
                                Thoothukudi District CSR Blueprint Sector
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
                            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-sans font-bold rounded-lg text-white shadow-sm shrink-0 flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.indicator}`}></span>
                              <span>{departmentProjects.length} {departmentProjects.length === 1 ? 'initiative' : 'initiatives'}</span>
                            </span>
                            <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md border border-emerald-500/20 text-[10px] sm:text-[11px] font-mono font-bold rounded-lg text-white shadow-sm shrink-0">
                              Sector Total: {formatCostNumeric(departmentProjects.reduce((sum, p) => sum + parseCostToNumeric(p.financialOutlay), 0))}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Area with Padding */}
                      <div className="p-5 sm:p-6 bg-slate-50/20">
                        {/* Creative Grid Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {departmentProjects.map((project, idx) => {
                            const projTheme = getDepartmentTheme(project.department);

                            return (
                              <motion.div
                                key={idx}
                                layout
                                initial={{ opacity: 0, scale: 0.94 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4 }}
                                onClick={() => setActiveProject(project)}
                                className={`group bg-white rounded-xl border p-5 shadow-3xs hover:shadow-md transition-all duration-305 relative flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 overflow-hidden select-none ${projTheme.border}`}
                              >
                                {/* Colored offset side highlight indicator bar */}
                                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${projTheme.gradient}`}></div>
                                
                                {/* Corner ambient graphic drop glow on hover */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-slate-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                <div className="pl-2">
                                  {/* Card Badges */}
                                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-1.5">
                                      {selectionMode && (
                                        <div
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleMainProjectCheckToggle(project);
                                          }}
                                          className={`p-1 rounded-md border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                                            isProjectFullySelected(project)
                                              ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                                              : isProjectPartiallySelected(project)
                                              ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-sm'
                                              : 'bg-white border-stone-300 text-transparent hover:border-emerald-650'
                                          }`}
                                          title={
                                            isProjectFullySelected(project)
                                              ? 'Unselect all locations'
                                              : 'Select all locations'
                                          }
                                        >
                                          {isProjectFullySelected(project) ? (
                                            <Check className="h-3 w-3 stroke-[3]" />
                                          ) : isProjectPartiallySelected(project) ? (
                                            <Minus className="h-3 w-3 stroke-[3.5]" />
                                          ) : (
                                            <Check className="h-3 w-3 text-transparent" />
                                          )}
                                        </div>
                                      )}
                                      {getStatusBadge(project.status)}
                                    </div>
   
                                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 tracking-tight bg-slate-50/85 py-0.5 px-2 rounded-lg border border-stone-200">
                                      <Coins className="h-2.5 w-2.5 text-emerald-750" />
                                      {project.financialOutlay}
                                    </span>
                                  </div>
   
                                  {/* Project Title with graceful display limits */}
                                  <h3 className="text-sm font-sans font-black text-slate-905 tracking-tight leading-snug group-hover:text-emerald-850 transition-colors line-clamp-2">
                                    {project.title}
                                  </h3>
   
                                  {/* Interactive Description Snippet */}
                                  <p className="mt-2 text-[11px] leading-relaxed text-stone-500 line-clamp-2 font-sans">
                                    {project.description}
                                  </p>
   
                                  {/* Mini Locations and Values List */}
                                  {project.subProjects && project.subProjects.length > 0 && (
                                    <div className="mt-3.5 space-y-1.5 bg-stone-50/90 p-2 rounded-lg border border-stone-200/60 text-[10px] font-sans">
                                      <div className="flex justify-between font-bold text-slate-450 uppercase tracking-wider border-b border-stone-200/80 pb-1">
                                        <span>Location / Block</span>
                                        <span>Value</span>
                                      </div>
                                      <div className="space-y-1 max-h-[110px] overflow-y-auto no-scrollbar">
                                        {project.subProjects.map((sub, sidx) => {
                                          const isSel = isSubProjectSelected(project.title, sub.location);
                                          return (
                                            <div 
                                              key={sidx} 
                                              onClick={(e) => {
                                                if (selectionMode) {
                                                  e.stopPropagation();
                                                  handleToggleSubProject(project, sub);
                                                }
                                              }}
                                              className={`flex justify-between items-center gap-2 text-stone-650 py-1 px-1.5 rounded-md transition-colors ${
                                                selectionMode ? 'hover:bg-emerald-50/70 cursor-pointer' : ''
                                              } ${isSel && selectionMode ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-100/40' : ''}`}
                                            >
                                              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                                {selectionMode && (
                                                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                                    isSel 
                                                      ? 'bg-emerald-600 border-emerald-700 text-white shadow-3xs' 
                                                      : 'bg-white border-stone-300 text-transparent hover:border-emerald-650'
                                                  }`}>
                                                    <Check className="h-2 w-2 stroke-[4.5]" />
                                                  </div>
                                                )}
                                                <span className="truncate font-medium text-[10px]" title={sub.location}>{sub.location}</span>
                                              </div>
                                              <span className="font-mono font-bold text-slate-700 shrink-0">{sub.financialOutlay}</span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                      {project.subProjects.length > 1 && (
                                        <div className="text-[9px] text-emerald-800 font-extrabold flex justify-between items-center pt-1.5 border-t border-stone-150">
                                          {selectionMode ? (
                                            <span className="text-stone-550 font-bold font-sans uppercase">
                                              Selected: {
                                                (cart.find(c => c.title.toLowerCase().trim() === project.title.toLowerCase().trim())?.subProjects?.length || 0)
                                              } / {project.subProjects.length}
                                            </span>
                                          ) : (
                                            <span></span>
                                          )}
                                          <span>Total: {project.subProjects.length} locations</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
 
                                {/* Detail Activator Bar */}
                                <div className="mt-4 pt-3 border-t border-stretch border-stone-100/80 flex items-center justify-between text-[11px] text-emerald-850 font-extrabold font-sans pl-2">
                                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                                    Explore Profile
                                  </span>
                                  <Maximize2 className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all text-emerald-750" />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-6 max-w-md mx-auto">
                <ShieldAlert className="h-10 w-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-base font-sans font-black text-slate-905">No Search Matches</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  We couldn't locate any projects matching your current query under "{selectedCategory}". Clear constraints to reload full listings.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                  }}
                  className="mt-4 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Reset Search Parameters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buy Now Basket Box */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="mt-16 bg-white border border-stone-200 shadow-xl rounded-3xl overflow-hidden"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 sm:px-8 py-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black tracking-tight leading-none">
                    Support Selection Commitment Box
                  </h3>
                  <p className="text-emerald-100 text-[11px] sm:text-xs font-sans mt-1">
                    You have selected {cart.length} {cart.length === 1 ? 'project' : 'projects'} to support.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
                <div className="text-right sm:mr-4">
                  <span className="text-[10px] text-emerald-100/75 uppercase tracking-widest font-bold block">
                    Total Commit Cost
                  </span>
                  <span className="text-lg sm:text-xl font-mono font-black text-amber-300">
                    {formatCostNumeric(cart.reduce((total, p) => total + parseCostToNumeric(p.financialOutlay), 0))}
                  </span>
                </div>
                <button
                  onClick={() => onNavClick('sponsorship')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-650 text-stone-900 font-extrabold text-xs sm:text-sm rounded-xl tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Commit</span>
                </button>
              </div>
            </div>

            {/* List of projects inside the box */}
            <div className="p-6 sm:p-8 space-y-4 max-h-[350px] overflow-y-auto divide-y divide-stone-150">
              {cart.map((proj, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    idx > 0 ? 'pt-4' : ''
                  }`}
                >
                  <div 
                    onClick={() => setActiveProject(proj)}
                    className="space-y-1 cursor-pointer group/item flex-1"
                    title="Click to view detailed blueprint description"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-sans font-extrabold uppercase bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-100/50 group-hover/item:bg-emerald-100 transition-colors">
                        {proj.department}
                      </span>
                      <span className="text-stone-400 text-xs font-semibold">• Estimated Outlay: {proj.financialOutlay}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 group-hover/item:text-emerald-800 transition-colors flex items-center gap-1.5 leading-tight">
                      <span>{proj.title}</span>
                      <Maximize2 className="h-3 w-3 opacity-0 group-hover/item:opacity-75 text-emerald-700 transition" />
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <span 
                      onClick={() => setActiveProject(proj)}
                      className="text-xs sm:text-sm font-mono font-black text-emerald-800 bg-stone-50 px-3 py-1 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-100 transition"
                      title="Click to view detailed blueprint description"
                    >
                      {formatCostNumeric(parseCostToNumeric(proj.financialOutlay))}
                    </span>
                    <button
                      onClick={() => onToggleCart(proj)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove from Basket"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions footer inside the box */}
            <div className="bg-stone-50 px-6 sm:px-8 py-4 border-t border-stone-150 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-stone-500 font-sans italic">
                * Commitments will be routed as official CSR / NGO fund allocations to Thoothukudi District Administration Society under Collector audit.
              </span>
              <button
                onClick={() => onCartChange([])}
                className="text-xs font-bold text-stone-500 hover:text-rose-600 transition-colors uppercase tracking-widest cursor-pointer"
              >
                Clear Selection Basket
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* Intricately Styled Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative bg-white rounded-3xl max-w-2xl w-full my-4 sm:my-8 md:my-10 shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Minimal Exit button */}
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white backdrop-blur-md p-2 rounded-full border border-stone-200 text-stone-700 shadow-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Picture block */}
              <div className="relative h-44 sm:h-60 md:h-64 bg-stone-900 overflow-hidden">
                <img
                  src={activeProject.imageUrl || getProjectFallbackImage(activeProject.title, activeProject.description, activeProject.department)}
                  alt={activeProject.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Overlay badges */}
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest leading-none mb-2">
                    {activeProject.department}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white leading-tight drop-shadow-md select-text">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Profile specifications */}
              <div className="p-6 sm:p-8 space-y-6">
                           {/* Financial block */}
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      Financial Budget allocation
                    </span>
                    <span className="text-base font-extrabold text-emerald-900 font-sans block mt-0.5">
                      {activeProject.financialOutlay}
                    </span>
                  </div>
                </div>

              {/* Description body */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 block font-sans">
                  Detailed Scope & Public Impact Goals
                </span>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify select-text font-sans bg-stone-50/50 p-4 rounded-xl border border-stone-150">
                  {activeProject.description}
                </p>
              </div>



              {/* Grouped Sub-Projects / Locations list */}
              {activeProject.subProjects && activeProject.subProjects.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 block font-sans">
                    Detailed Locations & Resource Outlay Allocation
                  </span>
                  <div className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200">
                    <div className="grid grid-cols-12 bg-stone-100 px-4 py-2 text-[10px] font-bold text-slate-550 uppercase tracking-wider font-sans">
                      <div className="col-span-8">Geographical Location / Institution</div>
                      <div className="col-span-4 text-right">Financial Outlay</div>
                    </div>
                    <div className="max-h-[180px] overflow-y-auto divide-y divide-stone-150">
                      {activeProject.subProjects.map((sub, sidx) => (
                        <div key={sidx} className="grid grid-cols-12 px-4 py-3 items-center text-xs hover:bg-stone-100/50 transition-colors">
                          <div className="col-span-8 pr-3 font-sans font-medium text-slate-800">
                            {sub.location}
                          </div>
                          <div className="col-span-4 text-right font-mono font-bold text-emerald-850">
                            {sub.financialOutlay}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom buttons panel */}
              <div className="flex justify-end pt-5 border-t border-stone-100">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm transition-all text-center min-w-[120px]"
                >
                  Close Profile View
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </section>
  );
}

