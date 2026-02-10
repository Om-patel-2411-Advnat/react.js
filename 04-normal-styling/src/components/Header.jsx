import logo from '../assets/logo.png';
import { styled } from  'styled-components';

// where ever you want to implements this css you can import this file there and the styling will be scoped untill this file only 
// no other file can use this styling after adding .module into your file name
// import classes from'./Header.module.css';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  & img {
  object-fit: contain;
  margin-bottom: 2rem;
  width: 11rem;
  height: 11rem;
}

  & h1 {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-align: center;
  text-transform: uppercase;
  color: #9a3412;
  font-family: 'Pacifico', cursive;
  margin: 0;
}
  & p {
  text-align: center;
  color: #a39191;
  margin: 0;
}
  @media (min-width: 768px) {

    margin-bottom: 4rem;

  & h1 {
    font-size: 2.25rem;
  }
}
`;
// here the ( & ) will join the other styles with the header

// insted of this you can remove the header form here
// header {
//   margin-bottom: 4rem;
// }

export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>

      {/* this is how you can access specific classes by using dynamic method of jsx */}
      <p 
        // className={classes.paragraph}
      >A community of artists and art-lovers.</p>
    </StyledHeader>
  );
}
