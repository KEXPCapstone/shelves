// Shelf class represents a single shelf and associated fields
export class Shelf {
  id: number;
  ownerId: number;
  name: string;
  ReleaseIds: string[];
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

