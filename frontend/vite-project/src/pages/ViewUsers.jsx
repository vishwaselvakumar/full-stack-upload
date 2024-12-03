import React, { useState, useEffect } from "react";
import api from "../services/api";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            {user.image && (
              <img
                src={`http://localhost:5000/uploads/${user.image}`}
                alt={user.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;
