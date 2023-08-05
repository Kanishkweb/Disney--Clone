import React from 'react'
import styled from 'styled-components'
import { selectUserName, setUserLoginDetails, selectUserPhoto } from '../features/user/userSlice'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auth, provider } from "../FirebaseConfig"
import { signInWithPopup } from '@firebase/auth'
// import { useState } from 'react'
const Header = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);



  const handleAuth = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      setUser(result.user)
    }).catch((err) => {
      alert(err.message);
    });

  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      })
    )
  }
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt='Disney+' />
      </Logo>

      {
        !userName ?
          (<Login onClick={handleAuth}>Login</Login>) :
          (<>
            <NavMenu>
              <a href='/home'>
                <img src='/images/home-icon.svg' alt='HOME' />
                <span>HOME</span>
              </a>
              <a href='/home'>
                <img src='/images/search-icon.svg' alt='HOME' />
                <span>SEARCH</span>
              </a>
              <a href='/home'>
                <img src='/images/watchlist-icon.svg' alt='HOME' />
                <span>WATCHLIST</span>
              </a>
              <a href='/home'>
                <img src='/images/original-icon.svg' alt='HOME' />
                <span>ORIGINALS</span>
              </a>
              <a href='/home'>
                <img src='/images/movie-icon.svg' alt='HOME' />
                <span>MOVIES</span>
              </a>
              <a href='/home'>
                <img src='/images/series-icon.svg' alt='HOME' />
                <span>SERIES</span>
              </a>
            </NavMenu>
            <UserImg src={userPhoto} alt="userimg"/>
          </>)
      }
      <NavMenu>
        <a href='/home'>
          <img src='/images/home-icon.svg' alt='HOME' />
          <span>HOME</span>
        </a>
        <a href='/home'>
          <img src='/images/search-icon.svg' alt='HOME' />
          <span>SEARCH</span>
        </a>
        <a href='/home'>
          <img src='/images/watchlist-icon.svg' alt='HOME' />
          <span>WATCHLIST</span>
        </a>
        <a href='/home'>
          <img src='/images/original-icon.svg' alt='HOME' />
          <span>ORIGINALS</span>
        </a>
        <a href='/home'>
          <img src='/images/movie-icon.svg' alt='HOME' />
          <span>MOVIES</span>
        </a>
        <a href='/home'>
          <img src='/images/series-icon.svg' alt='HOME' />
          <span>SERIES</span>
        </a>
      </NavMenu>
      <Login onClick={handleAuth}>Login</Login>
    </Nav>
  )
}
const Nav = styled.nav`
    position: fixed;
    top:0;
    left:0;
    right:0;
    height:70px;
    background-color: #090b13;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 36px;
    letter-spacing:16px;
    z-index: 3;
`
const Logo = styled.nav`
    padding:0;
    width:80px;
    margin-top:4px;
    max-height:70px;
    font-size:0;
    display:inline-block;

    img{
        display:block;
        width:100%;
    }

`
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0px 26px;
    position: relative; /* Added this line to make sure the ::before is positioned correctly */

    img {
      height: 20px;
      min-width: 20px;
      z-index: auto;
      width: 20px;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08%;
      padding: 2px 0px;
      white-space: nowrap;
    }

    /* ::before pseudo-element to create the underline */
    &::before {
      content: '';
      background-color: rgb(249, 249, 249);
      border-radius: 4px; /* Adjust the border-radius to match your design */
      bottom: -6px;
      height: 2px;
      opacity: 0;
      position: absolute;
      right: 0;
      left: 0;
      /* transform-origin: left center; */
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      visibility: hidden;
      width: 0;
    }
  }

  /* Hover effect */
  a:hover::before {
    transform: scaleX(1);
    visibility: visible;
    opacity: 1;
      width: 100%; /* Add this line to expand the underline to the full width */
  }
`;

const Login = styled.a`
    background-color: black;
    padding: 8px 16px;
    letter-spacing:1.5px;
    border:2px solid white;
    border-radius:4px;
    cursor: pointer;
    transition: all .2s ease 0s;

    &:hover{
        background-color: white;
        color:black
    }
`;
const UserImg = styled.img`
  height:100%;
`;

export default Header;