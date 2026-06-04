import { CSRBox, ServiceBox, BoardMember, JourneyStat, Contributor, Project } from './types';

// Direct paths to generated images which Vite compiles and serves perfectly.
// To use your manually uploaded President photo:
// 1. Upload your photo (e.g., 'vishu_mahajan.png' or 'vishu_mahajan.jpg') into the '/src/assets/images/' directory using the File Explorer.
// 2. Change the 'vishuMahajanImage' path below to match your filename.
const heroImage = '/src/assets/images/thoothukudi_humanized_hero_1780568140444.png';
const vishuMahajanImage = '/src/assets/images/Vishu_Mahajan.jpg'; // Update this if you upload your own, e.g., '/src/assets/images/Vishu_Mahajan.jpg'
const districtMapImage = '/src/assets/images/thoothukudi_district_map_1780566416278.png';
const aboutSocietyImage = '/src/assets/images/thoothukudi_presentation_meeting_1780568985079.png';
const tnLogoImage = '/src/assets/images/tamilnadu_logo.jpg';

export const IMAGES = {
  hero: heroImage,
  vishuMahajan: vishuMahajanImage,
  districtMap: districtMapImage,
  aboutSociety: aboutSocietyImage,
  tnLogo: tnLogoImage,
};

export const ABOUT_SOCIETY_PARAGRAPHS = [
  "The Thoothukudi District Administration Society (TDAS) was established to spearhead comprehensive, sustainable development across the district. Through targeted public-private partnerships, the society serves as a crucial bridge between corporate social responsibility funds and grassroots developmental needs.",
  "Guided by the district administration, the society designs, implements, and monitors high-impact projects in education, public health, healthcare infrastructure, and rural economic empowerment. We ensure transparent execution and strict compliance with legal frameworks.",
  "By working closely with local communities, NGOs, and leading public and private sector contributors, the society translates resources into sustainable change, upliftment of marginalized sectors, and deep, lasting community empowerment in every corner of Thoothukudi."
];

export const CSR_INTRO = "India is one of the first countries to mandate CSR by law, promoting inclusive growth and responsible corporate participation in national development.";

export const CSR_BOXES: CSRBox[] = [
  {
    title: "Legal Framework",
    content: "CSR in India is governed by the Companies Act, 2013 under Section 135. CSR provisions apply to companies that meet any one of the following criteria in the preceding financial year:",
    list: [
      "Net worth of ₹500 crore or more, or",
      "Turnover of ₹1,000 crore or more, or",
      "Net profit of ₹5 crore or more."
    ]
  },
  {
    title: "CSR Spending Requirement",
    content: "Eligible companies must spend at least 2% of their average net profits of the previous three financial years on CSR activities. If the required amount is not spent, the company must specify the reasons in its Board Report, and in certain cases, transfer the unspent amount to prescribed funds as per the Act."
  },
  {
    title: "Areas of CSR Activities",
    content: "CSR activities must fall under Schedule VII of the Act and typically include:",
    list: [
      "Education and skill development",
      "Healthcare and sanitation",
      "Environmental sustainability",
      "Rural development",
      "Women empowerment and equality",
      "Poverty alleviation and disaster relief"
    ]
  }
];

export const SERVICES_QUOTE = "Providing Humanist services to all people is what we do";

export const SERVICES_BOXES: ServiceBox[] = [
  {
    title: "Education",
    description: "Creating awareness and improving digital learning, providing smart classroom kits, supplying study books, and offering career counseling services across primary and higher secondary schools in rural blocks."
  },
  {
    title: "Public Health and Hospital",
    description: "Supporting primary health clinics, distributing health welfare supplies, creating disease prevention awareness, and upgrading medical utilities in government hospitals for accessible public safety."
  },
  {
    title: "Agriculture and rural development",
    description: "Promoting sustainability, developing efficient water irrigation channels, creating organic farming awareness, and constructing essential rural infrastructure for the upliftment of local farmers."
  }
];

