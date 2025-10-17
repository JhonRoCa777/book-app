interface User {
    document: string,
    names: string,
    last_names: string
}

interface Loan {
    id: number,
    user: User,
    created_at: string,
    end_date: string
}

interface Serial {
    serial_id: number,
    serial: string,
    status: "PRESTADO" | "MORA" | "DISPONIBLE";
    loan: Loan | null;
}

export interface BookLoan
{
    book_id: number,
    title: string,
    image: string,
    author: string,
    genre: string,
    serials: Serial[]
}