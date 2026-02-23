// for creating custom hook always name the function with the starting of use it's a inbuilt rule of react for hooks
// to make this useFetch hook functional we have to manage some state here , because every component that later use this custom hook should of course get that state that's managed by hook
// you should not use the managing state into the component directly because it will reduce the reusability of the hook 
// this custom hook should not just send some request instead it should also manage all related states
// so due to that for making this hook reusable we are going to use useState here   

// keep in mind that custom hook is just a function and like all functions it can receive parameters so here we could expect a fetch function as a parameter

// reason behind using this components is not just for mak the code structure cleaner but also share them across multiple components if multiple component have similar logic that can be outsourced 


import { useEffect , useState } from "react";

export function useFetch(fetchFn , initial_value){

    // here we have to set the state value to make those values available to the component that will later use this custom hook 
    // you can return value like you do in normal js so where ever you use this hook you will get this state values so at the end of this hook we will return the states values by grouping them into an array or object

    // here we are going to manage two state one for loading and one for error
    const [isFetching , setIsFetching] = useState();
    const [error , setError] = useState();
    // and we are sending an https request here so we are going to end up with some data at the end 
    // so we are going to use another state for managing the data
    const [fetchedData , setFetchedData] = useState(initial_value);
    // now we will update the set function down there like use setFetchedData instead of setUserPlaces
    useEffect(() => {
        async function fetchData() {
        setIsFetching(true);
        try {
            // this line is still not very generic so we might gonna make it more generic to use    
            // because we are still explicitly fetching the usePlaces and it would be great if we would be a bit more flexible here  
            // now we are going to use this fetch function that we accept as a parameter here 
            const data = await fetchFn();

            setFetchedData(data);
        } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
        }

        setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

    //   now here we are going to return the state values by grouping them into object 
    // here we are not just limited to export only state values but we can also export the setState functions to update the state values
    // question : modifying state in one component will affect the other components like changing the value of data will be changed for the other component or not ??
    // answer : no there will be always new state will be handled by the react for every new component so every component will get fresh new copy but if " we are passing it by props than value will be updated as you know "
    return{
        isFetching,
        fetchedData,
        setFetchedData,
        error
    }

}