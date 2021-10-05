import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { GET } from "../../../shared/services/requests";
import ErrorMessage from "../../../shared/components/error-message";
import TrainerCard from "../trainer-card/trainer-card";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchBar = ({ setIsSearching }) => {
  const [query, setQuery] = useState(""),
    [searchResult, setSearchResult] = useState([]),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    GET(`/trainers/search?skills=${query}`)
      .then((response) => {
        setLoading(false);
        setSearchResult(response.data.searchResult);
        setIsSearching(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
        setSearchResult([]);
      });
    setError(null);
    setQuery("");
  };

  return (
    <>
      <div className="text-center mt-4">
        {loading && !error && <p>Searching...</p>}
        <form onSubmit={handleSearch}>
          <input
            className="input-field"
            type="text"
            placeholder="Search by skill"
            onChange={(e) => setQuery(e.target.value)}
            id={query}
          />

          <button style={{ border: "none" }} name="search btn">
            <Search />
          </button>
        </form>

        {error && <ErrorMessage message={error} />}
        <div className="row">
          {searchResult.length && (
            <div className="row">
              {searchResult.map((trainer) => (
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
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
