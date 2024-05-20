import axios from "axios";
import { useState } from "react";
import UsersList from "./UsersList";

function UsersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setFormSubmitted(true);
    try {
      const data = {
        name: name,
        email: email,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/users/create",
        data
      );

      console.log("Data sent successfully:", response.data);
      setName("");
      setEmail("");
      setFormSubmitted(false);
    } catch (error) {
      console.error("Error sending data:", error);
      setError("An error occurred while submitting the form.");
      setFormSubmitted(false);
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your name
          </label>
          <input
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="pavan kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="pavan@gmail.com"
            required=""
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {formSubmitted ? "Submitting..." : "Submit"}
        </button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </form>
      <UsersList formSubmitted={formSubmitted} />
    </>
  );
}

export default UsersForm;
