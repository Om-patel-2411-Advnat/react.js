import { useFormStatus } from 'react-dom';


export default function Submit(){

    // this hook contains the information about the current form status , in which this component is being used
    // we can get the data and as well the other information got to the official documentation to see what we can get { pending , data , method , action } this is what we can get from the component wher this component is being used
    const { pending } = useFormStatus()

    return(
        <p className="actions">
            <button type="submit" disabled={pending}>{pending ?'Submitting...' :'Submit'}</button>
        </p>
    );
}