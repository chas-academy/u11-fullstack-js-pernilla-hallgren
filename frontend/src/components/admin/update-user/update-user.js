import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { PATCH } from "../../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../../shared/components/button-submit";
import { handleFormData } from "../../../shared/helpers/formData";
import ErrorMessage from "../../../shared/components/error-message";

const UpdateUser = () => {
  const location = useLocation();

  const [user, setUser] = useState(location.state.user),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(false),
    [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = location.state.id;
    setLoading(true);
    PATCH("admin/users", id, { ...user })
      .then((response) => {
        setLoading(false);
        setRedirect(true);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
      });
  };

  if (redirect) return <Redirect to="/admin-dashboard" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <h1 className="header-one">UPDATE USER</h1>
        </div>

        {loading && !error && <p>User is being updated...</p>}

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="username"></label>

            <input
              className="input-field"
              type="text"
              autoComplete="off"
              // placeholder={user.username}
              value={user.username}
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
      </div>
    </>
  );
};

export default UpdateUser;
