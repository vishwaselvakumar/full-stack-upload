import React, { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", image: null });

  const fetchUsers = async () => {
    const res = await api.get("/");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("image", form.image);

    await api.post("/add", formData);
    setForm({ name: "", age: "", image: null });
    fetchUsers();
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("image", form.image);

    await api.put(`/${id}`, formData);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button type="submit">Add User</button>
      </form>

      <div>
        {users.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            {user.image && (
              <img
                src={`http://localhost:5000/uploads/${user.image}`}
                alt={user.name}
                style={{ width: "100px" }}
              />
            )}
            <button onClick={() => handleUpdate(user._id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
