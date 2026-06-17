/**
 * Core contributors datastore dynamically compiled and aggregated from official sources.
 * Total corporate funding ranked descending by actual sanctioned allocation amounts.
 */

export interface ContributorWork {
  workName: string;
  sanctionedAmountStr: string;
  sanctionedAmountRupees: number;
  heading: string;
}

export interface DetailedContributor {
  rank: number;
  companyName: string;
  badge: string;
  badgeColor: string;
  themeBg: string;
  borderGlow: string;
  totalRupees: number;
  projectCount: number;
  works: ContributorWork[];
}

export const DETAILED_CONTRIBUTORS: DetailedContributor[] = [
  {
    "rank": 1,
    "companyName": "VOC Port Trust",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 139053000,
    "projectCount": 5,
    "works": [
      {
        "workName": "Construction and Renovation of Existing Building for de addiction Centre at JS nagar, and Awarness painting muthaiahpuram Harbour Bridge",
        "sanctionedAmountStr": "Rs. 288 Lakhs",
        "sanctionedAmountRupees": 28800000,
        "heading": "De-addiction and Public Awareness Initiative"
      },
      {
        "workName": "Providing internal Plumbingarrangements  at Police Quarters at Kamaraj Nagar  and Construction Of GYM Building with Toilet at Police Quarters at Kamaraj Nagar",
        "sanctionedAmountStr": "Rs. 72 Lakhs",
        "sanctionedAmountRupees": 7200000,
        "heading": "Police Welfare Infrastructure Development"
      },
      {
        "workName": "Sponsorship to procure OAE-ABR devices for Universal Newborn Hearing Screening (UNHS) Program under CSR activities, Thoothukudi district",
        "sanctionedAmountStr": "Rs. 475 Lakhs",
        "sanctionedAmountRupees": 47500000,
        "heading": "Newborn Healthcare Enhancement Project"
      },
      {
        "workName": "Construction of Mini Science Centres (MSC) at 5 designated Govt. Higher Secondary Schools in Tuticorin district through STEM Learning Social Enterprise and M/s. EdCIL",
        "sanctionedAmountStr": "Rs. 528.55 Lakhs",
        "sanctionedAmountRupees": 52854999.99999999,
        "heading": "STEM Education Promotion Initiative"
      },
      {
        "workName": "Construction of Toilet Building and auditorium or Classroom in Hindu Harijan  Primary School  East Zone",
        "sanctionedAmountStr": "Rs. 26.98 Lakhs",
        "sanctionedAmountRupees": 2698000,
        "heading": "School Infrastructure Improvement Project"
      }
    ]
  },
  {
    "rank": 2,
    "companyName": "NLC Tamil Nadu Power Limited",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 21208000,
    "projectCount": 12,
    "works": [
      {
        "workName": "Construction of Anganwadi Building at Boopalayarpuram Village",
        "sanctionedAmountStr": "Rs. 15 Lakhs",
        "sanctionedAmountRupees": 1500000,
        "heading": "Anganwadi Infrastructure Development – Boopalayarpuram"
      },
      {
        "workName": "Construction of Anganwadi Building at Meelavittan Village in Thoothukudi Corpoation",
        "sanctionedAmountStr": "Rs. 15 Lakhs",
        "sanctionedAmountRupees": 1500000,
        "heading": "Anganwadi Infrastructure Development – Meelavittan"
      },
      {
        "workName": "Construction of Bus Shelter at Silverpuram Main Road in Thoothukudi Corporation",
        "sanctionedAmountStr": "Rs. 10.3 Lakhs",
        "sanctionedAmountRupees": 1030000.0000000001,
        "heading": "Public Transport Infrastructure – Silverpuram"
      },
      {
        "workName": "Construction of Bus Shelter at Beach Road near Railway Gate in Thoothukudi Corporation",
        "sanctionedAmountStr": "Rs. 11 Lakhs",
        "sanctionedAmountRupees": 1100000,
        "heading": "Public Transport Infrastructure – Beach Road"
      },
      {
        "workName": "Purchase of 2 dialysis machines for Kovilpatti DHQ Hospital",
        "sanctionedAmountStr": "Rs. 11.97 Lakhs",
        "sanctionedAmountRupees": 1197000,
        "heading": "Dialysis Care Strengthening Project"
      },
      {
        "workName": "Contribution to construct 30 houses for the Physically Challanged and Trangenders under Kalaignar Kanavu illam Thittam",
        "sanctionedAmountStr": "Rs. 18 Lakhs",
        "sanctionedAmountRupees": 1800000,
        "heading": "Inclusive Housing Development Project"
      },
      {
        "workName": "Construction of 100 farm ponds for the benefit of farmers in ottapidaram block, tuticorin",
        "sanctionedAmountStr": "Rs. 50 Lakhs",
        "sanctionedAmountRupees": 5000000,
        "heading": "Construction of 100 Farm Ponds in Ottapidaram Block"
      },
      {
        "workName": "Purchase of E-load Auto",
        "sanctionedAmountStr": "Rs. 36.28 Lakhs",
        "sanctionedAmountRupees": 3628000,
        "heading": "Green Mobility and Livelihood Support Initiative"
      },
      {
        "workName": "Construction of Out patient block in Primary Health Center, Eppothuvendran Tuticorin",
        "sanctionedAmountStr": "Rs. 9.85 Lakhs",
        "sanctionedAmountRupees": 985000,
        "heading": "Construction of Outpatient Block at PHC, Eppothuvendran"
      },
      {
        "workName": "ADW Hostel comprehensive development",
        "sanctionedAmountStr": "Rs. 12 Lakhs",
        "sanctionedAmountRupees": 1200000,
        "heading": "Hostel Infrastructure Modernization Project"
      },
      {
        "workName": "Books for competitive Examinations",
        "sanctionedAmountStr": "Rs. 18.88 Lakhs",
        "sanctionedAmountRupees": 1888000,
        "heading": "Competitive Examination Support Program"
      },
      {
        "workName": "Comprehensive installation of RO plants for safe drinking water",
        "sanctionedAmountStr": "Rs. 3.8 Lakhs",
        "sanctionedAmountRupees": 380000,
        "heading": "Safe Drinking Water Initiative"
      }
    ]
  },
  {
    "rank": 3,
    "companyName": "Sanitation First",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 2000000,
    "projectCount": 1,
    "works": [
      {
        "workName": "Contribution for the livelihood of Sri Lankan refugees in camps",
        "sanctionedAmountStr": "Rs. 20 Lakhs",
        "sanctionedAmountRupees": 2000000,
        "heading": "Contribution for the Livelihood of Sri Lankan Refugees in Camps"
      }
    ]
  },
  {
    "rank": 4,
    "companyName": "JSW Foundation",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 1500000,
    "projectCount": 1,
    "works": [
      {
        "workName": "Construction of 30 Farm ponds",
        "sanctionedAmountStr": "Rs. 15 Lakhs",
        "sanctionedAmountRupees": 1500000,
        "heading": "Farm Pond Development Project"
      }
    ]
  },
  {
    "rank": 5,
    "companyName": "NTPC Green Energy Limited",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 1000000,
    "projectCount": 1,
    "works": [
      {
        "workName": "Purchase of Medical Equipment at Ettayapuram GH",
        "sanctionedAmountStr": "Rs. 10 Lakhs",
        "sanctionedAmountRupees": 1000000,
        "heading": "Purchase of Medical Equipment at Ettayapuram Government Hospital"
      }
    ]
  },
  {
    "rank": 6,
    "companyName": "State Bank of India",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 800000,
    "projectCount": 1,
    "works": [
      {
        "workName": "Upgradation of school, Anganwadi Centre and Old age home",
        "sanctionedAmountStr": "Rs. 8 Lakhs",
        "sanctionedAmountRupees": 800000,
        "heading": "Community Infrastructure Upgradation Project"
      }
    ]
  },
  {
    "rank": 7,
    "companyName": "TMB Bank",
    "badge": "CSR Partner",
    "badgeColor": "stone",
    "themeBg": "bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white",
    "borderGlow": "hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]",
    "totalRupees": 671000,
    "projectCount": 1,
    "works": [
      {
        "workName": "Renovation Of  Government Higher Secondary  School 3 class Room Building, (West Face in Primary School Premises)in Ayyanadaipu  Panchayat",
        "sanctionedAmountStr": "Rs. 6.71 Lakhs",
        "sanctionedAmountRupees": 671000,
        "heading": "Educational Infrastructure Renovation"
      }
    ]
  }
];
