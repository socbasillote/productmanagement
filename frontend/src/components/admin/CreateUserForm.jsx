import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/admin/adminUserSlice";

function CreateUserForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(form));

    setForm({
      name: "",
      email: "",
      password: "",
      role: "editor",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="border p-4 mb-6">
        <h2 className="font-bold mb-2">Create User</h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-2"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="border p-2 w-full mb-2"
          value={form.role}
          onChange={handleChange}
        >
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2">Create</button>
      </form>
    </div>
  );
}

export default CreateUserForm;
