import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './components/NotFoundPage';
import { Schedule } from './components/Schedule';

export const Root = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/lessons?user=all" replace />} />
    <Route path="/lessons" element={<App />}>
      <Route index element={<Schedule />} />
    </Route>
    <Route path="/notfound" element={<NotFoundPage />} />
    <Route path="*" element={<Navigate to="/notfound" />} />
  </Routes>
);
