export type Language = 'hi' | 'mr' | 'en';

export type UserRole = 'collector' | 'recycler' | 'admin' | 'economics';

export type MaterialCategory =
  | 'pcb'
  | 'cables'
  | 'batteries'
  | 'crt'
  | 'lcd_panels'
  | 'motors_magnets'
  | 'mixed_plastics'
  | 'appliances';

export interface MaterialCategoryInfo {
  id: MaterialCategory;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  subCategories: string[];
  unit: 'kg' | 'piece';
  formalRate: number; // ₹ per kg or piece
  informalBaselineRate: number; // typical informal backyard rate
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  criticalMinerals: string[]; // e.g. ['Copper', 'Gold', 'Lithium', 'Cobalt']
  hazardousRisk: string; // Safety alert
  iconName: string;
  sampleImage: string;
}

export interface PricePoint {
  date: string;
  formalRate: number;
  informalRate: number;
}

export interface Recycler {
  id: string;
  name: string;
  tradeName: string;
  authorizationNumber: string; // CPCB / SPCB license
  authorizationStatus: 'ACTIVE_VALIDATED' | 'PROVISIONAL' | 'EXPIRING_SOON';
  location: {
    address: string;
    city: string;
    state: string;
    distanceKm: number;
    latitude: number;
    longitude: number;
  };
  contactPhone: string;
  acceptedMaterials: MaterialCategory[];
  rates: Partial<Record<MaterialCategory, number>>;
  pickupAvailable: boolean;
  minPickupWeightKg: number;
  rating: number;
  totalLotsProcessed: number;
  operatingHours: string;
}

export type PaymentMode = 'CASH' | 'UPI' | 'BANK_TRANSFER';
export type PaymentStatus = 'PAID_CASH' | 'PAID_UPI' | 'PENDING' | 'DISPUTED';
export type LotStatus = 'DRAFT' | 'MATCHED' | 'IN_TRANSIT' | 'COMPLETED' | 'REJECTED';

export interface LotRecord {
  id: string;
  referenceCode: string; // e.g. "KC-2026-8921"
  collectorId: string;
  collectorName: string;
  collectorPhone?: string;
  materialCategory: MaterialCategory;
  subCategory?: string;
  estimatedWeightKg: number;
  actualWeightKg?: number;
  formalRatePerKg: number;
  informalBaselineRatePerKg: number;
  estimatedValue: number;
  finalSaleValue?: number;
  priceUplift: number; // estimatedValue - (informalBaselineRatePerKg * weight)
  photoUrl: string;
  gpsLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
  completedAt?: string;
  status: LotStatus;
  matchedRecyclerId?: string;
  matchedRecyclerName?: string;
  handoverPin: string; // 6-digit offline code e.g. "492018"
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
  traceabilityHash?: string;
  isOfflineCreated?: boolean;
  isSynced?: boolean;
  anomalyFlag?: boolean;
  anomalyReason?: string;
  notes?: string;
}

export interface SafetyGuideline {
  id: string;
  materialCategory: MaterialCategory;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  dangerText: {
    en: string;
    hi: string;
    mr: string;
  };
  safeActionText: {
    en: string;
    hi: string;
    mr: string;
  };
  dangerIcon: string;
  safeIcon: string;
  audioPrompt: {
    en: string;
    hi: string;
    mr: string;
  };
}

export interface CollectorProfile {
  id: string;
  name: string;
  phone: string;
  language: Language;
  operatingCity: string;
  totalEarnings: number;
  totalWeightDivertedKg: number;
  totalHandovers: number;
  pendingDues: number;
  criticalMineralsRecovered: {
    copperKg: number;
    lithiumGrams: number;
    cobaltGrams: number;
    goldGrams: number;
    neodymiumGrams: number;
  };
}

export interface ClassificationResult {
  category: MaterialCategory;
  subCategory: string;
  confidence: number;
  description: string;
  estimatedHazard: string;
  criticalMineralsFound: string[];
  suggestedRate: number;
}
