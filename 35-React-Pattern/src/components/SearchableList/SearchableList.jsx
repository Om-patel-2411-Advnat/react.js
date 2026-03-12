import { useRef } from "react";
import { useState } from "react"

export default function SearchableList({items ,itemKeyFn ,  children}){

    const lastChange = useRef();

    const [searchTerm , setSearchTerm] = useState('');

    const SearchResults = items.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()));

    function HandelChange(event){
        if (lastChange.current){
            clearTimeout(lastChange.current);
        }

        // here we want to implement the debouncing means we don't want to render the results on every latter but we want to do it once the user enter a word or something this is called debouncing
        lastChange.current = setTimeout(()=>{
            lastChange.current = null ;
            setSearchTerm(event.target.value);
        } ,500);
    }

    return(
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={HandelChange} />
            <ul>
                {SearchResults.map((item , index) =>(
                    // now we have to generate the key dynamically 
                    <li key={itemKeyFn(item)}>
                        {/* we can use this children prop as a function to render some value */}
                        {children(item)}
                    </li>
                ))}
            </ul>
        </div>
    )
}