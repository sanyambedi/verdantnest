
export type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';
export type Sunlight = 'Low' | 'Partial' | 'Full Sun';
export type Category = 
  | 'Indoor' 
  | 'Outdoor' 
  | 'Succulent' 
  | 'Tools'
  | 'Flowering'
  | 'Fruit'
  | 'Medicinal'
  | 'Air Purifier'
  | 'Bonsai'
  | 'Herb'
  | 'Hanging'
  | 'Seasonal'
  | 'Seeds'
  | 'Planters'
  | 'Fertilizers'
  | 'Garden Decor';

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  originalPrice?: number; // Added for discounts
  slug: string;
  description: string;
  difficulty: Difficulty;
  sunlight: Sunlight;
  category: Category;
  image: string;
  reviews: Review[];
  rating: number;
  tips: string[];
  facts: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
  slug: string;
  readTime: string;
}
