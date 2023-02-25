import { Answer } from "../answer/answer";

export interface Question {
    id: number;
    name: string;
    questionBody: string;
    answers: Answer[]
}