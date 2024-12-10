import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPresentation() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handlePresentation = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/presentation/show/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setValues(result.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUsers();
    handlePresentation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/presentation/edit/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      if (result.success) {
        navigate("/view");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid mt-5 form">
      <h3>Sənəd üzərində düzəliş</h3>
      <div className="row d-flex justify-content-center my-5">
        <div className="col-5 border rounded">
          <form
            method="POST"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="w-100 p-3 d-flex flex-column gap-4"
          >
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="sender">Göndərən:</label>
              <select
                className="form-control"
                id="sender"
                name="sender"
                onChange={(e) =>
                  setValues({ ...values, sender: e.target.value })
                }
                value={values.sender}
              >
                <option value="">Göndərən şəxsi seçin</option>
                {users?.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="sender">Alan:</label>
              <select
                className="form-control"
                id="reciever"
                name="receiver"
                onChange={(e) =>
                  setValues({ ...values, receiver: e.target.value })
                }
                value={values.receiver}
              >
                <option value="">Alan şəxsi seçin</option>
                {users?.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group d-flex flex-column gap-2 align-items-start">
              <label htmlFor="title">Sənədin adı:</label>
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
              <label htmlFor="description">Əsas Məzmun:</label>
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
            <button type="submit" className="btn btn-primary mt-5">
              Dəyişdir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPresentation;
