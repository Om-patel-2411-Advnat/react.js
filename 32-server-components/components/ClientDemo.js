"use client";

// import RSCDemo from "./RSCDemo";

export default function ClientDemo({ children }) {
    console.log('ClientDemo rendered');
    return (
        <div className='client-cmp'>
            <h2>A React Client Component</h2>
            <p>
                Will be rendered on the client <strong>AND</strong> the server.
            </p>
            {/* but you can use the server component as a children here */}
            {children}

            {/* you can not use it like that directly */}
            {/* <RSCDemo /> */}
        </div>
    );
}