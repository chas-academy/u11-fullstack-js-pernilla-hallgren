import React, { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

const ReviewStar = () => {
  const [rating, setRating] = useState(null),
    [hover, setHover] = useState(null);

  const starStyle = {
    margin: "3px",
    cursor: "pointer",
    transition: "color 200ms",
  };
  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              style={{ display: "none" }}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <StarFill
              style={starStyle}
              size={20}
              color={ratingValue <= (hover || rating) ? "#FF7580" : "#5D6475"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </>
    // <span>
    //   {[1, 2, 3, 4, 5].map((value) => (
    //     <Star
    //       key={value}
    //       filled={(value <= rating).toString()}
    //       onClick={() => changeRating(value)}
    //       // className={index <= (hover || rating) ? "on" : "off"}
    //       // onMouseLeave={() => setHover(rating)}
    //       // onMouseEnter={() => setHover(index)}
    //       style={starStyle}
    //     />
    //   ))}
    // </span>
  );
};

export default ReviewStar;
