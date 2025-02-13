"use client";

import { Button } from "@radix-ui/themes";
import { toggleUserAdmin } from "../actions/action";
import { useState } from "react";

interface UserUpdaterButtonProps {
  id: number;
}

const UserUpdaterButton = ({ id }: UserUpdaterButtonProps) => {
  const [actionFlying, setActionFlying] = useState(false);
  const handleClick = async () => {
    setActionFlying(true);
    await toggleUserAdmin(id);
    setActionFlying(false);
  };
  return (
    <Button disabled={actionFlying} onClick={handleClick}>
      Update
    </Button>
  );
};

export default UserUpdaterButton;
