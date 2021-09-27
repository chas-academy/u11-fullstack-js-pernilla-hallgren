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

      <SearchBar setIsSearching={setIsSearching} />
      <div>
        <h1 className="header-one mb-5 mt-2 text-center">Trainers</h1>
      </div>
      <div className="row">
        {allTrainers && !isSearching ? (
          allTrainers.map((trainer) => (
            <Col
              key={trainer.id}
              sm={12}
              md={6}
              lg={3}
              className="col justify-content-center m-3"
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
          ))
        ) : (
          <div>There are no trainers in database</div>
        )}
      </div>
    </>
  );
};

export default Home;
