import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../shared/components/error-message";
import { GET } from "../../shared/services/requests";
import SearchBar from "../trainer/search-bar/searchBar";
import TrainerCard from "../trainer/trainer-card/trainer-card";

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
      {/* <div>
        <h1 className="header-one mb-3 mt-5 text-center">TRAINERS</h1>
      </div> */}

      <SearchBar setIsSearching={setIsSearching} />

      <div className="row">
        {allTrainers &&
          !isSearching &&
          allTrainers.map((trainer) => (
            <Col
              key={trainer.id}
              sm={12}
              md={6}
              lg={3}
              className="justify-content-center"
            >
              <Link
                to={{
                  pathname: "/trainer-profile",
                  state: {
                    trainer,
                  },
                }}
              >
                <TrainerCard
                  image={trainer.image}
                  name={trainer.username.toUpperCase()}
                />
              </Link>
            </Col>
          ))}
      </div>
    </>
  );
};

export default Home;
