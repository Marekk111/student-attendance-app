import {Question} from "../question/question";
import {Lesson} from "../lesson/lesson";

export interface Answer {
    id: number;
    question: Question
    answerBody: string;
    lessonId: number;
    answeredByUser: string;

}
