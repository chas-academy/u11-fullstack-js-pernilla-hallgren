import React, { useState } from "react";
import { Star } from "react-bootstrap-icons";

const ReviewStar = ({ onChange }) => {
  const [rating, setRating] = useState(0),
    [hover, setHover] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
    onChange?.(newRating);
  };

  const starStyle = {
    margin: "3px",
    fill: "#FF7580",
  };
  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={(value <= rating).toString()}
          onClick={() => changeRating(value)}
          // className={index <= (hover || rating) ? "on" : "off"}
          // onMouseLeave={() => setHover(rating)}
          // onMouseEnter={() => setHover(index)}
          style={starStyle}
        />
      ))}
    </span>
  );
};
// const [rating, setRating] = useState(0),
//   [hover, setHover] = useState(0);

// const starStyle = {
//   margin: "3px",
//   fill: "#FF7580",
// };

// return (
//   <div className="star-rating">
//     {[...Array(5)].map((star, index) => {
//       index += 1;
//       return (
//         <button
//           style={{
//             backgroundColor: "transparent",
//             border: "none",
//             outline: "none",
//             cursor: "pointer",
//           }}
//           type="button"
//           key={index}
//           className={index <= (hover || rating) ? "on" : "off"}
//           onClick={() => setRating(index)}
//           onMouseEnter={() => setHover(index)}
//           onMouseLeave={() => setHover(rating)}
//         >
//           <Star style={starStyle} />

//           {/* <span className="star">&#9733;</span> */}
//         </button>
//       );
//     })}
//   </div>
// );
// };

export default ReviewStar;
