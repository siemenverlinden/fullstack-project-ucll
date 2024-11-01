export class Book {

    private id?: string;
    private title: string;
    private description: string;
    private authors: string[];
    private isbn: string;
    private copiesAvailable: number;



    constructor(book: {
        id?: string;
        title: string;
        description: string;
        authors: string[];
        isbn: string;
        copiesAvailable: number;
    }) {

    this.id = book.id;
    this.title = book.title;
    this.description = book.description;
    this.authors = book.authors;
    this.isbn = book.isbn;
    this.copiesAvailable = book.copiesAvailable;
    }


    getId(): string | undefined {
        return this.id;
    }

    getCopiesAvailable(): number {
        return this.copiesAvailable;
    }
    getIsbn(): string {
        return this.isbn;
    }
    getAuthors(): string[] {
        return this.authors;
    }
    getDescription(): string {
        return this.description;
    }
    getTitle(): string {
        return this.title;
    }

    checkAvailability(): boolean {
        return this.copiesAvailable > 0;
    }

    addCopy(): void {
        this.copiesAvailable++;
    }

    removeCopy(): void {
        this.copiesAvailable--;
    }
    equals(book: Book): boolean {
        return (
            this.title === book.getTitle() &&
            this.description === book.getDescription() &&
            this.authors === book.getAuthors() &&
            this.isbn === book.getIsbn()
        );
    }
}
