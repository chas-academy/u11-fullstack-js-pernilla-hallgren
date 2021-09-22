import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { PATCH } from "../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../shared/components/button_submit";
import { handleFormData } from "../../shared/helpers/formData";
import ErrorMessage from "../../shared/components/error_message";

const EditProfile = () => {
  const location = useLocation();

  const [user, setUser] = useState(location.state.authUser),
    [redirect, setRedirect] = useState(false),
    [error, setError] = useState(null);

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = location.state.id;

    PATCH("auth/profile/edit", id, { ...user })
      .then((response) => {
        console.log(response.data);
        setRedirect(true);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  };

  console.log(user);

  if (redirect) return <Redirect to="/profile" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <h1 className="header-one">Update Profile</h1>
        </div>

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
            <label htmlFor="register-email"></label>
            <input
              className="input-field"
              type="email"
              placeholder="Add Email"
              value={user.email}
              onChange={(e) => handleFormData(e, setUser)}
              id="email"
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
              placeholder="Add Image"
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
              placeholder="Choose Skills"
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

//   return (
//     <>
//       <h1>Update User</h1>

//       <form onSubmit={handleSubmit} className="mb-5 mt-4">
//         <div className="form-group">
//           <label htmlFor="username"></label>

//           <input
//             className="input-field"
//             type="text"
//             autoComplete="off"
//             // placeholder={user.username}
//             value={user.username}
//             onChange={(e) => handleFormData(e, setUser)}
//             id="username"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email"></label>
//           <input
//             className="input-field"
//             type="email"
//             // placeholder={user.email}
//             value={user.email}
//             onChange={(e) => handleFormData(e, setUser)}
//             id="email"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="role"></label>
//           <input
//             className="input-field"
//             type="text"
//             // placeholder={user.role}
//             value={user.role}
//             onChange={(e) => handleFormData(e, setUser)}
//             id="role"
//           />
//         </div>

//         <div className="form-group">
//           <div className="form-group mt-5">
//             <Row>
//               <Col>
//                 <ButtonSubmit name="Save" id="register-btn" />
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

export default EditProfile;
