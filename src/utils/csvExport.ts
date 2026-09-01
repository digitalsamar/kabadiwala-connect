import { LotRecord, MaterialCategoryInfo, Recycler } from '../types';

export function exportDatasetToCSV(
  type: 'materials' | 'prices' | 'recyclers' | 'transactions' | 'traceability' | 'all',
  data: {
    categories: MaterialCategoryInfo[];
    recyclers: Recycler[];
    lots: LotRecord[];
  }
) {
  let filename = `kabadiwala_${type}_dataset_${new Date().toISOString().slice(0, 10)}.csv`;
  let csvContent = '';

  if (type === 'materials') {
    const headers = ['Category_ID', 'Name_EN', 'Name_HI', 'Unit', 'Formal_Rate_INR', 'Informal_Baseline_INR', 'Critical_Minerals', 'Hazard_Risk'];
    const rows = data.categories.map((c) => [
      c.id,
      `"${c.name.en}"`,
      `"${c.name.hi}"`,
      c.unit,
      c.formalRate,
      c.informalBaselineRate,
      `"${c.criticalMinerals.join('; ')}"`,
      `"${c.hazardousRisk.replace(/"/g, '""')}"`,
    ]);
    csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  } else if (type === 'prices') {
    const headers = ['Material_Category', 'Formal_Rate_Per_Kg', 'Informal_Rate_Per_Kg', 'Price_Uplift_INR', 'Trend', 'Trend_Percent', 'Timestamp'];
    const rows = data.categories.map((c) => [
      c.id,
      c.formalRate,
      c.informalBaselineRate,
      c.formalRate - c.informalBaselineRate,
      c.trend,
      `${c.trendPercent}%`,
      new Date().toISOString(),
    ]);
    csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  } else if (type === 'recyclers') {
    const headers = ['Recycler_ID', 'Trade_Name', 'CPCB_Authorization_Number', 'Auth_Status', 'City', 'State', 'Accepted_Materials', 'Pickup_Available', 'Rating'];
    const rows = data.recyclers.map((r) => [
      r.id,
      `"${r.tradeName}"`,
      r.authorizationNumber,
      r.authorizationStatus,
      r.location.city,
      r.location.state,
      `"${r.acceptedMaterials.join('; ')}"`,
      r.pickupAvailable ? 'YES' : 'NO',
      r.rating,
    ]);
    csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  } else if (type === 'transactions') {
    const headers = ['Lot_ID', 'Reference_Code', 'Collector_Name', 'Material_Category', 'Weight_Kg', 'Quoted_Value_INR', 'Final_Sale_Value_INR', 'Price_Uplift_INR', 'Recycler_Name', 'Payment_Mode', 'Payment_Status', 'Created_At', 'Status'];
    const rows = data.lots.map((l) => [
      l.id,
      l.referenceCode,
      `"${l.collectorName}"`,
      l.materialCategory,
      l.actualWeightKg || l.estimatedWeightKg,
      l.estimatedValue,
      l.finalSaleValue || l.estimatedValue,
      l.priceUplift,
      `"${l.matchedRecyclerName || 'Unassigned'}"`,
      l.paymentMode,
      l.paymentStatus,
      l.createdAt,
      l.status,
    ]);
    csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  } else if (type === 'traceability' || type === 'all') {
    const headers = ['Lot_ID', 'Reference_Code', 'Handover_PIN', 'Traceability_Hash', 'Material_Category', 'Weight_Kg', 'GPS_Address', 'GPS_Lat', 'GPS_Lng', 'Created_At', 'Completed_At', 'Recycler_Name', 'Status'];
    const rows = data.lots.map((l) => [
      l.id,
      l.referenceCode,
      l.handoverPin,
      l.traceabilityHash || 'PENDING_CONFIRMATION',
      l.materialCategory,
      l.actualWeightKg || l.estimatedWeightKg,
      `"${l.gpsLocation.address}"`,
      l.gpsLocation.lat,
      l.gpsLocation.lng,
      l.createdAt,
      l.completedAt || '',
      `"${l.matchedRecyclerName || 'Unassigned'}"`,
      l.status,
    ]);
    csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  // Trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
