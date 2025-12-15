export interface Book {
    _id: string; 
    title: string;
    author: string;
    category: string;
    price: number;
    publish_year: number;
    isbn_num: number;
    cover_image?: string;
    created_at?: string;
    updated_at?: string;
}
