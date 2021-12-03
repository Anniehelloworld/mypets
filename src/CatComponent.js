import React, { useState, useEffect } from "react";

const CatComponent = () => {
  const [data, setData] = useState([]);
  const url =
    "http://5c92dbfae7b1a00014078e61.mockapi.io/owners";
  async function fetchData() {
    const res = await fetch(url);
    res.json().then((res) => setData(res.filter((a) => a.pets)));
  }
  useEffect(() => {
    fetchData();
  }, []);

  const gennerateList = (gender, type) =>
    [].concat
      .apply(
        [],
        data
          .filter((p) => p.pets)
          .filter((g) => g.gender === gender)
          .map((p) => p.pets.filter((t) => t.type === type))
      )
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  const femaleCatList = () => (
    <ul>
      {gennerateList("Female", "Cat").map((s) => (
        <li key={s.name + 1}> {s.name}</li>
      ))}
    </ul>
  );
  const maleCatList = () => (
    <ul>
      {gennerateList("Male", "Cat").map((s) => (
        <li key={s.name + 1}> {s.name}</li>
      ))}
    </ul>
  );
  return (
    <div>
      {" "}
      <div> Female </div>
      {femaleCatList()}
      <div> Male </div>
      {maleCatList()}
    </div>
  );
};

export default CatComponent;