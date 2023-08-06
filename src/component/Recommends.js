import styled from "styled-components"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Recommends = (props) => {
    return (
        <Container>
            <h4>Recommended for You</h4>
            <Content>
                <Wrap>
                    <Link to='/'>
                        <img src="" alt="" />
                    </Link>
                </Wrap>
                <Wrap>
                    <Link to='/'>
                        <img src="" alt="" />
                    </Link>
                </Wrap>
                <Wrap>
                    <Link to='/'>
                        <img src="" alt="" />
                    </Link>
                </Wrap>
                <Wrap>
                    <Link to='/'>
                        <img src="" alt="" />
                    </Link>
                </Wrap>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    padding:0px 0px 26px;
`;

const Content = styled.div`
    display:grid;
    grid-gap:25px;
    gap:25px;
    grid-template-columns:repeat(4,minmax(0,1fr));

    @media(max-width:786px){
        grid-template-columns:repeat(2,minmax(0,1fr));

    }
`;

const Wrap = styled.div`
    padding-top:56.25%;
    border-radius:10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor:pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);
    
`
export default Recommends;