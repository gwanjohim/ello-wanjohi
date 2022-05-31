
export interface Token {
    position: number[];
    value: string;
    __typename: string;
}

export interface Page {
    content: string;
    pageIndex: number;
    tokens: Token[];
    __typename: string;
}

export interface Book {
    author: string;
    title: string;
    pages: Page[];
    __typename: string;
}

// export interface Data {
//     book: Book;
// }

// export interface RootObject {
//     data: Data;
// }


