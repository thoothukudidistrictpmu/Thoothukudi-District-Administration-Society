import fs from 'fs';
import path from 'path';

const SPREADSHEET_ID = '1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=CSR%20Contributors`;

function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentValue = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentValue.trim());
      currentValue = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentValue.trim());
      result.push(row);
      row = [];
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  if (row.length > 0 || currentValue !== '') {
    row.push(currentValue.trim());
    result.push(row);
  }
  return result;
}

// Helper to convert "Rs. 288 Lakhs" or "Rs. 6.71 Lakhs" or "Rs. 10 Lakhs" to numeric value in INR Rupees
function parseAmountToRupees(amountStr: string): number {
  if (!amountStr) return 0;
  const cleanStr = amountStr.replace(/,/g, '').trim();
  
  // Match code like: 288, 528.55, 6.71
  const numMatch = cleanStr.match(/(\d+(?:\.\d+)?)/);
  if (!numMatch) return 0;
  const numValue = parseFloat(numMatch[1]);
  
  const lowerStr = cleanStr.toLowerCase();
  
  if (lowerStr.includes('crore') || lowerStr.includes('crores')) {
    return numValue * 10000000; // 1 Crore = 10,000,000
  } else if (lowerStr.includes('lakh') || lowerStr.includes('lakhs')) {
    return numValue * 100000; // 1 Lakh = 100,000
  } else if (lowerStr.includes('thousand')) {
    return numValue * 1000;
  }
  
  return numValue;
}

async function main() {
  try {
    console.log('Fetching sheet...', CSV_URL);
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }
    const csvText = await response.text();
    console.log('Fetched successfully. Decoding rows...');
    
    const parsedRows = parseCSV(csvText);
    if (parsedRows.length <= 1) {
      throw new Error('No rows found in sheet');
    }
    
    // Headers: "S. No.", "Name of the company", "Name of the works", "Sanctioned Amount", "Heading of the work"
    const headers = parsedRows[0];
    console.log('Raw headers parsed:', headers);
    
    // We will group records by company
    interface WorkRecord {
      workName: string;
      sanctionedAmountStr: string;
      sanctionedAmountRupees: number;
      heading: string;
    }
    
    const companyGroups: { [companyName: string]: WorkRecord[] } = {};
    
    // Some lines might carry forward of company names, let's keep track
    let currentCompany = '';
    
    for (let i = 1; i < parsedRows.length; i++) {
      const row = parsedRows[i];
      if (row.length < 4) continue; // Skip incomplete lines
      
      let company = row[1] ? row[1].trim() : '';
      const workName = row[2] ? row[2].trim() : '';
      const amountStr = row[3] ? row[3].trim() : '';
      const heading = row[4] ? row[4].trim() : '';
      
      // If company is empty, carry forward the previous company
      if (!company && currentCompany) {
        company = currentCompany;
      } else if (company) {
        currentCompany = company;
      }
      
      if (!company) continue; // No company associated
      if (!workName && !amountStr && !heading) continue; // Empty row helper
      
      // Parse amount
      const rupees = parseAmountToRupees(amountStr);
      
      if (!companyGroups[company]) {
        companyGroups[company] = [];
      }
      
      companyGroups[company].push({
        workName,
        sanctionedAmountStr: amountStr,
        sanctionedAmountRupees: rupees,
        heading
      });
    }
    
    // Post-process company categories, ranks, and descriptors
    const aggregatedContributors = Object.keys(companyGroups).map((companyName) => {
      const works = companyGroups[companyName];
      const totalRupees = works.reduce((sum, item) => sum + item.sanctionedAmountRupees, 0);
      
      return {
        companyName,
        works,
        totalRupees,
        projectCount: works.length
      };
    });
    
    // Sort company groups by total Rupees in descending order (highest contributor first)
    aggregatedContributors.sort((a, b) => b.totalRupees - a.totalRupees);
    
    // Map with beautiful rank levels and descriptive colors based on sanctioned logic in an innovative way
    const finalData = aggregatedContributors.map((c, index) => {
      const rank = index + 1;
      let badge = 'Sponsor';
      let badgeColor = 'stone';
      let themeBg = 'bg-linear-to-br from-stone-50 to-stone-100';
      let borderGlow = 'hover:border-stone-200';
      
      if (c.totalRupees >= 100000000) { // >= 10 Crores
        badge = 'Distinguished Chief Patron';
        badgeColor = 'emerald';
        themeBg = 'bg-linear-to-br from-emerald-50/70 via-teal-50/50 to-white';
        borderGlow = 'hover:border-emerald-400/40 hover:shadow-[0_8px_30px_rgb(16,185,129,0.08)]';
      } else if (c.totalRupees >= 10000000) { // >= 1 Crore (100 Lakhs)
        badge = 'Platinum Benefactor';
        badgeColor = 'sky';
        themeBg = 'bg-linear-to-br from-sky-50/70 via-blue-50/50 to-white';
        borderGlow = 'hover:border-sky-400/40 hover:shadow-[0_8px_30px_rgb(14,165,233,0.08)]';
      } else if (c.totalRupees >= 1000000) { // >= 10 Lakhs
        badge = 'Golden Pillar Partner';
        badgeColor = 'amber';
        themeBg = 'bg-linear-to-br from-amber-50/50 via-amber-25/30 to-white';
        borderGlow = 'hover:border-amber-400/40 hover:shadow-[0_8px_30px_rgb(245,158,11,0.08)]';
      } else {
        badge = 'Sterling Progress Associate';
        badgeColor = 'purple';
        themeBg = 'bg-linear-to-br from-purple-50/50 via-fuchsia-25/30 to-white';
        borderGlow = 'hover:border-purple-400/40 hover:shadow-[0_8px_30px_rgb(168,85,247,0.08)]';
      }
      
      // Let's generate a logo lookup or key to link to custom brand assets or display initials elegantly
      return {
        rank,
        companyName: c.companyName,
        badge,
        badgeColor,
        themeBg,
        borderGlow,
        totalRupees: c.totalRupees,
        projectCount: c.projectCount,
        works: c.works
      };
    });
    
    console.log('Ranked data count:', finalData.length);
    finalData.forEach(d => {
      console.log(`Rank #${d.rank}: ${d.companyName} | Total: Rs. ${(d.totalRupees / 100000).toFixed(2)} Lakhs | works: ${d.projectCount} | Medal: ${d.badge}`);
    });
    
    // Write out to unique file /src/data/contributors_raw.ts
    const targetDir = path.resolve('src/data');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const fileContent = `/**
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

export const DETAILED_CONTRIBUTORS: DetailedContributor[] = ${JSON.stringify(finalData, null, 2)};
`;
    
    fs.writeFileSync(path.join(targetDir, 'contributors_data.ts'), fileContent, 'utf-8');
    console.log('Successfully wrote parsed data to src/data/contributors_data.ts');
    
  } catch (err) {
    console.error('Fatal parsing error:', err);
  }
}

main();
