import { User } from './user';

export interface Listing {
  propertyId: number;
  imageUrls: string[];
  name: string;
  description: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  parking: boolean;
  furnished: boolean;
  user: User;
}
