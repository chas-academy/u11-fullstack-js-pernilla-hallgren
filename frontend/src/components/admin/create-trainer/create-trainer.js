import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { POST } from "../../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../../shared/components/button-submit";
import ErrorMessage from "../../../shared/components/error-message";
import { handleFormData } from "../../../shared/helpers/formData";

const CreateTrainer = () => {
  const [newTrainer, setNewTrainer] = useState({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      image: "",
      description: "",
      skills: "",
    }),
    [error, setError] = useState(null),
    [redirect, setRedirect] = useState(false),
    [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    POST("trainers", newTrainer)
      .then((data) => {
        setLoading(false);
        setRedirect(true);
        setNewTrainer(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });
  };

  if (redirect) return <Redirect to="/home" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div>
          <h1 className="header-one">CREATE NEW TRAINER</h1>
        </div>

        {loading && !error && <p>Create trainer loading...</p>}

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="register-username"></label>

            {error && <ErrorMessage message={error} />}

            <input
              className="input-field-small"
              type="text"
              placeholder="Add Username"
              value={newTrainer.username}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email"></label>
            <input
              className="input-field-small"
              type="email"
              placeholder="Add Email"
              value={newTrainer.email}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-firstname"></label>
            <input
              className="input-field-small"
              type="text"
              placeholder="Add Firstname"
              value={newTrainer.firstName}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-lastname"></label>
            <input
              className="input-field-small"
              type="text"
              placeholder="Add Lastname"
              value={newTrainer.lastName}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="lastName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image"></label>
            <input
              className="input-field-small"
              type="text"
              placeholder="Add Image"
              value={newTrainer.image}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="image"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role"></label>
            <input
              className="input-field-small"
              type="text"
              placeholder="Add Role"
              value={newTrainer.role}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="role"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description"></label>
            <input
              className="input-field-small"
              type="text"
              placeholder="Add Description"
              value={newTrainer.description}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills"></label>
            <input
              className="input-field-small"
              type="text"
              placeholder="Add Skills"
              value={newTrainer.skills}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="skills"
            />
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <ButtonSubmit name="Add Trainer" id="register-btn" />
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTrainer;
