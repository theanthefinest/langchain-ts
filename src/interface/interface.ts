export interface Question {
    question: string;
};

export interface Answer {
    answer: string;
    source?: string; // Rag source if applicable
};