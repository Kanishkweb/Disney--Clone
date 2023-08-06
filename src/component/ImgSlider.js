import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyCarousel = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };

  return (
      <Carousel {...settings}>
        <Wrap>
            <a>
                <img src='/images/slider-badging.jpg' alt='Slider1'/>
            </a>
        </Wrap>
        <Wrap>
            <a>
                <img src='/images/slider-scale.jpg' alt='Slider1'/>
            </a>
        </Wrap>
        <Wrap>
            <a>
                <img src='/images/slider-badag.jpg' alt='Slider1'/>
            </a>
        </Wrap>
        <Wrap>
            <a>
                <img src='/images/slider-scales.jpg' alt='Slider1'/>
            </a>
        </Wrap>
      </Carousel>
  );
};


const Carousel = styled(Slider)`
    margin-top:20px;

    & > button {
        opacity:0;
        height:100%;
        width:5vw;
        z-index:1;

        &:hover{
            opacity:1;
            transition:opacity 0.2s ease 0s
        }
    }
    ul li button {
        &:before {
            font-size:10px;
            color: rgb(150,158,171);
        }
    }

    li.slick-active button:before {
        color:white;
    }

    .slick-list {
        overflow:initial;
    }

    .slick-prev {
        left: -75px
    }
    .slick-next {
        right: -75px
    }
`;

const Wrap = styled.div`
    border-radius:10px;
    cursor:pointer;
    position:relative;

    a {
        border-radius:10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display:block;
        position:relative;
        padding:4px;

        img{
            width:100%;
            height:100%;
            border-radius:4px;
        }

        &:hover{
            padding:0;
            border:4px solid white;
            transition-duration:300ms;
        }
    }
`
export default MyCarousel;
