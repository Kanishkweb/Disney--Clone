import styled from "styled-components"
import ImgSlider from "./ImgSlider"
import Viewers from "./Viewers"
import Recommends from "./Recommends"
import NewDisney from "./NewDisney"
import Originals from "./Originals"
import { useEffect } from "react"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"

import { setMovies } from "../features/movie/movieSlice"
import { selectUserName } from "../features/user/userSlice"
import {db} from "../FirebaseConfig"


const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    console.log("hello");
    const moviesCollection = db.collection("movies");
    moviesCollection.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(recommends);
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [userName]);
    return (
      <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <NewDisney />
        <Originals />
      </Container>
    )
  }

const Container = styled.main`
  position:relative;
  min-height:calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  

  &:after{
    background: url('/images/home-background.png') center center / cover no-repeat fixed; 
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    content:'';
    position:absolute;
    inset:0px;
    opacity:1;
    z-index:-1;
  }

`

  export default Home

