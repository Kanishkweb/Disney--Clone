import styled from "styled-components"
import ImgSlider from "./ImgSlider"
import Viewers from "./Viewers"
import Recommends from "./Recommends"
import NewDisney from "./NewDisney"
import Originals from "./Originals"
import { useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"

import { setMovies } from "../features/movie/movieSlice"
import { selectUserName } from "../features/user/userSlice"
import { db } from "../FirebaseConfig"
import { collection, getDocs,onSnapshot } from "firebase/firestore";
import Trending from "./Trending"




const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);


  useEffect(() => {
    console.log("hello");
    const moviesCollectionRef = collection(db, "movie");
    const unsubscribe = onSnapshot(moviesCollectionRef, (snapshot) => {
      // Initialize empty arrays for different types of movies
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trending = [];


      snapshot.docs.forEach((doc) => {
        const movieData = doc.data();
        switch (movieData.type) {
          case "recommend":
            recommends.push({ id: doc.id, ...movieData });
            break;
          case "new":
            newDisneys.push({ id: doc.id, ...movieData });
            break;
          case "original":
            originals.push({ id: doc.id, ...movieData });
            break;
          case "trending":
            trending.push({ id: doc.id, ...movieData });
            break;
          default:
            // Handle any other type of movie data if needed
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

    return () => unsubscribe(); // Unsubscribe from the Firestore snapshot listener when the component unmounts
  }, [userName, dispatch]);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending/>
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

