import './CoreConcept.css'

// here props are used for geting the different data according to the array of file data.js passed into the CoreConcept as arguments
export default function CoreConcept(props) {
  return (
    <li>
      <img src={props.image} alt={props.title}/>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}