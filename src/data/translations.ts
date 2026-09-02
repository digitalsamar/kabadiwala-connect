import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    appTitle: 'Kabadiwala Connect',
    appSubTitle: 'Direct Fair Prices • Authorized Recyclers • No Backyard Burning',
    navCollector: 'Collector App',
    navRecycler: 'Recycler Portal',
    navAdmin: 'JNARDDC / Ministry Oversight',
    navEconomics: 'Unit Economics & Impact',
    online: 'Online',
    offline: 'Offline Mode (Saved Locally)',
    syncNow: 'Sync Pending Lots',
    pendingSync: 'unsynced lots',
    allSynced: 'All Synced',
    
    // Collector Tabs
    tabNewLot: 'Photo & Value',
    tabRecyclers: 'Match Recyclers',
    tabPrices: 'Live Price Board',
    tabReceipt: 'Handover Pass',
    tabLedger: 'My Earnings',
    tabSafety: 'Safety Guide',

    // Photo & Valuation Screen
    takePhoto: 'Take / Upload Lot Photo',
    orSelectPreset: 'Or Select Material Type Directly',
    classifying: 'AI Analyzing Material Category...',
    classifiedAs: 'Identified Material',
    confidence: 'AI Match Confidence',
    hazardAlert: 'Hazard Warning',
    enterWeight: 'Enter Lot Weight',
    weightKg: 'Weight (kg)',
    estimatedValue: 'Estimated Formal Payout',
    informalRate: 'Local Backyard Scrap Rate',
    formalRate: 'Authorized EPR Recycler Rate',
    yourUplift: 'Extra Profit with Kabadiwala Connect',
    speakEstimate: 'Listen to Valuation in Hindi/Marathi',
    createLotBtn: 'Lock Price & Generate Handover Pass',
    criticalYield: 'Critical Minerals Recovered',

    // Match Recyclers
    nearbyRecyclers: 'Authorized Recyclers Near You',
    cpcbVerified: 'CPCB / SPCB Authorized',
    rateOffered: 'Offered Rate',
    distance: 'Distance',
    pickup: 'Free Pickup Available',
    noPickup: 'Self Drop-off Required',
    chooseRecycler: 'Select Recycler & Handover',
    callRecycler: 'Call Facility',

    // Price Board
    priceBoardTitle: 'Today’s E-Waste Price Board',
    priceSpokenBtn: 'Tap to Hear Today’s Rates (बोलकर सुनो)',
    trendUp: 'Price Increasing',
    trendDown: 'Price Decreasing',
    trendStable: 'Stable Price',

    // Handover Pass
    handoverTitle: 'Digital Handover & Chain-of-Custody Pass',
    lotCode: 'Unique Lot ID',
    handoverPin: '6-Digit Offline Recycler PIN',
    showToRecycler: 'Show this QR / PIN to the authorized recycler at handover',
    handoverStatus: 'Status',
    paymentMode: 'Payment Mode',
    cashRealized: 'Instant Cash Received',
    upiReceived: 'Instant UPI Transferred',
    pendingHandover: 'Pending Verification',
    downloadSlip: 'Save / Share Slip',

    // Earnings Ledger
    myEarningsTitle: 'My Earnings Ledger',
    totalEarned: 'Total Cash Earned',
    totalLots: 'Completed Handovers',
    eWasteDiverted: 'E-Waste Safely Diverted',
    mineralsSaved: 'Critical Metals Yield',
    pendingPayment: 'Pending Realization',
    history: 'Transaction History',

    // Safety Guide
    safetyTitle: 'Worker Health & Safe Handling Guidance',
    safetySub: 'Prevent toxic poison gases, skin burns & acid accidents while maximizing your scrap value',
    listenSafety: 'Listen to Safety Advice in Your Language',
    dangerLabel: 'DANGER (Never Do This)',
    safeLabel: 'SAFE & HIGH PROFIT (Do This)',

    // Recycler Portal
    recyclerPortalTitle: 'Authorized E-Waste Recycler Operations',
    incomingLots: 'Incoming Lots Queue',
    verifyHandoverTitle: 'Verify Collector Handover',
    enterPinOrScan: 'Enter Collector 6-Digit PIN or Scan QR',
    verifyBtn: 'Verify Lot & Confirm Payout',
    confirmPayout: 'Confirm Payout & Issue Traceability Hash',
    rateUpdate: 'Update Daily Buying Rates',
    serviceRadius: 'Service Zone',

    // Admin Dashboard
    adminTitle: 'Ministry of Mines & JNARDDC E-Waste Dashboard',
    adminSub: 'Problem Statement 26229 • Formal E-Waste Supply Chain Traceability',
    totalDivertedTons: 'Total Diverted from Backyard Burning',
    totalCollectorUplift: 'Direct Collector Price Uplift',
    activeRecyclersCount: 'Verified Authorized Recyclers',
    traceabilityRate: '100% Traceable Chain-of-Custody',
    exportCsv: 'Export Structured Datasets (CSV)',
    anomalyAlerts: 'Price & Weight Anomaly Logs',
  },

  hi: {
    appTitle: 'कबाड़ीवाला कनेक्ट',
    appSubTitle: 'सीधा पक्का दाम • अधिकृत रीसायकलर • धुआं और तेजाब मुक्त सुरक्षित काम',
    navCollector: 'कबाड़ी भाई ऐप',
    navRecycler: 'रीसायकलर पोर्टल',
    navAdmin: 'मंत्रालय / JNARDDC रिपोर्ट',
    navEconomics: 'मुनाफा व प्रभाव हिसाब',
    online: 'ऑनलाइन (इंटरनेट चालू)',
    offline: 'ऑफलाइन (फोन में सुरक्षित)',
    syncNow: 'डेटा सर्वर पर भेजें',
    pendingSync: 'बाकी रसीदें',
    allSynced: 'सब सिंक हो गया',

    // Collector Tabs
    tabNewLot: '📸 फोटो व दाम',
    tabRecyclers: '🏢 कबाड़ी / रीसायकलर',
    tabPrices: '📊 आज का भाव',
    tabReceipt: '📜 हस्तांतरण पर्ची',
    tabLedger: '💰 मेरी कमाई',
    tabSafety: '🛡️ सुरक्षा सीख',

    // Photo & Valuation Screen
    takePhoto: 'कचरे / माल की फोटो खींचे',
    orSelectPreset: 'या सीधे माल का प्रकार चुनें',
    classifying: 'AI माल की पहचान कर रहा है...',
    classifiedAs: 'पहचाना गया माल',
    confidence: 'सटीकता',
    hazardAlert: 'खतरे की चेतावनी',
    enterWeight: 'वजन डालें (किलो)',
    weightKg: 'वजन (किलो)',
    estimatedValue: 'पक्की सरकारी कीमत (अनुमानित)',
    informalRate: 'स्थानीय कबाड़ी का पुराना दाम',
    formalRate: 'अधिकृत रीसायकलर का असली भाव',
    yourUplift: 'कबाड़ीवाला कनेक्ट से आपका सीधा फायदा',
    speakEstimate: 'दाम बोलकर सुनो 🔊',
    createLotBtn: 'भाव पक्का करें और पर्ची बनाएं',
    criticalYield: 'बचाई गई बहुमूल्य धातुएं (सोना, तांबा, लिथियम)',

    // Match Recyclers
    nearbyRecyclers: 'आपके पास के अधिकृत रीसायकलर',
    cpcbVerified: 'सरकारी CPCB / SPCB मान्यता प्राप्त',
    rateOffered: 'मिलने वाला भाव',
    distance: 'दूरी',
    pickup: 'गाड़ी आकर माल उठा लेगी',
    noPickup: 'खुद केंद्र पर ले जाना होगा',
    chooseRecycler: 'रीसायकलर चुनें और माल दें',
    callRecycler: 'फोन लगाएं',

    // Price Board
    priceBoardTitle: 'ई-कचरा आज की ताजा भाव सूची',
    priceSpokenBtn: 'आज के सारे दाम बोलकर सुनो (🔊 ऑडियो)',
    trendUp: 'दाम बढ़ रहा है 📈',
    trendDown: 'दाम घट रहा है 📉',
    trendStable: 'दाम स्थिर है ➡️',

    // Handover Pass
    handoverTitle: 'माल सुपुर्दगी व गारंटी रसीद',
    lotCode: 'पर्ची नंबर (Lot ID)',
    handoverPin: '6-अंकों का ऑफलाइन पिन',
    showToRecycler: 'माल देते समय रीसायकलर को यह क्यूआर कोड या पिन दिखाएं',
    handoverStatus: 'स्थिति',
    paymentMode: 'भुगतान का तरीका',
    cashRealized: 'हाथों-हाथ नकद प्राप्त हुआ',
    upiReceived: 'सीधे बैंक / UPI में आया',
    pendingHandover: 'जांच बाकी है',
    downloadSlip: 'पर्ची शेयर / सेव करें',

    // Earnings Ledger
    myEarningsTitle: 'मेरी कुल कमाई का बहीखाता',
    totalEarned: 'कुल कमाई (नकद + UPI)',
    totalLots: 'सफल लेनदेन',
    eWasteDiverted: 'सुरक्षित बेचा गया ई-कचरा',
    mineralsSaved: 'कीमती धातुएं सुरक्षित',
    pendingPayment: 'आने वाला बकाया',
    history: 'पुराने लेन-देन की सूची',

    // Safety Guide
    safetyTitle: 'स्वास्थ्य सुरक्षा एवं सही काम का तरीका',
    safetySub: 'धुएं, जहर और तेजाब से बचें — स्वास्थ्य भी सुरक्षित, दाम भी सबसे ज्यादा!',
    listenSafety: 'पूरी सुरक्षा सीख ऑडियो में सुनें 🔊',
    dangerLabel: 'खतरा (यह कभी न करें)',
    safeLabel: 'सुरक्षित और ज्यादा मुनाफा (यह करें)',

    // Recycler Portal
    recyclerPortalTitle: 'अधिकृत ई-कचरा रीसायकलर पोर्टल',
    incomingLots: 'आने वाले माल की सूची',
    verifyHandoverTitle: 'कलेक्टर माल की पुष्टि करें',
    enterPinOrScan: 'कलेक्टर का 6-डिजिट पिन डालें या QR स्कैन करें',
    verifyBtn: 'वजन जांचें और पुष्टि करें',
    confirmPayout: 'रुपये भुगतान करें व EPR सर्टिफिकेट बनाएं',
    rateUpdate: 'आज का भाव बदलें',
    serviceRadius: 'सेवा का दायरा',

    // Admin Dashboard
    adminTitle: 'खान मंत्रालय व JNARDDC ई-वेस्ट प्रबंधन डैशबोर्ड',
    adminSub: 'समस्या विवरण 26229 • अनौपचारिक से औपचारिक सप्लाई चेन',
    totalDivertedTons: 'जलाने से बचाया गया कुल ई-कचरा (टन)',
    totalCollectorUplift: 'कलेक्टर्स को मिला अतिरिक्त मुनाफा (₹)',
    activeRecyclersCount: 'सत्यापित अधिकृत रीसायकलर्स',
    traceabilityRate: '100% ट्रेसेबल आपूर्ति श्रृंखला',
    exportCsv: 'डेटा डाउनलोड करें (CSV)',
    anomalyAlerts: 'संदिग्ध लेनदेन अलर्ट',
  },

  mr: {
    appTitle: 'कबाडीवाला कनेक्ट',
    appSubTitle: 'थेट रास्त भाव • अधिकृत रिसायकलर • विषारी धूर व आम्लापासून मुक्ती',
    navCollector: 'कलेक्टर ॲप',
    navRecycler: 'रिसायकलर पोर्टल',
    navAdmin: 'मंत्रालय / JNARDDC डॅशबोर्ड',
    navEconomics: 'नफा व प्रभाव हिशोब',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन (मोबाईलमध्ये सेव्ह)',
    syncNow: 'डेटा सिंक करा',
    pendingSync: 'प्रलंबित पावत्या',
    allSynced: 'सर्व सिंक झाले',

    // Collector Tabs
    tabNewLot: '📸 फोटो व किंमत',
    tabRecyclers: '🏢 रिसायकलर शोधा',
    tabPrices: '📊 आजचे दर',
    tabReceipt: '📜 हस्तांतरण पावती',
    tabLedger: '💰 माझी कमाई',
    tabSafety: '🛡️ सुरक्षितता',

    // Photo & Valuation Screen
    takePhoto: 'मालाचा फोटो काढा / निवडा',
    orSelectPreset: 'किंवा मालाचा प्रकार थेट निवडा',
    classifying: 'AI मालाची तपासणी करत आहे...',
    classifiedAs: 'ओळखलेला माल',
    confidence: 'अचूकता',
    hazardAlert: 'धोक्याची सूचना',
    enterWeight: 'वजन टाका (किलो)',
    weightKg: 'वजन (किलो)',
    estimatedValue: 'अंदाजे खरी मिळणारी रक्कम',
    informalRate: 'स्थानिक भंगारवाल्याचा जुना दर',
    formalRate: 'अधिकृत EPR केंद्राचा खरा दर',
    yourUplift: 'कबाडीवाला कनेक्टमुळे जास्तीचा नफा',
    speakEstimate: 'किंमत ऐका 🔊',
    createLotBtn: 'दर निश्चित करा आणि पावती बनवा',
    criticalYield: 'मिळणारे मौल्यवान धातू (सोने, तांबे, लिथियम)',

    // Match Recyclers
    nearbyRecyclers: 'जवळचे अधिकृत रिसायकलर',
    cpcbVerified: 'शासकीय CPCB/SPCB मान्यताप्राप्त',
    rateOffered: 'देण्यात येणारा दर',
    distance: 'अंतर',
    pickup: 'गाडी माल नेण्यासाठी येईल',
    noPickup: 'स्वतः केंद्रावर न्यावे लागेल',
    chooseRecycler: 'रिसायकलर निवडा व माल द्या',
    callRecycler: 'फोन करा',

    // Price Board
    priceBoardTitle: 'ई-कचऱ्याचे आजचे ताजे बाजारभाव',
    priceSpokenBtn: 'आजचे सर्व दर आवाजात ऐका (🔊)',
    trendUp: 'भाव वाढतोय 📈',
    trendDown: 'भाव कमी होतोय 📉',
    trendStable: 'भाव स्थिर आहे ➡️',

    // Handover Pass
    handoverTitle: 'माल हस्तांतरण व हमी पावती',
    lotCode: 'पावती क्रमांक (Lot ID)',
    handoverPin: '६-अंकी ऑफलाइन पिन',
    showToRecycler: 'माल देताना रिसायकलरला हा QR किंवा पिन दाखवा',
    handoverStatus: 'स्थिती',
    paymentMode: 'पेमेंट पद्धत',
    cashRealized: 'रोख रक्कम लगेच मिळाली',
    upiReceived: 'थेट बँकेत / UPI द्वारे जमा',
    pendingHandover: 'तपासणी बाकी आहे',
    downloadSlip: 'पावती सेव्ह करा',

    // Earnings Ledger
    myEarningsTitle: 'माझ्या एकूण कमाईची नोंदवही',
    totalEarned: 'एकूण कमाई (रोख + UPI)',
    totalLots: 'पूर्ण झालेले व्यवहार',
    eWasteDiverted: 'सुरक्षित दिलेला ई-कचरा',
    mineralsSaved: 'मौल्यवान धातू वाचवले',
    pendingPayment: 'येणे बाकी रक्कम',
    history: 'मागील व्यवहारांचा इतिहास',

    // Safety Guide
    safetyTitle: 'कामगारांची सुरक्षा व योग्य पद्धती',
    safetySub: 'विषारी धूर व ॲसिडपासून लांब राहा — आरोग्यही सुरक्षित आणि दामही जास्त!',
    listenSafety: 'सुरक्षेची माहिती आवाजात ऐका 🔊',
    dangerLabel: 'धोका (हे कधीही करू नका)',
    safeLabel: 'सुरक्षित व जास्त नफा (असे करा)',

    // Recycler Portal
    recyclerPortalTitle: 'अधिकृत ई-वेस्ट रिसायकलर पोर्टल',
    incomingLots: 'येणाऱ्या मालाची यादी',
    verifyHandoverTitle: 'कलेक्टरच्या मालाची पडताळणी',
    enterPinOrScan: 'कलेक्टरचा ६-अंकी पिन टाका किंवा QR स्कॅन करा',
    verifyBtn: 'वजन तपासा व व्यवहार पूर्ण करा',
    confirmPayout: 'पैसे द्या व EPR प्रमाणपत्र जारी करा',
    rateUpdate: 'आजचे खरेदी दर बदला',
    serviceRadius: 'सेवा परिसर',

    // Admin Dashboard
    adminTitle: 'खाण मंत्रालय व JNARDDC ई-वेस्ट नियंत्रण डॅशबोर्ड',
    adminSub: 'समस्या विधान २६२२९ • अनौपचारिक ते अधिकृत साखळी',
    totalDivertedTons: 'जाळण्यापासून वाचवलेला ई-कचरा (टन)',
    totalCollectorUplift: 'कलेक्टर्सना मिळालेला जास्तीचा नफा (₹)',
    activeRecyclersCount: 'नोंदणीकृत अधिकृत रिसायकलर',
    traceabilityRate: '१००% पारदर्शक साखळी',
    exportCsv: 'डेटा डाउनलोड करा (CSV)',
    anomalyAlerts: 'संशयास्पद व्यवहारांच्या नोंदी',
  },
};

export function getTranslation(lang: Language) {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export const translations = TRANSLATIONS;
