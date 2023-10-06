export type Store = {
  id: number;
  categoryId: string;
  name: string;
  status: "opening" | "launching" | "closed";
  logoImageUrl: string;
  siteUrl: string;
  address: string;
  openingHours: string;
  closedHours: string;
  phone: string;
  lineId: string;
  description: string;
  discountInfo: string;
  discountDescription: string;
  discountStartTime: Date;
  discountEndTime: Date;
  latitude: string,
  longitude: string;
};

export type StoreCategory = {
  id: number;
  name: string;
  icon: string;
};