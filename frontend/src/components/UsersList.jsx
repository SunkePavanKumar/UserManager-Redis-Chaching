import React, { useState, useEffect } from "react";
import axios from "axios";

function UsersList({ formSubmitted }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/lists"
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching users.");
        setLoading(false);
      }
    }
    fetchUsers();
  }, [formSubmitted]);

  return (
    <div>
      {loading ? (
        <p>Loading users...</p> // Show loading indicator
      ) : error ? (
        <p className="text-red-500">{error}</p> // Show error message
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2 p-4 border rounded-md shadow-sm">
              <p className="font-semibold">{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersList;
