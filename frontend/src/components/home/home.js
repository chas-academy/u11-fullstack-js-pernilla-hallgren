import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
import SearchBar from "../search-bar/searchBar";

const Home = () => {
  const [allTrainers, setAllTrainers] = useState([]),
    [isSearching, setIsSearching] = useState(false),
    [error, setError] = useState(null);

  useEffect(() => {
    setIsSearching(false);
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

      <SearchBar setIsSearching={setIsSearching} />
      {allTrainers && !isSearching ? (
        allTrainers.map((trainer) => (
          <ul key={trainer.id}>
            <li>{trainer.username}</li>
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
