import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { POST } from "../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../shared/components/button_submit";
import ErrorMessage from "../../shared/components/error_message";
import { handleFormData } from "../../shared/helpers/formData";
// import skills from "../../shared/helpers/skills";

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

  console.log(newTrainer);

  if (redirect) return <Redirect to="/home" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <h1 className="header-one">Create New Trainer</h1>
        </div>

        {loading && !error && <p>Create trainer loading...</p>}
        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="register-username"></label>

            <input
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
              className="input-field"
              type="text"
              placeholder="Choose Skills"
              value={newTrainer.skills}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="skills"
            />

            {/* <select
              className="input-field"
              // type="text"
              // multiple={true}
              // placeholder="Choose Skills"
              options={skills}
              value={newTrainer.skills}
              onChange={(e) => handleFormData(e, setNewTrainer)}
              id="skills"
            >
              <option disabled={true} value="">
                Choose Skills
              </option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select> */}
          </div>

          <div className="form-group">
            <div className="form-group mt-5">
              <Row>
                <Col>
                  <ButtonSubmit name="Add Trainer" id="register-btn" />
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTrainer;
