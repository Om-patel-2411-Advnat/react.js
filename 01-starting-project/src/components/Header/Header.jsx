// we can aslo import image in react this will be good practice because this will help use to get the image into the bunddel while deployment
import reactimage from "../../assets/react-core-concepts.png";
const reactDEscriptions = ['Fundamental' , 'Crucial' , 'Core'];
import './Header.css';

function genRandomInx(max){
  return Math.floor(Math.random()*(max+1));
}

// always make the first latter of the any react component capital like : Header() that's how react recognize the components
export default function Header() {

  let description = reactDEscriptions[genRandomInx(2)];
  // when ever you want to return multiple line of html code you need to use ()
  return (
    <header>
      {/* every tag which has no closing tag should be closed with a slash */}
      <img src={reactimage} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}