export const DISTRICT_NAME = "Thoothukudi";
export const DISTRICT_PARAGRAPHS = [
  "Thoothukudi, historically renowned as Tuticorin, is a major port city situated on the southern coast of Tamil Nadu. Widely known as the 'Pearl City' due to its illustrious pearl fishing background, it is a bustling industrial hub with a rich cultural heritage, acting as the maritime gateway of southern India.",
  "The district comprises a vibrant economy powered by key chemical industries, thermal energy generation, salt production pans, and diverse agricultural occupations. Characterized by its welcoming coastal communities, Thoothukudi remains a prominent center of education, historic trade, and sustainable infrastructure developments under active state guidance."
];

export const COL_PRESIDENT_MESSAGE = [
  "The Thoothukudi District Administration Society serves as a unified force for localized advancement. By streamlining corporate CSR programs, we focus on impactful programs that foster inclusive growth.",
  "Our current initiatives are centered on digitizing educational spaces, building sustainable water resources, and supplying top-tier resources to public hospitals. Together with corporate partners, we ensure an empowering, healthy, and progressive environment for every citizen."
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    role: "President",
    name: "Vishu Mahajan IAS",
    title: "District Collector, Thoothukudi"
  },
  {
    role: "Vice President",
    name: "K. Karthikeyan",
    title: "District Revenue Officer, Thoothukudi"
  },
  {
    role: "Secretary",
    name: "K. Sangamithra",
    title: "Project Director DRDA, Tiruppur"
  },
  {
    role: "Treasurer",
    name: "D.S. Duraimurugan",
    title: "Personal Assistant, Thoothukudi"
  }
];

export const JOURNEY_STATS: JourneyStat[] = [
  {
    label: "Total Projects",
    value: "3+",
    iconName: "FolderHeart"
  },
  {
    label: "Ongoing Projects",
    value: "2+",
    iconName: "TrendingUp"
  },
  {
    label: "Completed",
    value: "1 Project",
    iconName: "CheckCircle2"
  },
  {
    label: "Total Value",
    value: "₹1,28,16,838",
    iconName: "Coins"
  }
];

export const CONTRIBUTORS: Contributor[] = [
  {
    name: "SPIC",
    description: "Southern Petrochemical Industries Corporation, supporting district health and farming assistance.",
    color: "emerald",
    iconName: "TrendingUp"
  },
  {
    name: "VOC Chidambaranar Port Trust",
    description: "The major marine portal in Tuticorin, driving infrastructure and primary skill schemes.",
    color: "sky",
    iconName: "Anchor"
  },
  {
    name: "TCS",
    description: "Tata Consultancy Services, advancing computer learning and digitized school platforms.",
    color: "blue",
    iconName: "Cpu"
  },
  {
    name: "HCL",
    description: "HCL Foundation, active in backing community sanitation and clean water pathways.",
    color: "indigo",
    iconName: "Droplet"
  },
  {
    name: "Wipro",
    description: "Wipro Cares, driving early childhood education support and ecological sustainability.",
    color: "purple",
    iconName: "Leaf"
  },
  {
    name: "Thoothukudi Thermal Power Station",
    description: "TTPS, powering regional prosperity and funding community skill center renovations.",
    color: "amber",
    iconName: "Zap"
  }
];

export const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/thoothukudidistrict" },
  { name: "Twitter / X", url: "https://twitter.com/collrtuticorin" },
  { name: "Instagram", url: "https://www.instagram.com/thoothukudi.nic.in" },
  { name: "Official Website", url: "https://thoothukudi.nic.in" }
];

