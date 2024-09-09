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

export const FirstWeek: React.FC<Props> = ({ lessons, isCurrentWeek, nowDay }) => {
  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const daysOfWeekUkr = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [nextLesson, setNextLesson] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  useEffect(() => {
    const currentDayIndex = nowDay.getDay() - 1;
    const minutesSinceMidnight = nowDay.getHours() * 60 + nowDay.getMinutes();

    let currentLessonNumber: number | null = null;
    let nextLessonNumber: number | null = null;

    if (minutesSinceMidnight >= 510 && minutesSinceMidnight < 610) {
      currentLessonNumber = 1;
      nextLessonNumber = 2;
    } else if (minutesSinceMidnight >= 625 && minutesSinceMidnight < 725) {
      currentLessonNumber = 2;
      nextLessonNumber = 3;
    } else if (minutesSinceMidnight >= 740 && minutesSinceMidnight < 840) {
      currentLessonNumber = 3;
      nextLessonNumber = 4;
    } else if (minutesSinceMidnight >= 855 && minutesSinceMidnight < 955) {
      currentLessonNumber = 4;
      nextLessonNumber = 5;
    } else if (minutesSinceMidnight >= 970 && minutesSinceMidnight < 1075) {
      currentLessonNumber = 5;
    }

    if (!currentLessonNumber) {
      if (minutesSinceMidnight < 510) {
        nextLessonNumber = 1;
      } else if (minutesSinceMidnight < 625) {
        nextLessonNumber = 2;
      } else if (minutesSinceMidnight < 740) {
        nextLessonNumber = 3;
      } else if (minutesSinceMidnight < 855) {
        nextLessonNumber = 4;
      } else if (minutesSinceMidnight < 970) {
        nextLessonNumber = 5;
      }
    }

    setCurrentLesson(currentLessonNumber);
    setNextLesson(nextLessonNumber);
    setCurrentDay(currentDayIndex);
  }, [nowDay]);

  useEffect(() => {
    console.log("Current Lesson:", currentLesson);
    console.log("Next Lesson:", nextLesson);
    console.log("Current Day:", currentDay);

    if (currentDay !== null) {
      const lessonsForDay = lessons.filter((lesson) => lesson.day === daysOfWeek[currentDay]);
      console.log("Lessons for Current Day:", lessonsForDay);
    }
  }, [currentLesson, nextLesson, currentDay, lessons, daysOfWeek]);

  const getClassForCell = (lessonNumber: number, dayIndex: number) => {
    const hasLessonForDay = lessons.some(
      (lesson) => lesson.day === daysOfWeek[dayIndex] && lesson.count === lessonNumber
    );

    const isCurrent = hasLessonForDay && currentLesson === lessonNumber && currentDay === dayIndex && isCurrentWeek === Week.IsFirstWeek;
    const isNext = hasLessonForDay && nextLesson === lessonNumber && currentDay === dayIndex && isCurrentWeek === Week.IsFirstWeek;
    const isCurrentDay = currentDay === dayIndex && isCurrentWeek === Week.IsFirstWeek;

    return cn({
      "current_pair": isCurrent,
      "closest_pair": isNext,
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
