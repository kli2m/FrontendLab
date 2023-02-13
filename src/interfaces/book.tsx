
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
