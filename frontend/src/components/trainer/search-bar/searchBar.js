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

  // const doSearch = () => {
  //   setLoading(true);
  //   GET(`/trainers/search?skills=${query}`)
  //     .then((response) => {
  //       console.log(response);
  //       setLoading(false);
  //       setSearchResult(response.data.searchResult);
  //       setIsSearching(true);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       setError(error.response.data.msg);
  //       setSearchResult([]);
  //     });
  //   setError(null);
  // };

  // useEffect(() => {
  //   doSearch();
  // }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    GET(`/trainers/search?skills=${query}`)
      .then((response) => {
        console.log(response);
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

  console.log(searchResult);

  return (
    <>
      <div className="text-center mt-4">
        {loading && !error && <p>Searching...</p>}

        <input
          className="input-field"
          type="text"
          placeholder="Search by skill"
          // value={searchResult}
          onChange={(e) => setQuery(e.target.value)}
          id={query}
        />

        <button onClick={handleSearch} style={{ border: "none" }}>
          <Search />
        </button>

        {error && <ErrorMessage message={error} />}
        <div className="row">
          {/* {searchResult && (
            <ul>
              {searchResult.map((trainer) => (
                <li key={trainer.id}>{trainer.username}</li>
              ))}
            </ul>
          )} */}
          {/* {searchResult.length && (
            <div>
              <h1 className="header-one mb-5 mt-2 text-center">
                Search Result
              </h1>
            </div>
          )} */}

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
