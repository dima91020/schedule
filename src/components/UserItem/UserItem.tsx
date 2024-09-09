import React from "react";
import { User } from "../../types/Users";

type Props = {
  user: User;
}

export const UserItem: React.FC<Props> = ({ user }) => {
  const { id, name, surname } = user;

  return (
    <option value={id}>
      {name} {surname}
    </option>
  );
};
