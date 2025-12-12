export interface Book {
    _id: string; // Mongoose default
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
