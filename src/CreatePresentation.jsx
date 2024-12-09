import React, { useCallback, useEffect, useState } from "react";

function CreatePresentation() {
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    title: "",
    sender: "",
    receiver: "",
    description: "",
  });
  const handleUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setUsers(result.data || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/presentation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid mt-5">
      <h3>Create new Presentation</h3>
      <div className="row d-flex justify-content-center my-5">
        <div className="col-5 border">
          <form
            method="POST"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="w-100 p-3 d-flex flex-column gap-4"
          >
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="sender">Sender:</label>
              <select
                className="form-control"
                id="sender"
                name="sender"
                onChange={(e) =>
                  setValues({ ...values, sender: e.target.value })
                }
              >
                <option value="">Choose sender</option>
                {users?.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="sender">Receiver:</label>
              <select
                className="form-control"
                id="reciever"
                name="receiver"
                onChange={(e) =>
                  setValues({ ...values, receiver: e.target.value })
                }
              >
                <option value="">Choose receiver</option>
                {users?.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title..."
                name="title"
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                value={values.title}
              />
            </div>
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="description">Content:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                value={values.description}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePresentation;
