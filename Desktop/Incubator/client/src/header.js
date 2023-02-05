import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: relative;
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
  margin-right: 20px;
  &.active {
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  display: block;
  padding: 10px;
  &:hover {
    background-color: #ddd;
  }
`;
const DropdownToggle = styled.div`
  color: #fff;
  cursor: pointer;
    
`;

const DropdownMenu = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;
const Dropdown = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DropdownItem = styled.li`
  margin: 0px;
`;


const Header = () => {
    const [activeLink, setActiveLink] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <HeaderContainer>
            <TitleLink to="/">
                <Title>Example Title</Title>
            </TitleLink>
            <DropdownToggle onClick={() => setShowDropdown(!showDropdown)}>
                <span>&#9776;</span>
            </DropdownToggle>
            {showDropdown && (
                <DropdownMenu>
                    <Dropdown>
                        <DropdownItem>
                            <StyledLink to="/search">Search/Claim New Tasks</StyledLink>
                        </DropdownItem>
                        <DropdownItem>
                            <StyledLink to="/AddTask">Add/Submit Tasks</StyledLink>
                        </DropdownItem>
                        <DropdownItem>
                            <StyledLink to="/Submit">Claimed Tasks</StyledLink>
                        </DropdownItem>
                        <DropdownItem>
                            <StyledLink to="/Tasks">My Requested Tasks</StyledLink>
                        </DropdownItem>
                        <DropdownItem>
                            <StyledLink to="/Complete">My Completed Tasks</StyledLink>
                        </DropdownItem>

                    </Dropdown>

                </DropdownMenu>
            )}

            <nav>
                <NavLink
                    to="/home"
                    onClick={() => setActiveLink("home")}
                    className={activeLink === "home" ? "active" : ""}
                >
                    Home
                </NavLink>
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
