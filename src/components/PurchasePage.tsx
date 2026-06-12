import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { Project } from '../types';
import { 
  ShieldCheck, 
  Trash2, 
  Coins, 
  User, 
  MapPin, 
  ArrowLeft, 
  FileCheck2, 
  HeartHandshake, 
  Sparkles, 
  Building2, 
  Printer, 
  Mail, 
  Phone,
  AlertCircle,
  X,
  CheckCircle2,
  Clock,
  FolderDot,
  GraduationCap,
  HeartPulse,
  Accessibility,
  Leaf,
  Maximize2
} from 'lucide-react';

interface PurchasePageProps {
  cart: Project[];
  onToggleCart: (project: Project) => void;
  onCartChange: (newCart: Project[]) => void;
  onNavClick: (tabId: string) => void;
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

// Helper to format numeric value back to stylized string
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

const getDepartmentTheme = (dept: string) => {
  const d = dept.toLowerCase();
  if (d.includes('education')) {
    return {
      accent: 'emerald',
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      indicator: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'hover:shadow-emerald-100',
      iconColor: 'text-emerald-600'
    };
  }
  if (d.includes('health')) {
    return {
      accent: 'rose',
      bg: 'bg-rose-50/80',
      border: 'border-rose-200',
      text: 'text-rose-800',
      indicator: 'bg-rose-500',
      gradient: 'from-rose-500 to-pink-600',
      shadow: 'hover:shadow-rose-100',
      iconColor: 'text-rose-600'
    };
  }
  if (d.includes('abled') || d.includes('disable') || d.includes('person')) {
    return {
      accent: 'indigo',
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-200',
      text: 'text-indigo-850',
      indicator: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-purple-600',
      shadow: 'hover:shadow-indigo-100',
      iconColor: 'text-indigo-600'
    };
  }
  if (d.includes('agricultur') || d.includes('farm') || d.includes('pond')) {
    return {
      accent: 'teal',
      bg: 'bg-teal-50/80',
      border: 'border-teal-200',
      text: 'text-teal-800',
      indicator: 'bg-teal-500',
      gradient: 'from-teal-500 to-emerald-600',
      shadow: 'hover:shadow-teal-100',
      iconColor: 'text-teal-600'
    };
  }
  if (d.includes('husbandry') || d.includes('veterinary') || d.includes('animal')) {
    return {
      accent: 'amber',
      bg: 'bg-amber-50/80',
      border: 'border-amber-200',
      text: 'text-amber-800',
      indicator: 'bg-amber-500',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-amber-100',
      iconColor: 'text-amber-600'
    };
  }
  return {
    accent: 'sky',
    bg: 'bg-sky-50/80',
    border: 'border-sky-200',
    text: 'text-sky-800',
    indicator: 'bg-sky-500',
    gradient: 'from-sky-500 to-blue-600',
    shadow: 'hover:shadow-sky-100',
    iconColor: 'text-sky-650'
  };
};

const getProjectFallbackImage = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('classroom')) {
    return "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('lab') || t.includes('science') || t.includes('stem')) {
    return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('health') || t.includes('op block') || t.includes('maternity')) {
    return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('assistive') || t.includes('scooter') || t.includes('push cart')) {
    return "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('pond') || t.includes('borewell')) {
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('veterinary') || t.includes('animal')) {
    return "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('waste') || t.includes('vehicle')) {
    return "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80";
  }
  return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";
};

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
  if (s.includes('partial')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-bold rounded-lg backdrop-blur-3xs">
        <Clock className="h-3.5 w-3.5 text-amber-700 shrink-0" />
        Partially taken up
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100/70 border border-violet-300 text-violet-905 text-xs font-bold rounded-lg backdrop-blur-3xs">
      <FolderDot className="h-3.5 w-3.5 text-violet-750 shrink-0" />
      Not yet taken up
    </span>
  );
};

