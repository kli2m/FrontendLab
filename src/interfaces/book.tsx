import { UserType } from './user';

export interface CategoriesType {
  name: string;
  path: string;
  id: number;
}

export interface MutBooksType extends CategoriesType {
  books: BookType2[];
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
  id: string;
  image?: string[];
  category: string;
  author: string;
  title: string;
  rating: number;
  reviews: ReviewType[];
  year: number;
  isBooked: boolean;
  bookedTill: string;
}

export interface BookType2 {
  issueYear: number;
  rating: number;
  title: string;
  authors: [string];
  image: {
    url: string;
  };
  categories: string[];
  id: number;
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
