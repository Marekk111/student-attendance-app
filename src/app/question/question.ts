import { Answer } from "../answer/answer";
import {AnswerOption} from "../answer-option/answer-option";
import {QuestionType} from "./questionType"

export interface Question {
    id: number;
    name: string;
    questionBody: string;
    answers: Answer[];
    questionType: QuestionType;

    options: AnswerOption[];


}
