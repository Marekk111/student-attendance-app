import {Question} from "../question/question";

export interface AnswerOption {
  id?: number;
  optionBody: string;
  question?: Question;


}