export default function PurchasePage({ cart, onToggleCart, onCartChange, onNavClick }: PurchasePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successPledge, setSuccessPledge] = useState<boolean>(false);
  const [receiptCode, setReceiptCode] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Total amount sum calculations
  const totalCostValue = cart.reduce((total, p) => total + parseCostToNumeric(p.financialOutlay), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    
    // Simulate API storage / pledge commitment submission with a 1.2s timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessPledge(true);
      // Generate a stylized unique receipt reference
      setReceiptCode(`TDAS-CSR-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1250);
  };

  const handlePrintReceipt = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const formattedDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // 1. Double Border Style (Emerald-Gold Accent)
      doc.setDrawColor(16, 185, 129); // emerald-500
      doc.setLineWidth(1.2);
      doc.rect(8, 8, 194, 281);

      doc.setDrawColor(217, 119, 6); // amber-600 (gold accent)
      doc.setLineWidth(0.4);
      doc.rect(9.5, 9.5, 191, 278);

      // Corner decorative lines
      // Top-Left corner accent
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(1.0);
      doc.line(11, 14, 24, 14);
      doc.line(14, 11, 14, 24);
      
      // Top-Right corner accent
      doc.line(199, 14, 186, 14);
      doc.line(196, 11, 196, 24);

      // Bottom-Left corner accent
      doc.line(11, 283, 24, 283);
      doc.line(14, 286, 14, 273);

      // Bottom-Right corner accent
      doc.line(199, 283, 186, 283);
      doc.line(196, 286, 196, 273);

      // 2. Header Box Fill
      doc.setFillColor(248, 250, 252); // slate-100/50
      doc.rect(10, 10, 190, 36, 'F');

      // Header Texts
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text("DISTRICT ADMINISTRATION & PMU, THOOTHUKUDI", 105, 21, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text("Thoothukudi District Welfare Society & Transparent CSR Management Portal", 105, 26, { align: 'center' });
      doc.text("Government of Tamil Nadu", 105, 30, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(16, 115, 87); // emerald-800
      doc.text("CSR PARTNERSHIP & PROJECT PLEDGE CERTIFICATE", 105, 38, { align: 'center' });

      // Dividing thick line
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.8);
      doc.line(15, 46, 195, 46);

      // 3. Section 1: Contributor Profile
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text("1. DONOR PARTNER PROFILE", 15, 56);

      // Box wrapper for partner info
      doc.setFillColor(250, 250, 249); // stone-50
      doc.setDrawColor(229, 231, 235); // stone-200
      doc.setLineWidth(0.3);
      doc.rect(15, 59, 180, 44, 'FD');

      // Left column specs
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text("Partner Name:", 20, 67);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(String(formData.name || 'CSR Partner (Individual)'), 52, 67);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Organization:", 20, 75);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(String(formData.organization || 'Individual Sponsor / CSR Supporter'), 52, 75);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Email Address:", 20, 83);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(String(formData.email || 'N/A'), 52, 83);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Contact No:", 20, 91);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(String(formData.phone || 'N/A'), 52, 91);

      // Right column specs
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Receipt Ref:", 120, 67);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 115, 87);
      doc.text(String(receiptCode || 'N/A'), 145, 67);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Pledge Date:", 120, 75);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(formattedDate, 145, 75);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Portal Link:", 120, 83);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text("Thoothukudi CSR Desk", 145, 83);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text("Audit Status:", 120, 91);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(217, 119, 6); // gold
      doc.text("VERIFIED PLEDGE", 145, 91);

      // Notes / Custom Remarks if any
      if (formData.notes) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        const remark = `Donor Notes: "${formData.notes.substring(0, 140)}"`;
        doc.text(remark, 20, 99);
      }

      // 4. Section 2: Selected Blueprints Summary Table
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text("2. SPONSORED INFRASTRUCTURE CHALLENGES & BLUEPRINTS", 15, 111);

      // Draw table header
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(15, 115, 180, 8, 'F');
      
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text("S.No", 18, 120.5);
      doc.text("Project Title & Blueprint Challenge Description", 30, 120.5);
      doc.text("Department", 130, 120.5);
      doc.text("Estimated Budget", 170, 120.5);

      let currentY = 123;

      cart.forEach((item, idx) => {
        // Wrap/split text to guarantee beauty and no clippings
        const splitTitle = doc.splitTextToSize(String(item.title || ''), 95);
        const splitDept = doc.splitTextToSize(String(item.department || ''), 35);
        const maxLines = Math.max(splitTitle.length, splitDept.length);
        const rowHeight = maxLines * 5 + 4;

        // Auto Page Braking inside table
        if (currentY + rowHeight > 242) {
          doc.addPage();
          
          // Re-draw double borders
          doc.setDrawColor(16, 185, 129); // emerald-500
          doc.setLineWidth(1.2);
          doc.rect(8, 8, 194, 281);

          doc.setDrawColor(217, 119, 6); // amber-600
          doc.setLineWidth(0.4);
          doc.rect(9.5, 9.5, 191, 278);

          // Corner decoration lines
          doc.line(11, 14, 24, 14);
          doc.line(14, 11, 14, 24);
          doc.line(199, 14, 186, 14);
          doc.line(196, 11, 196, 24);
          doc.line(11, 283, 24, 283);
          doc.line(14, 286, 14, 273);
          doc.line(199, 283, 186, 283);
          doc.line(196, 286, 196, 273);

          // Page Number header
          doc.setFillColor(248, 250, 252);
          doc.rect(10, 10, 190, 11, 'F');
          doc.setFontSize(8);
          doc.setTextColor(15, 23, 42);
          doc.setFont('helvetica', 'bold');
          doc.text(`CSR PLEDGE RECEIPT: ${receiptCode} (Continued)`, 15, 17);

          // Re-draw Table Headers
          doc.setFillColor(15, 23, 42); // slate-900
          doc.rect(15, 23, 180, 8, 'F');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text("S.No", 18, 28.5);
          doc.text("Project Title & Blueprint Challenge Description", 30, 28.5);
          doc.text("Department", 130, 28.5);
          doc.text("Estimated Budget", 170, 28.5);

          currentY = 31;
        }

        // Alternating color backgrounds
        if (idx % 2 === 0) {
          doc.setFillColor(249, 250, 251); // slate-50
        } else {
          doc.setFillColor(255, 255, 255);
        }
        doc.rect(15, currentY, 180, rowHeight, 'F');

        // Light bottom border line
        doc.setDrawColor(241, 245, 249); // slate-100
        doc.setLineWidth(0.3);
        doc.line(15, currentY + rowHeight, 195, currentY + rowHeight);

        // Render Values
        doc.setFontSize(8.0);
        doc.setTextColor(51, 65, 85); // slate-700
        doc.setFont('helvetica', 'normal');
        
        doc.text(String(idx + 1), 18, currentY + 4.5);
        doc.text(splitTitle, 30, currentY + 4.5);
        doc.text(splitDept, 130, currentY + 4.5);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(String(item.financialOutlay || 'N/A'), 170, currentY + 4.5);

        currentY += rowHeight;
      });

      // 5. Total Sum Box
      if (currentY + 16 > 242) {
        doc.addPage();
        doc.setDrawColor(16, 185, 129); // emerald-500
        doc.setLineWidth(1.2);
        doc.rect(8, 8, 194, 281);
        doc.setDrawColor(217, 119, 6); // gold
        doc.setLineWidth(0.4);
        doc.rect(9.5, 9.5, 191, 278);
        currentY = 15;
      }

      doc.setFillColor(240, 253, 250); // emerald-55
      doc.setDrawColor(16, 185, 129); // emerald-500
      doc.setLineWidth(0.5);
      doc.rect(15, currentY + 2, 180, 11, 'FD');

      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.text("AGGREGATE PLEDGED CSR CONTRIBUTION:", 20, currentY + 9);
      
      doc.setFontSize(10.5);
      doc.setTextColor(16, 115, 87); // emerald-800
      doc.text(formatCostNumeric(totalCostValue), 170, currentY + 9.5);

      currentY += 13;

      // 6. Declaration box
      if (currentY + 22 > 242) {
        doc.addPage();
        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(1.2);
        doc.rect(8, 8, 194, 281);
        doc.setDrawColor(217, 119, 6);
        doc.setLineWidth(0.4);
        doc.rect(9.5, 9.5, 191, 278);
        currentY = 15;
      }

      doc.setFillColor(254, 252, 232); // yellow-50
      doc.setDrawColor(234, 179, 8); // yellow-500
      doc.setLineWidth(0.4);
      doc.rect(15, currentY + 3, 180, 16, 'FD');

      doc.setFontSize(7.5);
      doc.setTextColor(161, 98, 7); // yellow-800
      doc.setFont('helvetica', 'italic');
      const declarationText = "Important Notice: This certificate represents a formal statement of philanthropic commitment to support development initiatives inside Thoothukudi District. Project allocation, timelines, and implementation frameworks are coordinated and audited direct with the PMU, under the supervision of District Collector, Thoothukudi.";
      const splitDeclaration = doc.splitTextToSize(declarationText, 172);
      doc.text(splitDeclaration, 19, currentY + 8.5);

      currentY += 19;

      // 7. Signature Seal area (positioned elegantly at the page bottom)
      const sealY = Math.max(currentY + 4, 196);
      let finalPageY = sealY;

      if (currentY + 36 > 282) {
        doc.addPage();
        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(1.2);
        doc.rect(8, 8, 194, 281);
        doc.setDrawColor(217, 119, 6);
        doc.setLineWidth(0.4);
        doc.rect(9.5, 9.5, 191, 278);
        finalPageY = 224;
      }

      // Draw official watermark stamp
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setFillColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.circle(45, finalPageY + 16, 14, 'D');

      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.setFont('helvetica', 'bold');
      doc.text("DISTRICT SOCIETY", 45, finalPageY + 13, { align: 'center' });
      doc.text("THOOTHUKUDI", 45, finalPageY + 16.5, { align: 'center' });
      doc.text("★ SEAL ★", 45, finalPageY + 20, { align: 'center' });

      // Draw Collector Signature & Name representing District administration
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.setFont('helvetica', 'bold');
      doc.text("Vishu Mahajan, IAS", 155, finalPageY + 12, { align: 'center' });
      
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.setFont('helvetica', 'normal');
      doc.text("District Collector & President", 155, finalPageY + 16, { align: 'center' });
      doc.text("Thoothukudi District Administration Society", 155, finalPageY + 20, { align: 'center' });

      // Electronic metadata info
      doc.setDrawColor(241, 245, 249);
      doc.line(15, finalPageY + 27, 195, finalPageY + 27);
      
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text("Secure digital certificate. Verified under direct authority of the Administration, Thoothukudi, India.", 105, finalPageY + 32, { align: 'center' });

      // Save PDF output file download
      doc.save(`Thoothukudi_CSR_Pledge_${receiptCode}.pdf`);
    } catch (err) {
      console.error("PDF download fail scenario:", err);
      // Fallback: trigger standard browser printing if PDF generation throws an error
      window.print();
    }
  };

  const resetFlow = () => {
    onCartChange([]);
    setSuccessPledge(false);
    setReceiptCode('');
    setFormData({
      name: '',
      email: '',
      organization: '',
      phone: '',
      notes: ''
    });
    onNavClick('projects');
  };

  return (
    <section className="py-14 bg-mesh-gradient animate-in fade-in duration-500 relative min-h-screen">
      {/* Decorative ambient graphic backdrop */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-96 -mt-40"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-96"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Link back */}
        <button
          onClick={() => onNavClick('projects')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-800 transition-colors mb-6 cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Infrastructure Blueprints</span>
        </button>

        <AnimatePresence mode="wait">
          {!successPledge ? (
            <motion.div
              key="checkout-flow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Cover Page Card */}
              <div className="relative mb-10 text-center sm:text-left bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs overflow-hidden bg-grid-glow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-amber-50 rounded-bl-full pointer-events-none -z-10"></div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 shrink-0">
                    <HeartHandshake className="h-7 w-7" />
                  </div>
                  <div>
                    <h1 className="text-2.5xl sm:text-3xl font-display font-black text-slate-900 tracking-tight leading-none">
                      Administrative Desk
                    </h1>
                    <p className="text-slate-550 text-xs sm:text-sm leading-relaxed mt-1.5">
                      Secure portal to pledge public resources, sponsor targeted infrastructure challenges, and review local CSR budget aggregates under official District Collector administration.
                    </p>
                  </div>
                </div>
              </div>

              {cart.length === 0 ? (
                /* Empty state */
                <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
                  <Coins className="h-14 w-14 text-stone-300 mx-auto mb-5 animate-pulse" />
                  <h3 className="text-lg font-sans font-black text-slate-805">No Projects Selected</h3>
                  <p className="text-sm text-stone-500 mt-2.5 leading-relaxed max-w-sm mx-auto">
                    Your purchase selection basket is currently empty. Visit the interactive blueprints page to toggle selection mode and choose the welfare projects you wish to sponsor.
                  </p>
                  <button
                    onClick={() => onNavClick('projects')}
                    className="mt-6 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer transform active:scale-95"
                  >
                    Explore Administrative Projects
                  </button>
                </div>
              ) : (
                /* Active state (form + cart summary) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Checkout Commit Form */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-stone-100">
                        <User className="h-5 w-5 text-emerald-800" />
                        <h2 className="text-lg font-sans font-black text-slate-900">
                          Contributor Information
                        </h2>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              Contributor / Contact Name*
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="e.g. Viswanathan K."
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-255 rounded-xl text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              Organization / Enterprise
                            </label>
                            <input
                              type="text"
                              name="organization"
                              value={formData.organization}
                              onChange={handleInputChange}
                              placeholder="e.g. SPIC Tamil Nadu / Co."
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-255 rounded-xl text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              Official Email*
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                              <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="name@corporates.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-255 rounded-xl text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                              Phone Number*
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                              <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 XXXXX XXXXX"
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-255 rounded-xl text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Special Instructions / Additional Notes
                          </label>
                          <textarea
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Specify preferred geographical sub-regions, execution timelines, or audit reporting requirements..."
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-255 rounded-xl text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans resize-none"
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4.5 bg-gradient-to-r from-amber-500 via-emerald-700 to-teal-800 hover:gradient-r hover:from-amber-600 hover:to-teal-900 text-white font-extrabold text-sm sm:text-base rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 border border-white/10"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                <span>Processing Pledge Commitment...</span>
                              </>
                            ) : (
                              <>
                                <FileCheck2 className="h-5 w-5 animate-pulse" />
                                <span>Pledge Commitment & Print Receipt</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>

                      <div className="mt-4 flex items-start gap-2.5 bg-slate-50 border border-slate-150 p-3.5 rounded-xl text-xs text-slate-600 leading-relaxed font-sans mt-5">
                        <ShieldCheck className="h-4.5 w-4.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Collector Audit Integrity</strong>: Submission registers you as an authorized potential backer in our state registers. You will be contacted directly by the Thoothukudi PMU Team to align structural contracts legally.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Checkout Cart Summary */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                          <span className="text-xs font-black text-slate-450 uppercase tracking-widest block font-sans">
                            Selected Blueprints Basket
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-stone-100 px-2 py-0.5 rounded font-mono shrink-0">
                            {cart.length} item{cart.length === 1 ? '' : 's'}
                          </span>
                        </div>

                        {/* List items with elegant details */}
                        <div className="space-y-4 mb-6 max-h-[340px] overflow-y-auto pr-1 select-none">
                          {cart.map((item, idx) => (
                            <div key={idx} className="group relative bg-stone-50 border border-stone-200 p-3.5 rounded-2xl flex items-start justify-between gap-3 hover:border-emerald-500/25 hover:bg-emerald-50/10 transition-all duration-300">
                              <div 
                                onClick={() => setActiveProject(item)}
                                className="space-y-1 cursor-pointer flex-1 group/item"
                                title="Click to view detailed blueprint description"
                              >
                                <span className="text-[9px] font-mono font-bold bg-white text-emerald-805 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-widest group-hover/item:bg-emerald-100 transition-colors">
                                  {item.department}
                                </span>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight group-hover/item:text-emerald-800 transition-colors flex items-center gap-1">
                                  <span>{item.title}</span>
                                  <Maximize2 className="h-3 w-3 opacity-0 group-hover/item:opacity-75 text-emerald-700 transition" />
                                </h3>
                                <p className="text-[10px] sm:text-xs font-mono font-bold text-stone-500 block mt-1">
                                  Cost: {item.financialOutlay}
                                </p>
                              </div>

                              <button
                                onClick={() => onToggleCart(item)}
                                className="p-1 text-stone-400 hover:text-rose-600 hover:bg-white rounded border border-transparent hover:border-rose-100 hover:shadow-xs transition-colors shrink-0 cursor-pointer self-start mt-1"
                                title="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cumulative Total block */}
                      <div className="border-t border-dashed border-stone-150 pt-5 mt-4">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div>
                            <span className="text-xs font-semibold text-slate-500 block font-sans">
                              Total Budget Sum
                            </span>
                            <span className="text-[10px] text-stone-400 block font-sans italic">
                              Based on administrative estimates
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xl sm:text-2.5xl font-mono font-black text-emerald-800 tracking-tight">
                              {formatCostNumeric(totalCostValue)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onCartChange([])}
                          className="w-full py-2 bg-stone-100 hover:bg-stone-150 hover:text-stone-700 text-stone-500 font-bold text-[11px] uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                        >
                          Clear Selection Basket
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          ) : (
            /* Succession Block */
            <motion.div
              key="pledge-confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xl max-w-2xl mx-auto text-center"
            >
              {/* Green Visual Check Ring */}
              <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 mx-auto mb-6 border-4 border-emerald-100 relative shadow-sm">
                <ShieldCheck className="h-10 w-10" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-amber-400 text-white rounded-full flex items-center justify-center text-[10px] animate-bounce shadow">
                  <Sparkles className="h-3 w-3" />
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight leading-none mb-3">
                Welfare Commitment Submitted Successfully!
              </h2>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-700 rounded-md text-xs sm:text-sm font-mono font-bold tracking-wider mb-6 border border-stone-200 shadow-3xs">
                Ref: {receiptCode}
              </div>

              <p className="text-slate-550 text-sm leading-relaxed max-w-lg mx-auto mb-8 font-sans">
                Greetings, <strong className="text-slate-800">{formData.name || 'CSR Partner'}</strong>. Your administrative pledge commitment of <strong>{formatCostNumeric(totalCostValue)}</strong> has been formally registered under the Thoothukudi District Administration Society's public-private audit database. 
              </p>

              {/* Receipt Summary table for Printing */}
              <div id="receipt-print-area" className="bg-stone-50/70 border border-stone-200 rounded-2xl p-5 mb-8 text-left max-w-md mx-auto divide-y divide-stone-150">
                <div className="pb-3 text-xs sm:text-sm font-sans">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 font-mono">Contributor Details</h4>
                  <p className="font-bold text-slate-805">{formData.name}</p>
                  {formData.organization && <p className="text-stone-500 font-semibold flex items-center gap-1 mt-1"><Building2 className="h-3.5 w-3.5" /> {formData.organization}</p>}
                  <p className="text-stone-500 text-xs mt-0.5">{formData.email} • {formData.phone}</p>
                </div>

                <div className="py-3">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 font-mono">Supported Blueprints</h4>
                  <div className="space-y-1.5">
                    {cart.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex justify-between text-xs font-sans cursor-pointer hover:text-emerald-800 transition-colors group/receipt"
                        onClick={() => setActiveProject(item)}
                        title="Click to view detailed blueprint description"
                      >
                        <span className="text-slate-700 font-medium truncate max-w-[260px] group-hover/receipt:text-emerald-800 group-hover/receipt:underline decoration-dotted decoration-stone-400">{item.title}</span>
                        <span className="text-stone-500 font-bold shrink-0 group-hover/receipt:text-emerald-805">{item.financialOutlay}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-between items-center bg-transparent">
                  <span className="text-sm font-black text-slate-800 font-sans uppercase tracking-wider">Total Commit Outlay</span>
                  <span className="text-base sm:text-lg font-mono font-black text-emerald-800">{formatCostNumeric(totalCostValue)}</span>
                </div>
              </div>

              {/* Interactive buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="h-4.5 w-4.5" />
                  <span>Download / Print Pledge Receipt</span>
                </button>
                <button
                  onClick={resetFlow}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <FileCheck2 className="h-4.5 w-4.5" />
                  <span>Explore More Blueprints</span>
                </button>
              </div>

              <p className="mt-6 text-[10px] text-stone-400 font-sans italic">
                * An copy of this certification has been carbon-copied to administrative audit units under District Collector, Thoothukudi. Phone contacts: Thoothukudi PMU.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Intricately Styled Modal Overlay for Purchase Page */}
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
                  src={activeProject.imageUrl || getProjectFallbackImage(activeProject.title)}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-850">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                        Allocated Lead Donor
                      </span>
                      <span className="text-base font-extrabold text-stone-900 font-sans block mt-0.5">
                        {(!activeProject.contributor || activeProject.contributor.toLowerCase() === 'none') ? '' : activeProject.contributor}
                      </span>
                    </div>
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

                {/* Status indicator tracker */}
                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black uppercase tracking-widest text-slate-400 font-sans">Initiative Timeline Status</span>
                    <div className="scale-90">{getStatusBadge(activeProject.status)}</div>
                  </div>

                  {/* Progress Visual Timeline line bar strictly based on status */}
                  <div className="relative w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/45">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeProject.status.toLowerCase().includes('complete') 
                          ? 'bg-emerald-500' 
                          : activeProject.status.toLowerCase().includes('partial') 
                            ? 'bg-amber-400 animate-pulse' 
                            : 'bg-stone-300'
                      }`}
                      style={{ 
                        width: activeProject.status.toLowerCase().includes('complete') 
                          ? '100%' 
                          : activeProject.status.toLowerCase().includes('partial') 
                            ? '50%' 
                            : '15%' 
                      }}
                    ></div>
                  </div>
                </div>

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

      </div>
    </section>
  );
}
