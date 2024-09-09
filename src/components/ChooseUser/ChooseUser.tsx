import React, { useEffect, useState } from "react";
import './ChooseUserStyles.css';
import { User } from "../../types/Users";
import usersFromServer from '../../api/users.json';
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserItem } from "../UserItem";

export const ChooseUser: React.FC = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = +(searchParams.get('userId') || 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('userId')) {
      const params = new URLSearchParams(searchParams);
      params.set('userId', '0');
      setSearchParams(params);
      navigate('/lessons?userId=0', { replace: true });
    }
  }, [searchParams, setSearchParams, navigate]);

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('userId', selectedUserId);
    setSearchParams(params);
    navigate(`/lessons?userId=${selectedUserId}`);
  };

  return (
    <div className="custom-select">
      <select
        value={userId}
        className="custom-select-input"
        onChange={handleChangeUser}
      >
        <option value={0}>Загальний Розклад</option>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </select>
    </div>
  );
};
