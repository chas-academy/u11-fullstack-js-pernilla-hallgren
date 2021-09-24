import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../shared/components/error_message";
import { GET } from "../../shared/services/requests";
import SearchBar from "../search-bar/searchBar";

const Home = () => {
  const [allTrainers, setAllTrainers] = useState([]),
    [isSearching, setIsSearching] = useState(false),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setIsSearching(false);
    GET("trainers")
      .then((response) => {
        setAllTrainers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
      });
  }, []);

  console.log(allTrainers);

  return (
    <>
      {error && <ErrorMessage message={error} />}

      {loading && !error && <p>Page is loading...</p>}

      <SearchBar setIsSearching={setIsSearching} />
      {allTrainers && !isSearching ? (
        allTrainers.map((trainer) => (
          <ul key={trainer.id}>
            <Link
              to={{
                pathname: "/trainer-profile",
                state: {
                  trainer,
                },
              }}
              //   pathname: "/trainer-profile",
              //   state: {
              //     trainer: {
              //       username: trainer.username,
              //       firstname: trainer.firstName,
              //       lastname: trainer.lastName,
              //       description: trainer.description,
              //       image: trainer.image,
              //       skills: trainer.skills,
              //     },
              //     id: trainer.id,
              //   },
              // }}
            >
              <li>{trainer.username}</li>
            </Link>
            <li>{trainer.email}</li>
            <li>{trainer.firstName}</li>
            <li>{trainer.lastName}</li>
            <li>{trainer.image}</li>
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
