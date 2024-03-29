import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import ButtonSubmit from "../../../shared/components/button-submit";
import { useLocation } from "react-router-dom";
import { DELETE, GET, POST } from "../../../shared/services/requests";
import { handleFormData } from "../../../shared/helpers/formData";
import ErrorMessage from "../../../shared/components/error-message";
import { StarFill } from "react-bootstrap-icons";

const Review = () => {
  const location = useLocation();

  const [trainer, setTrainer] = useState(location.state.trainer),
    [newReview, setNewReview] = useState({ text: "", rating: Number }),
    [reviews, setReviews] = useState([]),
    [rating, setRating] = useState(null),
    [hover, setHover] = useState(null),
    [loading, setLoading] = useState(false),
    [success, setSuccess] = useState(null),
    [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    POST(`trainers/${trainer.id}/reviews`, newReview)
      .then((data) => {
        setReviews((currentState) => [...currentState.concat(data.data)]);
        setLoading(false);
        setNewReview(data.data);
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
  }, [trainer.id]);

  const deleteReviewHandler = (id) => {
    DELETE("trainers", id)
      .then((response) => {
        setSuccess(response.data.msg);
        setReviews((currentState) => [
          ...currentState.filter((review) => review.id !== id),
        ]);
      })
      .catch((error) => {
        setError(error.response.data.msg);

        setSuccess(null);
      });
  };

  const mapOverNumber = (num, element) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(element);
    }
    return arr;
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
    width: "5rem",
    marginTop: "10px",
  };

  const starStyle = {
    margin: "3px",
    cursor: "pointer",
    transition: "color 200ms",
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col text-center">
            {loading && !error && <p>Review page is loading...</p>}
            {error && <ErrorMessage message={error} />}

            <Card style={imgCardStyle}>
              <h1 className="header-one">REVIEW {trainer.username}</h1>
              <Card.Body>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={`${trainer.id}_${i}`}>
                      <input
                        style={{ display: "none" }}
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        id="rating"
                        onChange={(e) => handleFormData(e, setNewReview)}
                        onClick={() => setRating(ratingValue)}
                      />
                      <StarFill
                        style={starStyle}
                        size={20}
                        color={
                          ratingValue <= (hover || rating)
                            ? "#FF7580"
                            : "#5D6475"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
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
                <Card style={{ border: "none", minWidth: "20rem" }}>
                  <Card.Body>
                    <h3 className="header-three">
                      {review.user.username.toUpperCase()}
                    </h3>
                    <div className="mb-2">
                      {mapOverNumber(
                        review.rating,
                        <StarFill
                          style={{ ...starStyle, cursor: "auto" }}
                          size={15}
                          color={"#FF7580"}
                        />
                      )}
                    </div>
                    <p style={{ fontStyle: "italic", fontWeight: "300" }}>
                      {review.text}
                    </p>
                    <br />
                    <div style={{ fontWeight: "300" }}>
                      {moment(review.createdAt).format("YYYY-MM-DD")}
                    </div>
                    {review.user._id ===
                      JSON.parse(localStorage.getItem("user"))?.id && (
                      <button
                        className="xsmall-btn"
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
