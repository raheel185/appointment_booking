import React from "react";
import Main from "./Main";

function Layout({ children }) {
  return (
    <Main>
      {children}
    </Main>
  );
}

export default Layout;
