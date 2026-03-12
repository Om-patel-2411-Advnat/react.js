import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react"
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordianContext = createContext();

export function useAccordionContext(){
    const ctx = useContext(AccordianContext);

    if(!ctx){
        throw new Error ('Accordion related components must be wrapped by <Accordion>')
    }

    return ctx;
}

export default function Accordion ({children , className}){
    const [openItemId , setOpenItemId] = useState();

    function toggle(id){
        setOpenItemId(prevId => prevId === id ? null : id );
    }

    const contextValue={
        openItemId ,
        toggle,
    }

    return(
        <AccordianContext value={contextValue}>
            <ul className={className}>
                {children}
            </ul>
        </AccordianContext>
    )
}

// here we can create methods for this whole component function like that 
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent ;