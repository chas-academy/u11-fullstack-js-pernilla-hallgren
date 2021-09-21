import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
import { Link } from "react-router-dom";

const Home = () => {
  const [allTrainers, setAllTrainers] = useState([]),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("trainers")
      .then((response) => {
        setAllTrainers(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <div>HomePage</div>
      {allTrainers ? (
        allTrainers.map((trainer) => (
          <ul key={trainer.id}>
            <li>{trainer.username}</li>
            <li>{trainer.email}</li>
            <li>{trainer.firstName}</li>
            <li>{trainer.lastName}</li>
            <li>{trainer.avatar}</li>
            <li>{trainer.role}</li>
            <li>{trainer.description}</li>
            <li>{trainer.skills.join(", ")}</li>
          </ul>
        ))
      ) : (
        <div>There are no trainers in database</div>
      )}
    </>
  );
};

export default Home;
