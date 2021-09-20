import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { PATCH } from "../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../shared/components/button_submit";
import { handleFormData } from "../../shared/helpers/formData";

const UpdateUser = () => {
  const location = useLocation();

  const [user, setUser] = useState(location.state.user),
    [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = location.state.id;

    PATCH("admin/users", id, { ...user })
      .then((response) => {
        // console.log(response.data);
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  if (redirect) return <Redirect to="/admin-dashboard" />;

  return (
    <>
      <h1>Update User</h1>

      <form onSubmit={handleSubmit} className="mb-5 mt-4">
        <div className="form-group">
          <label htmlFor="username"></label>

          <input
            className="input-field"
            type="text"
            autoComplete="off"
            // placeholder={user.username}
            defaultValue={user.username}
            onChange={(e) => handleFormData(e, setUser)}
            id="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            className="input-field"
            type="email"
            // placeholder={user.email}
            value={user.email}
            onChange={(e) => handleFormData(e, setUser)}
            id="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role"></label>
          <input
            className="input-field"
            type="text"
            // placeholder={user.role}
            value={user.role}
            onChange={(e) => handleFormData(e, setUser)}
            id="role"
          />
        </div>

        <div className="form-group">
          <div className="form-group mt-5">
            <Row>
              <Col>
                <ButtonSubmit name="Save" id="register-btn" />
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
