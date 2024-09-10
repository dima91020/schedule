import React, { useEffect, useState } from "react";
import { Lesson } from "../types/Lesson";
import cn from "classnames";
import { Week } from "./Schedule";

type Props = {
  lessons: Lesson[];
  isCurrentWeek: string | undefined;
  nowDay: Date;
};

const lessonTimes = ["08:30", "10:25", "12:20", "14:15", "16:10"];

export const SecondWeek: React.FC<Props> = ({ lessons, isCurrentWeek, nowDay }) => {
  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const daysOfWeekUkr = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [nextLesson, setNextLesson] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  useEffect(() => {
    const currentDayIndex = nowDay.getDay() - 1; // Індекс дня
    const minutesSinceMidnight = nowDay.getHours() * 60 + nowDay.getMinutes(); // Час у хвилинах з початку дня
  
    let currentLessonNumber: number | null = null;
    let nextLessonNumber: number | null = null;
  
    // Знаходимо поточну пару на основі часу
    if (minutesSinceMidnight >= 510 && minutesSinceMidnight < 610) {
      currentLessonNumber = 1;
    } else if (minutesSinceMidnight >= 625 && minutesSinceMidnight < 725) {
      currentLessonNumber = 2;
    } else if (minutesSinceMidnight >= 740 && minutesSinceMidnight < 840) {
      currentLessonNumber = 3;
    } else if (minutesSinceMidnight >= 855 && minutesSinceMidnight < 955) {
      currentLessonNumber = 4;
    } else if (minutesSinceMidnight >= 970 && minutesSinceMidnight < 1075) {
      currentLessonNumber = 5;
    }
  
    // Фільтруємо уроки на поточний день
    const lessonsForDay = lessons.filter((lesson) => lesson.day === daysOfWeek[currentDayIndex]);
  
    if (currentLessonNumber !== null) {
      // Явне приведення типу до number, щоб уникнути помилки
      const nextLesson = lessonsForDay.find((lesson) => lesson.count > (currentLessonNumber as number));
      nextLessonNumber = nextLesson ? nextLesson.count : null;
    } else {
      // Якщо немає поточної пари (раніше початку уроків), знайти найближчу
      const nextLesson = lessonsForDay.find((lesson) => {
        const lessonStartTime = lessonTimes[lesson.count - 1]; // Отримуємо час початку пари
        const [hours, minutes] = lessonStartTime.split(':').map(Number);
        const lessonStartMinutes = hours * 60 + minutes; // Перетворюємо час у хвилини
        return minutesSinceMidnight < lessonStartMinutes;
      });
      nextLessonNumber = nextLesson ? nextLesson.count : null;
    }
  
    setCurrentLesson(currentLessonNumber);
    setNextLesson(nextLessonNumber);
    setCurrentDay(currentDayIndex);
  }, [nowDay, lessons, lessonTimes]);
  

  // Фільтруємо уроки для поточного дня
  const lessonsForDay = lessons.filter(
    (lesson) => lesson.day === daysOfWeek[currentDay!]
  );

  const getClassForCell = (lessonNumber: number, dayIndex: number) => {
    const lessonForDay = lessonsForDay.find(
      (lesson) => lesson.count === lessonNumber
    );

    const isCurrent =
      lessonForDay && currentLesson === lessonNumber && currentDay === dayIndex && isCurrentWeek === Week.IsSecondWeek;
    const isNext =
      lessonForDay && nextLesson === lessonNumber && currentDay === dayIndex && isCurrentWeek === Week.IsSecondWeek;
    const isCurrentDay = currentDay === dayIndex && isCurrentWeek === Week.IsSecondWeek;

    return cn({
      "current_pair": isCurrent,   // Підсвічування поточного уроку
      "closest_pair": isNext,      // Підсвічування наступного уроку
      "day_backlight": isCurrentDay,
    });
  };

  const getLessonsForDay = (day: string, lessonNumber: number) => {
    return lessons
      .filter((lesson) => lesson.day === day && lesson.count === lessonNumber)
      .map((lesson) => (
        <div key={lesson.id}>
          <span className="disLabel">
            <a
              className="plainLink"
              href={lesson.zoomURL}
              target="_blank"
              rel="noreferrer"
              title={lesson.title}
            >
              {lesson.title}
              {lesson.isElective ? <span>🚫</span> : null}
            </a>
          </span>
          <br />
          <a className="plainLink" title={lesson.teacher}>
            {lesson.teacher}
          </a>
          <br />
          {lesson.typeLesson}
          <br />
        </div>
      ));
  };

  return (
    <div className="table-container">
      <table
        id="ctl00_MainContent_FirstScheduleTable"
        className="table table-bordered table-hover"
        cellPadding="10"
        rules="all"
        align="center"
        border={1}
      >
        <thead>
          <tr>
            <th></th>
            {daysOfWeekUkr.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((lessonNumber) => (
            <tr key={lessonNumber}>
              <td>
                {lessonNumber}
                <br />
                {lessonTimes[lessonNumber - 1]}
              </td>
              {daysOfWeek.map((day, index) => (
                <td
                  key={day}
                  className={getClassForCell(lessonNumber, index)}
                >
                  {getLessonsForDay(day, lessonNumber)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
