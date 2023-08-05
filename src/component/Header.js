import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUserName, setUserLoginDetails, selectUserPhoto, setSignOutState } from '../features/user/userSlice';
import { auth, provider } from '../FirebaseConfig';
import { signInWithPopup } from '@firebase/auth';
import { useEffect } from 'react';

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector((state) => state.user);
  const userPhoto = useSelector(selectUserPhoto);

  const handleAuth = async () => {
    try {
      if (!auth.currentUser) {
        // User is not logged in, so we attempt to sign them in
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        setUser(result.user);
        history.push('/home');
      } else {
        // User is already logged in, so we sign them out
        await auth.signOut();
        dispatch(setSignOutState());
        history.push('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    // Redirect user to /home if they are logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/home');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth.currentUser]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      {!auth.currentUser ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/home">
              <img src="/images/search-icon.svg" alt="HOME" />
              <span>SEARCH</span>
            </a>
            <a href="/home">
              <img src="/images/watchlist-icon.svg" alt="HOME" />
              <span>WATCHLIST</span>
            </a>
            <a href="/home">
              <img src="/images/original-icon.svg" alt="HOME" />
              <span>ORIGINALS</span>
            </a>
            <a href="/home">
              <img src="/images/movie-icon.svg" alt="HOME" />
              <span>MOVIES</span>
            </a>
            <a href="/home">
              <img src="/images/series-icon.svg" alt="HOME" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          {/* <SignOut>
            <DropDown>
            <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut> */}
          <Login onClick={handleAuth}>Logout</Login>
          <UserImg src={userPhoto} alt="userimg" />
        </>
      )}
    </Nav>
  );
};
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
    padding: 0 25px;
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
  border-radius:50%;
  padding:8px;
  margin:5px 0px 5px 5px;
`;

const SignOut = styled.div`
  position:relative;
  height:48px;
  width:48px;
  display:flex;
  cursor:pointer;
  align-items:center;
  justify-content:center;

  ${UserImg}{
    border-radius:50%;
    width:100%;
  }


`;

const DropDown = styled.div`
  position:absolute;
  top:48px;
  right:0px;
  background:rgb(19,19,19);
  border:2px solid rgba(151,151,151,0.34);
  border-radius:4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding:10px;
  font-size:14px;
  letter-spacing: 3px;
  width:100px;
  opacity: 0;

  &:hover{
    opacity:1;
      transition-duration:1s;
  }
  

`;
export default Header;