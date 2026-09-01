import { LotRecord, MaterialCategoryInfo, Recycler, CollectorProfile } from '../types';
import { INITIAL_LOTS, MATERIAL_CATEGORIES, INITIAL_RECYCLERS, INITIAL_COLLECTOR_PROFILE } from '../data/initialData';

const LOTS_STORAGE_KEY = 'kabadiwala_lots_v1';
const PRICE_CACHE_KEY = 'kabadiwala_prices_v1';
const RECYCLERS_KEY = 'kabadiwala_recyclers_v1';
const COLLECTOR_PROFILE_KEY = 'kabadiwala_collector_v1';
const OFFLINE_MODE_KEY = 'kabadiwala_offline_flag_v1';

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.warn('Listener error in OfflineStore', e);
    }
  });
}

export class OfflineStore {
  public static subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  public static getLots(): LotRecord[] {
    try {
      const data = localStorage.getItem(LOTS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read lots from localStorage', e);
    }
    return INITIAL_LOTS;
  }

  public static saveLots(lots: LotRecord[]) {
    try {
      localStorage.setItem(LOTS_STORAGE_KEY, JSON.stringify(lots));
      notifyListeners();
    } catch (e) {
      console.warn('Failed to save lots to localStorage', e);
    }
  }

  public static saveLot(newLot: LotRecord): LotRecord[] {
    const current = this.getLots();
    const updated = [newLot, ...current.filter((l) => l.id !== newLot.id)];
    this.saveLots(updated);
    this.updateCollectorStats(updated);
    return updated;
  }

  public static addLot(newLot: LotRecord): LotRecord[] {
    return this.saveLot(newLot);
  }

  public static getPendingSyncLots(): LotRecord[] {
    const current = this.getLots();
    return current.filter((l) => !l.isSynced);
  }

  public static updateLotStatus(
    lotId: string,
    status: LotRecord['status'],
    paymentMode?: LotRecord['paymentMode'],
    paymentStatus?: LotRecord['paymentStatus'],
    actualWeightKg?: number,
    finalSaleValue?: number
  ): LotRecord[] {
    const current = this.getLots();
    const updated = current.map((lot) => {
      if (lot.id === lotId) {
        const weight = actualWeightKg !== undefined ? actualWeightKg : (lot.actualWeightKg || lot.estimatedWeightKg);
        const finalVal = finalSaleValue !== undefined ? finalSaleValue : (lot.finalSaleValue || lot.estimatedValue);
        const uplift = finalVal - (lot.informalBaselineRatePerKg * weight);

        return {
          ...lot,
          status,
          paymentMode: paymentMode || lot.paymentMode,
          paymentStatus: paymentStatus || lot.paymentStatus,
          actualWeightKg: weight,
          finalSaleValue: finalVal,
          priceUplift: uplift,
          completedAt: status === 'COMPLETED' ? new Date().toISOString() : lot.completedAt,
          traceabilityHash: status === 'COMPLETED' && !lot.traceabilityHash
            ? `EPR-CPCB-${Date.now().toString(36).toUpperCase()}-${lot.handoverPin}`
            : lot.traceabilityHash,
        };
      }
      return lot;
    });

    this.saveLots(updated);
    this.updateCollectorStats(updated);
    return updated;
  }

  public static getCategories(): MaterialCategoryInfo[] {
    try {
      const data = localStorage.getItem(PRICE_CACHE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read price cache', e);
    }
    return MATERIAL_CATEGORIES;
  }

  public static getPriceCategories(): MaterialCategoryInfo[] {
    return this.getCategories();
  }

  public static savePriceCategories(categories: MaterialCategoryInfo[]) {
    try {
      localStorage.setItem(PRICE_CACHE_KEY, JSON.stringify(categories));
      notifyListeners();
    } catch (e) {
      console.warn('Failed to save prices', e);
    }
  }

  public static getRecyclers(): Recycler[] {
    try {
      const data = localStorage.getItem(RECYCLERS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read recyclers', e);
    }
    return INITIAL_RECYCLERS;
  }

  public static saveRecyclers(recyclers: Recycler[]) {
    try {
      localStorage.setItem(RECYCLERS_KEY, JSON.stringify(recyclers));
      notifyListeners();
    } catch (e) {
      console.warn('Failed to save recyclers', e);
    }
  }

  public static updateRecyclerRates(recyclerId: string, rates: Partial<Record<string, number>>) {
    const current = this.getRecyclers();
    const updated = current.map((r) => {
      if (r.id === recyclerId) {
        return {
          ...r,
          rates: { ...r.rates, ...rates },
        };
      }
      return r;
    });
    this.saveRecyclers(updated);
  }

  public static getCollectorProfile(): CollectorProfile {
    try {
      const data = localStorage.getItem(COLLECTOR_PROFILE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read collector profile', e);
    }
    return INITIAL_COLLECTOR_PROFILE;
  }

  public static updateCollectorStats(lots: LotRecord[]) {
    const profile = this.getCollectorProfile();
    let totalEarned = 0;
    let totalWeight = 0;
    let completedCount = 0;
    let pendingDues = 0;

    lots.forEach((lot) => {
      if (lot.status === 'COMPLETED') {
        completedCount++;
        const val = lot.finalSaleValue || lot.estimatedValue;
        totalEarned += val;
        totalWeight += (lot.actualWeightKg || lot.estimatedWeightKg);
      } else if (lot.status === 'MATCHED' || lot.status === 'IN_TRANSIT') {
        pendingDues += lot.estimatedValue;
      }
    });

    const updatedProfile: CollectorProfile = {
      ...profile,
      totalEarnings: totalEarned,
      totalWeightDivertedKg: Math.round(totalWeight * 10) / 10,
      totalHandovers: completedCount,
      pendingDues,
      criticalMineralsRecovered: {
        copperKg: Math.round(totalWeight * 0.28 * 10) / 10,
        lithiumGrams: Math.round(totalWeight * 15),
        cobaltGrams: Math.round(totalWeight * 7.5),
        goldGrams: Math.round(totalWeight * 0.08 * 10) / 10,
        neodymiumGrams: Math.round(totalWeight * 2.6),
      },
    };

    try {
      localStorage.setItem(COLLECTOR_PROFILE_KEY, JSON.stringify(updatedProfile));
      notifyListeners();
    } catch (e) {
      console.warn('Failed to update profile', e);
    }
  }

  public static isForcedOffline(): boolean {
    return localStorage.getItem(OFFLINE_MODE_KEY) === 'true';
  }

  public static setForcedOffline(val: boolean) {
    localStorage.setItem(OFFLINE_MODE_KEY, val ? 'true' : 'false');
    notifyListeners();
  }

  public static syncPendingLots(): { syncedCount: number; remainingPending: number } {
    const lots = this.getLots();
    let synced = 0;
    const updated = lots.map((l) => {
      if (!l.isSynced) {
        synced++;
        return { ...l, isSynced: true };
      }
      return l;
    });
    this.saveLots(updated);
    return { syncedCount: synced, remainingPending: 0 };
  }
}
