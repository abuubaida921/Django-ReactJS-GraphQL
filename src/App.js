import { useQuery, gql } from "@apollo/client";
import React from "react";

const App = () => {
  const{loading,error,data} = useQuery(gql`
  {
    todos{
      id
      title
      date
    }    
  }

    `);
  if(loading) return <h1>Loading Data...</h1>;
  if(error) return <h1>Error Occurred Lading Data...</h1>;
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
