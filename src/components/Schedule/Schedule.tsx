import { useEffect, useRef, useState } from "react";
import { FirstWeek } from "../FirstWeek";
import { SecondWeek } from "../SecondWeek";
import { Lesson } from "../../types/Lesson";
import firstWeekLessonsFromServer from '../../api/firstWeek.json';
import secondWeekLessonsFromServer from '../../api/secondWeek.json';
import { useSearchParams } from "react-router-dom";

export enum Week {
  IsFirstWeek = 'firstWeek',
  IsSecondWeek = 'secondWeek',
}

export const Schedule = () => {
  const [firstWeekLessons, setFirstWeekLessons] = useState<Lesson[]>(firstWeekLessonsFromServer);
  const [secondWeekLessons, setSecondWeekLessons] = useState<Lesson[]>(secondWeekLessonsFromServer);
  const [isCurrentWeek, setIsCurrentWeek] = useState<Week | undefined>();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const selectedUserId = userId ? +userId : 0;
  const elementRef = useRef<HTMLDivElement>(null);

  const nowDay = new Date();
  nowDay.setDate(11)
  // nowDay.setHours(8)
  // nowDay.setMinutes(29)

  useEffect(() => {
    if (selectedUserId >= 1 && selectedUserId <= 17) {
      const filteredFirstWeekLessons = firstWeekLessonsFromServer.filter(lesson => lesson.usersId.includes(selectedUserId));
      const filteredSecondWeekLessons = secondWeekLessonsFromServer.filter(lesson => lesson.usersId.includes(selectedUserId));
      setFirstWeekLessons(filteredFirstWeekLessons);
      setSecondWeekLessons(filteredSecondWeekLessons);
    } else {
      setFirstWeekLessons(firstWeekLessonsFromServer);
      setSecondWeekLessons(secondWeekLessonsFromServer);
    }
  }, [selectedUserId]);

  useEffect(() => {
    const currentWeekCount = (year: number) => {
      const startFrom = new Date(year, 0, 1);
      const now = new Date();
      const diffInMs = now.getTime() - startFrom.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      const weekNumber = Math.ceil(diffInDays / 7);

      return weekNumber % 2 === 0 ? Week.IsFirstWeek : Week.IsSecondWeek;
    };

    setIsCurrentWeek(currentWeekCount(2024));
  }, []);

  useEffect(() => {
    if (isCurrentWeek === Week.IsSecondWeek && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isCurrentWeek]);

  return (
    <form>
      <div style={{ display: 'block', margin: '30px' }}>
        <div>
          <h3>
            <span style={{ display: 'flex', justifyContent: 'center' }} id="ctl00_MainContent_lblFirstTable">
              Перший тиждень
            </span>
          </h3>
          <FirstWeek lessons={firstWeekLessons} isCurrentWeek={isCurrentWeek} nowDay={nowDay} />
          <h3>
            <span style={{ display: 'flex', justifyContent: 'center' }} id="ctl00_MainContent_lblSecondTable">
              Другий тиждень
            </span>
          </h3>
          <div ref={elementRef}>
            <SecondWeek lessons={secondWeekLessons} isCurrentWeek={isCurrentWeek} nowDay={nowDay} />
          </div>
        </div>
      </div>
    </form>
  );
};
 