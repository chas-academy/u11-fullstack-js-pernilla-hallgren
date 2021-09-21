import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { GET } from "../../shared/services/requests";

const SearchBar = ({ setIsSearching }) => {
  const [query, setQuery] = useState(""),
    [searchResult, setSearchResult] = useState([]),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query);
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
        console.log(error.response);
      });
  };
  // console.log(query);
  // console.log(searchResult);

  return (
    <>
      <div className="text-center mt-4">
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
