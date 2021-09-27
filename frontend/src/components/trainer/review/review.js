import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import ButtonSubmit from "../../../shared/components/button-submit";
import { useLocation } from "react-router-dom";
import { DELETE, GET, POST } from "../../../shared/services/requests";
import { handleFormData } from "../../../shared/helpers/formData";
import ReviewStar from "../../../shared/components/review-star";
import ErrorMessage from "../../../shared/components/error-message";

const Review = ({ setAuthUser }) => {
  const location = useLocation();

  const [trainer, setTrainer] = useState(location.state.trainer),
    [newReview, setNewReview] = useState({ text: "", rating: Number }),
    [reviews, setReviews] = useState([]),
    [loading, setLoading] = useState(false),
    [loadingReviews, setLoadingReviews] = useState(false),
    [loadingDelete, setLoadingDelete] = useState(false),
    [success, setSuccess] = useState(null),
    [error, setError] = useState(null),
    [errorDelete, setErrorDelete] = useState(null);

  console.log(trainer);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    POST(`trainers/${trainer.id}/reviews`, newReview)
      .then((data) => {
        setReviews((currentState) => [...currentState.concat(data.data)]); // concat return the new array (.push the lenght of the array)
        setLoading(false);
        setNewReview(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });
  };

  useEffect(() => {
    GET(`trainers/${trainer.id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  }, []);

  const deleteReviewHandler = (id) => {
    setLoadingDelete(true);
    DELETE("trainers", id)
      .then((response) => {
        setLoadingDelete(false);
        setSuccess(response.data.msg);
        setReviews((currentState) => [
          ...currentState.filter((review) => review.id !== id),
        ]);
      })
      .catch((error) => {
        setErrorDelete(error.response.data.msg);
        setLoadingDelete(false);
        setSuccess(null);
      });
  };

  const imgCardStyle = {
    border: "none",
    background: "none",
  };

  const textareaStyle = {
    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.25)",
    background: "#5D6475",
    color: "white",
    border: "none",
    marginTop: "10px",
  };

  const btnStyle = {
    borderRadius: "10px",
    border: "0",
    color: "white",
  };

  const log = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col text-center">
            {loading && !error && <p>Review page is loading...</p>}
            {error && <ErrorMessage message={error} />}

            <Card style={imgCardStyle}>
              <h2>Review {trainer.username}</h2>
              <Card.Body>
                <div>
                  <ReviewStar onChange={log} />
                </div>
                <input
                  type="text"
                  id="rating"
                  onChange={(e) => handleFormData(e, setNewReview)}
                />
                Set rating
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
                  </div>
                  <ButtonSubmit name="Send" id="login-btn" />
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row mt-5">
          {reviews ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="col-md justify-content-center mb-1"
              >
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <h2 className="header-two">{review.user.username}</h2>
                    <div className="mb-2">Rating: {review.rating}</div>
                    <div>{review.text}</div>
                    <br />
                    <div>{review.createdAt}</div>
                    {review.user._id ===
                      JSON.parse(localStorage.getItem("user"))?.id && (
                      <button
                        className="btn xsmall-btn"
                        style={btnStyle}
                        onClick={() => deleteReviewHandler(review.id)}
                      >
                        Delete
                      </button>
                    )}
                    <hr />
                  </Card.Body>
                </Card>
                {success && <p>{success}</p>}
              </div>
            ))
          ) : (
            <div>No reviews</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
