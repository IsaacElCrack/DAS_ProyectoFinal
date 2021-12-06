import React, { useState, useEffect } from "react";
const API = process.env.REACT_APP_API;

export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editing) {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: pass }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: pass }),
      });

      setEditing(false);
      setId("");
    }

    await getUsers();

    setEmail("");
    setName("");
    setPass("");
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const userResponse = window.confirm("¿Eliminar este dato?");
    if (userResponse) {
      await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/user/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(data._id);

    setName(data.name);
    setPass(data.password);
    setEmail(data.email);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="name"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>password</th>
              <th>creations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
