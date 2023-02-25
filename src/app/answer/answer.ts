import { Question } from "../question/question";

export interface Answer {
    id: number;
    question: Question
    answerBody: String;

}