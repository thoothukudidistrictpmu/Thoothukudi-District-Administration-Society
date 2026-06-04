import { CSRBox, ServiceBox, BoardMember, JourneyStat, Contributor } from './types';

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
