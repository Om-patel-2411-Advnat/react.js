import CoreConcept from "./CoreConcept.jsx";
import { core_concepts } from "../data.js";

export default function CoreComponents(){
    return (
        <section id="core-concepts">
            <h2>Time to get started!</h2>

            {/* here we have to print data manually and if any  new content is added or removed the page will broke so we must fix this  */}
            {/* <ul> */}
            {/* if the data coming from the file is like this we can use use shortcut like we use  {...core_concepts[0]}*/}
            {/* <CoreConcept 
                title ={core_concepts[0].title}
                description = {core_concepts[0].description}
                image={core_concepts[0].image}/> */}
            {/* this three dots (...) is called the spred operator used to get all the data of an array */}
            {/* <CoreConcept {...core_concepts[1]}/>
            <CoreConcept {...core_concepts[2]}/>
            <CoreConcept {...core_concepts[3]}/>
            </ul> */}

            {/* this is what often used while you are getting data from the backend or from an array */}
            <ul>
            {core_concepts.map((items)=>( 
                <CoreConcept {...items}/>
            ))}
            </ul>
        </section>
    )
}