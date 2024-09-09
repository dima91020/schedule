export interface Lesson {
  id: number;
  count: number;
  title: string;
  day: string;
  timeStart: string;
  zoomURL: string;
  teacher: string;
  typeLesson: string;
  isElective: boolean;
  usersId: number[];
}
