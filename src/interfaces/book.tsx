import { UserType } from './user';

export interface ImageType {
  url: string;
}

export interface CommentType {
  id: number;
  rating: number;
  text: string;
  createdAt: Date;
  user: UserType;
}

export interface CategoriesType {
  name: string;
  path: string;
  id: number;
}

export interface MutBooksType extends CategoriesType {
  books: BookType[];
}

export interface MenuType {
  category: string;
  name: string;
  count: number;
  books: BookType[];
}

export interface ReviewType {
  name: string;
  img: string;
  date: string;
  personalRating: number;
  comment: string;
}

export interface BookType {
  id: number;
  title: string;
  rating: number;
  issueYear: number;
  description?: string;
  publish?: string;
  pages?: number;
  cover?: string;
  weight?: number;
  format?: string;
  ISBN?: string;
  producer?: string;
  authors: string[];
  images?: ImageType[];
  image?: {
    url: string;
  };
  categories: string[];
  comments: CommentType[];
  booking: {
    id: number;
    order: boolean;
    dateOrder: Date;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: Date;
    dateHandedTo: Date;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
  histories: UserType[];
}
