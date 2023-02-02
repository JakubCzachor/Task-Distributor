import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const TitleLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const Title = styled.h3`
  color: #fff;
  margin: 0;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right:20px;
  &.active {
    color: #fff;
  }
`;


const Header = () => {
    const [activeLink, setActiveLink] = useState("");
    return (
        <HeaderContainer>
            <TitleLink to="/">
                <Title>Example Title</Title>
            </TitleLink>
            <nav>
                <NavLink
                    to="/login"
                    onClick={() => setActiveLink("login")}
                    className={activeLink === "login" ? "active" : ""}
                >
                    Login
                </NavLink>
                <NavLink
                    to="/register"
                    onClick={() => setActiveLink("register")}
                    className={activeLink === "register" ? "active" : ""}
                >
                    Register
                </NavLink>
            </nav>
        </HeaderContainer>
    );
};

export default Header;