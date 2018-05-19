import { Release } from './release';

// Shelf class represents a single shelf and associated fields
export class Shelf {
  id: number;
  ownerId: number;
  ownerName: string;
  name: string;
  releases: Release[];
  description: string;
  dateCreated: Date;
  dateLastEdit: Date;
  featured: boolean;
}

export class NewShelf {
  name: string;
  description: string;
  featured: boolean;
}
