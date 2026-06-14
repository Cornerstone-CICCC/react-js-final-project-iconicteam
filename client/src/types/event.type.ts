export type ApiEvent = {
  id: number;
  tripId: number;
  date: string;
  title: string;
  detail: string;
  localCurrency: string;
  priceLocalCurrency: number;
  priceYourCurrency: number;
  appliedExchangeRate: number | string;
  createdAt: string;
  updatedAt: string;
};
