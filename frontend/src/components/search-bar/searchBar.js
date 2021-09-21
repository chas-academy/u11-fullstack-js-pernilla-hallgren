import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { GET } from "../../shared/services/requests";

const SearchBar = ({ setIsSearching }) => {
  const [query, setQuery] = useState(""),
    [searchResult, setSearchResult] = useState([]),
    [error, setError] = useState(null),
    [redirect, setRedirect] = useState(false),
    [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    GET(`/trainers/search?skills=${query}`)
      .then((response) => {
        setQuery(response.data);
        setSearchResult(response.data.searchResult);
        setIsSearching(true);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error.response);
      });
  };

  return (
    <>
      <div className="text-center mt-4">
        <input
          className="input-field"
          type="text"
          placeholder="Search"
          // value={query}
          onChange={(e) => setQuery(e.target.value)}
          id={query}
        />
        <button onClick={handleSearch}>
          <Search />
        </button>
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
