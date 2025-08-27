export interface PricingRegion {
  id: string;
  name: string;
  hourlyRate: number;
  currency: string;
  currencySymbol: string;
  multiplier: number;
}

export const PRICING_REGIONS: PricingRegion[] = [
  {
    id: 'mexico',
    name: 'Mexico',
    hourlyRate: 25,
    currency: 'USD',
    currencySymbol: '$',
    multiplier: 1,
  },
  {
    id: 'usa',
    name: 'USA',
    hourlyRate: 125,
    currency: 'USD',
    currencySymbol: '$',
    multiplier: 5,
  },
  {
    id: 'europe',
    name: 'Europe',
    hourlyRate: 95,
    currency: 'EUR',
    currencySymbol: '€',
    multiplier: 3.8,
  },
];

export function calculateRegionalPricing(
  basePrice: number,
  region: PricingRegion
): number {
  return Math.round(basePrice * region.multiplier);
}

export function formatCurrency(
  amount: number,
  region: PricingRegion
): string {
  return `${region.currencySymbol}${amount.toLocaleString()}`;
}