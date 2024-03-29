import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { PATCH } from "../../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../../shared/components/button-submit";
import { handleFormData } from "../../../shared/helpers/formData";
import ErrorMessage from "../../../shared/components/error-message";

const EditProfile = () => {
  const location = useLocation();

  const [user, setUser] = useState(location.state.authUser),
    [redirect, setRedirect] = useState(false),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = location.state.id;

    PATCH("auth/profile/edit", id, { ...user })
      .then((response) => {
        setLoading(true);
        setRedirect(true);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
      });
  };

  if (redirect) return <Redirect to="/profile" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-2 mt-5">
          <h1 className="header-one">UPDATE PROFILE</h1>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading && !error && <p>Your profile is beeing updated...</p>}

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="register-username"></label>

            {error && <ErrorMessage message={error} />}

            <input
              className="input-field"
              type="text"
              placeholder="Add Username"
              value={user.username}
              onChange={(e) => handleFormData(e, setUser)}
              id="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-firstname"></label>
            <input
              className="input-field"
              type="text"
              placeholder="Add Firstname"
              value={user.firstName}
              onChange={(e) => handleFormData(e, setUser)}
              id="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-lastname"></label>
            <input
              className="input-field"
              type="text"
              placeholder="Add Lastname"
              value={user.lastName}
              onChange={(e) => handleFormData(e, setUser)}
              id="lastName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image"></label>
            <input
              className="input-field"
              type="text"
              placeholder="Add Image Url"
              value={user.image}
              onChange={(e) => handleFormData(e, setUser)}
              id="image"
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills"></label>
            <input
              className="input-field"
              type="text"
              placeholder="Add Interests"
              value={user.skills}
              onChange={(e) => handleFormData(e, setUser)}
              id="skills"
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

export default EditProfile;
