import { useState, useEffect } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => res.json()).then(setUsers);
  }, []);

  const toggleBan = async (userId, currentBanStatus) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ userId, isBanned: !currentBanStatus })
    });
    // refresh user list
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {users.map(user => (
        <div key={user.id}>
          <span>{user.username}</span>
          <button onClick={() => toggleBan(user.id, user.isBanned)}>
            {user.isBanned ? "Unban" : "Ban"}
          </button>
          {/* add inputs for edit username/password */}
        </div>
      ))}
    </div>
  );
}
