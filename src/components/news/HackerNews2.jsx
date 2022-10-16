import React from "react";
import HackerHeader from "./HackerHeader";
import HackerFooter from "./HackerFooter";
import HackerNewsRow2 from "./HackerNewsRow2";

const HackerNews2 = (props) => {
  return (
    <>
      컴포넌트2
      <HackerHeader />
      <div>
        <HackerNewsRow2 />
      </div>
      <HackerFooter />
    </>
  );
};

export default HackerNews2;
