import { useContext, createContext } from "react";

const AccordionContextItem = createContext();

export function useAccordionContextItem() {
    const ctx = useContext(AccordionContextItem);

    if (!ctx) {
        throw new Error('AccordionItem related components must be wrapped by <AccordionItem>')
    }

    return ctx;
}

export default function AccordionItem({ id, children , className}){

    return(
        <AccordionContextItem value={id}>
            <li className={className}>
                {children} 
            </li>
        </AccordionContextItem>
    )
}