import {Subject} from "../subject/subject";
import {Question} from "../question/question";

export interface Lesson {
  id: number;

  lessonGroup: string;
  subject: Subject;
  question: Question;
  timeStart: Date;
  timeEnd: Date;
  teacherUsername: string;
}
