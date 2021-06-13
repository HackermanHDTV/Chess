import React from "react";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <div className='dashboard'>
      <div>
        {user ? (
          <p> {`Hi, ${user.username}`}! </p>
        ) : (
          <p>You are not Logged in</p>
        )}
      </div>
      <div className='prompt'>
        Play a game? <Link to='/login'>Play Online</Link>
      </div>
    </div>
  );
}
