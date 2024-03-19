import React from "react";
import ColumnWrapper from "./wrappers/ColumnWrapper";

const SideMenu = () => {
  return (
    <nav>
      <ColumnWrapper
        align="items-center"
        className="absolute left-0 top-0 mb-2"
      >
        <a href="#BestServer">BestServer</a>
        <a href="#BeHereOrBeGone">BeHereOrBeGone</a>
        <a href="#HervannanLarppaajat">HervannanLarppaajat</a>
        <a href="#Iltapäiväkerho">Iltapäiväkerho</a>
      </ColumnWrapper>
    </nav>
  );
};

export default SideMenu;
