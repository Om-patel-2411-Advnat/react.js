import { useAccordionContext } from "./Accordion";
import { useAccordionContextItem } from './AccordionItem';

export default function AccordionContent({className, children}){

    const { openItemId } = useAccordionContext();
    const id = useAccordionContextItem(); 

    const isOpen = (openItemId === id );

    return(
        <div className={isOpen ? `${className ?? ''} open` : `${className ?? ''} close` }>
            {children}
        </div>
    )
}