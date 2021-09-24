import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { GET } from "../../../shared/services/requests";
import ErrorMessage from "../../../shared/components/error_message";

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
  };

  return (
    <>
      <div className="text-center mt-4">
        {loading && !error && <p>Searching...</p>}

        <input
          className="input-field"
          type="text"
          placeholder="Search"
          // value={searchResult}
          onChange={(e) => setQuery(e.target.value)}
          id={query}
        />

        <button onClick={handleSearch} style={{ border: "none" }}>
          <Search />
        </button>

        {error && <ErrorMessage message={error} />}

        {searchResult && (
          <ul>
            {searchResult.map((trainer) => (
              <li key={trainer.id}>{trainer.username}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
