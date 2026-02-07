// here we have to take id as a destructure component 
// we can do that but we have to destructure and manually set more and more attributes  on this build in section element if we want to set more element in Example.jsx file.
// and also if we want set any className we have to destructure it here and then use it like id and it's not convenient every time  
// that's why we use another method called forwarded props or proxy props.


// export default function Section({title ,id, children}){
//     return (
//         <section id = {id} >
//             <h2>{title}</h2>
//             {children}
//         </section>
//     )
// }

// now let's see how forward props works 
// here by using this ...props we are telling js to collect all other props that might be receive on the section component and merge them into the ...props object
// than you can use this to collect all the props of the section component 
// now this will ensure that every new props added to the section components will be added here

export default function Section({title, children, ...props}){
    return (
        <section {...props} >
            <h2>{title}</h2>
            {children}
        </section>
    )
}