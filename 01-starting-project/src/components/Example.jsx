// we creat this seperate component because of useState 
// when we use useState into the app it rerender the whole page for the updated data and due to that our discription into the header part is also changing and we don't want this
// so we created a seperate component and use useState into the component so when ever the data is updated the only thing re render is Example function not the App function 
// this is the most important topic of the useState working


import { useState } from "react";
import { EXAMPLES } from "../data.js";
import TabButton from "./TabButton.jsx";
import Section from "./Sction.jsx";
import Tabs from "./Tabs.jsx";


export default function Example(){

    const [selectedtopic , setselectedtopic] = useState('');

    function Handleclick(selectedbutton){
        setselectedtopic(selectedbutton);
        console.log(selectedtopic);
    }

    let tabcontent = <p>Please select a topic.. </p>;

    if(selectedtopic){
        tabcontent =<div id="tab-content">
                    <h3>{EXAMPLES[selectedtopic].title}</h3>
                    <p>{EXAMPLES[selectedtopic].description}</p>
                    <pre>
                        <code>
                        {EXAMPLES[selectedtopic].code};
                        </code>
                    </pre>
                    </div>
    }
    return (

        // here this section will not pass id with the props so we have to take it manually in the file Section.jsx
        // when you are setting props on a custom component those props are not automatically forwarded to the jsx code used inside of the component
        // so in this case our id prop is not automatically forwarded and set as an attribute 
        <Section id="examples" title = 'Example'>
        
        {/* always remember that every component in a react can be passed as an value */}
        {/* here we are passingg all the butttons as a value to the Tabs.jsx file by doing this we can get the buttons as a props */}
        <Tabs 
        // if you want to use custom components like Section you have to use {}
        // ButtonComponent={Section}
        // but for the inbuild components like div , ul etc you have to use ""
        // ButtonComponent="menu"
        // insted of using this here we can pass the value to the js diffrentiator as we did in Tabs.jsx
        button = {
            <>
                {/* now we have to check that which button is clicked in order to print the relational text content for that we can use arrow function inside this and inside the arrow function you can call the function manually because when ever this line will be executed the arrow function will execute and wait fro the click event to occure and then the Handleclick function will be executed */}
                <TabButton 
                isSelected = {selectedtopic === 'components'}
                onClick ={() => Handleclick('components')}
                >
                Components
                </TabButton>
                <TabButton 
                isSelected = {selectedtopic === 'jsx'} 
                onClick ={() => Handleclick('jsx')}
                >
                JSK
                </TabButton>
                <TabButton 
                isSelected = {selectedtopic === 'props'}
                onClick ={() => Handleclick('props')}
                >
                Props
                </TabButton>
                <TabButton 
                isSelected = {selectedtopic === 'state'}
                onClick ={() => Handleclick('state')}
                >
                State
                </TabButton>
            </>
            }
        >
        </Tabs>

        {/* now same as section we want to do with the menu to make it component */}
        {/* <menu></menu> */}

        {/* we can use this also for printing the tab content*/}
        {/* {!selectedtopic && <p>Please select a topic.. </p>}
        {selectedtopic && 
        <div id="tab-content">
            <h3>{EXAMPLES[selectedtopic].title}</h3>
            <p>{EXAMPLES[selectedtopic].description}</p>
            <pre>
            <code>
                {EXAMPLES[selectedtopic].code};
            </code>
            </pre>
        </div>
        } */}

        {/* we can use this also for printing the tab content*/}
        {/* { !selectedtopic ? <p>Please select a topic.. </p> : 
        <div id="tab-content">
            <h3>{EXAMPLES[selectedtopic].title}</h3>
            <p>{EXAMPLES[selectedtopic].description}</p>
            <pre>
            <code>
                {EXAMPLES[selectedtopic].code};
            </code>
            </pre>
        </div>
        }  */}

        {tabcontent}
        </Section>

    );
}