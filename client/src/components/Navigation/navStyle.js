import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    z-index: 2;
	flex-flow: column nowrap;
    background-color: #0D2538;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const StyledBurger = styled.div`
  width: 2rem;
  height: 3rem;
  position: absolute;
  cursor: pointer;
  top: 30px;
  right: 40px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  div {
	width: 3rem;
    height: 0.5rem;
    background-color: ${({ open }) => open ? '#fff' : '#fff'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;


export const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <Link to="/"><li> Home </li></Link>
	  <Link to="/store"><li> Search </li></Link>
	  <Link to="/login"><li> Login </li></Link>
	  <Link to="/register"><li> Register </li></Link>
    </Ul>
  )
}

export const Burger = (props) => {
  const [open, setOpen] = useState(false);
  const { onLogoutClick, authInfo } = props;
  
  return (	
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
	  {
		!authInfo.isAuthenticated ? ( <RightNav open={open}/> ) 
	    : 
		authInfo.isAuthenticated && authInfo.user.role == "admin" ? ( <Ul open={open}>
		  <Link to="/"><li> Home </li></Link>
		  <Link to="/store"><li> Search </li></Link>
		  <Link to="/products"><li> Products Page </li></Link>
		  <Link to="/orders"><li> Orders Pages </li></Link>
		  <Link to="" onClick={onLogoutClick}><li> Logout </li></Link>
		</Ul> )
		:
		authInfo.isAuthenticated ? ( <Ul open={open}>
		  <Link to="/"><li> Home </li></Link>
		  <Link to="/store"><li> Search </li></Link>
		  <Link to="" onClick={onLogoutClick}><li> Logout </li></Link>
		</Ul> )
		:
		( null )
	  }
      
    </>
  )
}