export const PROJECTS_STATIC: Project[] = [
  {
    department: "Education",
    title: "Additional Classrooms (12 Government Schools)",
    description: "Construction of 34 additional classrooms in 12 Government schools to address overcrowding and improve classroom infrastructure.",
    financialOutlay: "Rs. 6.12 Crore",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Education",
    title: "New Science Laboratories (3 Schools)",
    description: "Construction of 4 additional laboratories in 3 Government schools to address inadequate laboratory facilities and strengthen practical learning infrastructure.",
    financialOutlay: "Rs. 72 Lakhs",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Education",
    title: "STEM Laboratories Setup (9 Schools)",
    description: "Construction of 9 STEM laboratories in 9 Government schools to strengthen STEM infrastructure and support experiential learning opportunities for students.",
    financialOutlay: "Rs. 90 Lakhs",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Health and Family Welfare",
    title: "Health Facility Upgradation (NQAS)",
    description: "Revitalisation of health facilities under NQAS through infrastructure improvement works in Health Sub-Centres and Primary Health Centres in Thoothukudi HUD.",
    financialOutlay: "Rs. 8 Crores",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Health and Family Welfare",
    title: "New OP Blocks in PHCs (11 Centres)",
    description: "Construction of new Outpatient blocks in 11 Primary Health Centres to strengthen outpatient healthcare infrastructure and service delivery.",
    financialOutlay: "Rs. 7.7 Crores",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Health and Family Welfare",
    title: "Maternity Blocks in PHCs",
    description: "Construction of maternity blocks in Primary Health Centres to strengthen 24×7 maternal healthcare services and institutional delivery infrastructure.",
    financialOutlay: "Rs. 1.6 Crores",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Welfare of differently abled Person",
    title: "Assistive Devices for PwDs",
    description: "Procurement and distribution of wheelchairs and assistive devices, including battery-operated wheelchairs, foldable walkers, and plastic calipers, for persons with disabilities.",
    financialOutlay: "Rs. 31.3 Lakhs",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Welfare of differently abled Person",
    title: "Retrofitted Mobility Scooters for PwDs",
    description: "Provision of retrofitted petrol scooters for persons with lower-limb disabilities to support independent mobility and accessibility.",
    financialOutlay: "Rs. 4.07 Crores",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Welfare of differently abled Person",
    title: "Push Carts for Livelihood Support (PwDs)",
    description: "Provision of 21 push carts for persons with disabilities to support livelihood opportunities and self-employment activities.",
    financialOutlay: "Rs. 10.5 Lakhs",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Agriculture and Family Welfare",
    title: "Farm Pond Development",
    description: "Construction and strengthening of farm ponds to enhance water storage capacity and support sustainable irrigation for agricultural activities.",
    financialOutlay: "Rs. 6 Crores",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Agriculture and Family Welfare",
    title: "Borewell Renovation Works",
    description: "Renovation of borewells to restore groundwater yield and strengthen sustainable irrigation infrastructure for agricultural activities.",
    financialOutlay: "Rs. 1.5 Crores",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Animal Husbandry",
    title: "Veterinary Facility Pathway Improvement",
    description: "Laying of paver block approach pathways at veterinary facilities to ensure safe access, improve sanitation, and support uninterrupted veterinary services.",
    financialOutlay: "Rs. 30 Lakhs",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Animal Husbandry",
    title: "Livestock Farmer Training AV Facilities",
    description: "Provision of Smart TVs and audio-visual learning facilities for training livestock farmers in modern and scientific livestock management practices.",
    financialOutlay: "Rs. 3.6 Lakhs",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Municipal Administration and water Supply",
    title: "Traffic Island Beautification (10 Locations)",
    description: "Beautification of traffic islands at 10 locations in Thoothukudi through landscaping, decorative elements, and thematic sculptures.",
    financialOutlay: "Rs. 1 Crore",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Municipal Administration and water Supply",
    title: "CCTV & PA System – Buckle Odai Monitoring",
    description: "Installation of 30 CCTV cameras and public announcement systems along Buckle Odai to prevent illegal solid waste dumping and strengthen monitoring mechanisms.",
    financialOutlay: "Rs. 25 Lakhs",
    status: "Not taken up",
    contributor: "none",
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    department: "Municipal Administration and water Supply",
    title: "Smart Waste Collection Vehicles (3 Municipalities)",
    description: "Deployment of battery-operated waste collection vehicles to strengthen door-to-door solid waste management while reducing fuel costs and carbon emissions in 3 Municipalities",
    financialOutlay: "Rs. 84 Lakhs",
    status: "Partially taken up",
    contributor: "NTPL",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80"
  }
];

