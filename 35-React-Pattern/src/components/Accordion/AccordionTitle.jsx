import { useAccordionContext } from "./Accordion";
import { useAccordionContextItem } from './AccordionItem';

export default function AccordionTitle({ children , className}){
    
    const { toggle } = useAccordionContext();
    const id = useAccordionContextItem(); 

    return (
        <h3 className={className} onClick={() => toggle(id)}>{children}</h3>
    )
}