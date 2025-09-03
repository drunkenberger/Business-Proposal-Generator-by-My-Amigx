import { PricingRegion, CostItem, RegionalCostItem } from "../types/proposal.js";

export const PRICING_REGIONS: PricingRegion[] = [
  {
    id: 'mexico',
    name: 'Mexico',
    hourlyRate: 25,
    currency: 'USD',
    symbol: '$'
  },
  {
    id: 'us',
    name: 'United States',
    hourlyRate: 75,
    currency: 'USD',
    symbol: '$'
  },
  {
    id: 'europe',
    name: 'Europe',
    hourlyRate: 65,
    currency: 'USD',
    symbol: '$'
  }
];

export class PricingService {
  static calculateRegionalPricing(costItems: CostItem[], region: PricingRegion): RegionalCostItem[] {
    return costItems.map(item => ({
      ...item,
      hourlyRate: region.hourlyRate,
      totalCost: Math.round(item.hours * region.hourlyRate * 100) / 100
    }));
  }

  static calculateTotalCost(regionalCostItems: RegionalCostItem[]): number {
    const sum = regionalCostItems.reduce((total, item) => total + item.totalCost, 0);
    return Math.round(sum * 100) / 100;
  }

  static getRegionById(regionId: string): PricingRegion | null {
    return PRICING_REGIONS.find(region => region.id === regionId) || null;
  }

  static getAllRegions(): PricingRegion[] {
    return PRICING_REGIONS;
  }
}