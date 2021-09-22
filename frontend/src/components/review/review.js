import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import ButtonSubmit from "../../shared/components/button_submit";
import { Redirect, useLocation } from "react-router-dom";
import { GET, POST } from "../../shared/services/requests";
import { handleFormData } from "../../shared/helpers/formData";
// import ReviewStar from "../../shared/components/review_star";

const Review = () => {
  const location = useLocation();
  const id = location.state.id;
  console.log(id);
  const [trainer, setTrainer] = useState(location.state.trainer),
    [newReview, setNewReview] = useState({ text: "", rating: Number }),
    [reviews, setReviews] = useState([]),
    [redirect, setRedirect] = useState(false),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(null);

  console.log(trainer);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    POST(`trainers/${id}/reviews`, newReview)
      .then((data) => {
        setLoading(false);
        setRedirect(true);
        setNewReview(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });
  };

  useEffect(() => {
    GET(`trainers/${id}`)
      .then((response) => {
        console.log(response);
        setReviews(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error.response);
      });
  }, []);

  console.log(reviews);

  const imgCardStyle = {
    border: "none",
    background: "none",
    // boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.25)'
  };

  const textareaStyle = {
    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.25)",
    background: "#5D6475",
    color: "white",
    border: "none",
    marginTop: "10px",
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col text-center">
            <Card style={imgCardStyle}>
              <h2>Review {trainer.username}</h2>
              <Card.Body>
                <div>{/* <ReviewStar /> */}</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="10"
                      placeholder="Write a review"
                      style={textareaStyle}
                      id="text"
                      onChange={(e) => handleFormData(e, setNewReview)}
                    ></textarea>
                    <input
                      type="text"
                      id="rating"
                      onChange={(e) => handleFormData(e, setNewReview)}
                    />
                    Set rating
                  </div>
                  <ButtonSubmit name="Send" id="login-btn" />
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
        {reviews ? (
          reviews.map((review) => (
            <div key={review.id}>
              {review.text} {review.user.username}
            </div>
          ))
        ) : (
          <div>No reviews</div>
        )}
        <div className="row mt-5">
          <div className="col-md justify-content-center mb-1">
            <Card style={imgCardStyle}>
              <Card.Body>
                <h2 className="header-two">Rebecca</h2>
                <div className="mb-2">{/* <ReviewStar /> */}</div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eligendi quibusdam enim voluptatibus consequuntur aut eum.
                  Ratione sed tempore vel porro ut nostrum molestiae! Numquam
                  repudiandae dolor nisi deleniti incidunt repellendus?
                </div>
                <br />
                <div>2022-05-04</div>
                <hr />
              </Card.Body>
            </Card>
          </div>

          <div className="col-md justify-content-center mb-1">
            <Card style={imgCardStyle}>
              <Card.Body>
                <h2 className="header-two">Magnus</h2>
                <div className="mb-2">{/* <ReviewStar /> */}</div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eligendi quibusdam enim voluptatibus consequuntur aut eum.
                  Ratione sed tempore vel porro ut nostrum molestiae! Numquam
                  repudiandae dolor nisi deleniti incidunt repellendus?
                </div>
                <br />
                <div>2022-05-04</div>
                <hr />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
