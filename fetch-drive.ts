async function testSheetsPublic() {
  const SPREADSHEET_ID = '1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow';
  const sheets = ['CSR Submissions', 'CSR Contributors', 'Videos', 'Gallery', 'Photos', 'Welfare Projects', 'Sheet1', 'Sheet2'];
  
  for (const sheet of sheets) {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheet)}`;
    try {
      const res = await fetch(url);
      console.log(`Sheet: "${sheet}" -> Status: ${res.status}`);
      if (res.status === 200) {
        const text = await res.text();
        console.log(`  Length: ${text.length}`);
        if (text.includes("google-visualization") || text.includes("google.visualization") || text.includes("DOCTYPE html") || text.includes("sign-in")) {
          console.log(`  Redirected to Google login/visualization page.`);
        } else {
          console.log(`  Success! First 200 characters:`);
          console.log(text.substring(0, 200));
        }
      }
    } catch (err) {
      console.error(`Error on ${sheet}:`, err);
    }
  }
}
testSheetsPublic();
