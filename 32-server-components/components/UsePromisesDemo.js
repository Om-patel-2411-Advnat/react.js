"use client";

import { useState, use } from 'react';

export default function UsePromiseDemo({ UsersPromise }) {

    // this will wait to resolve the promise on the client side an than integrate with suspense 
    const users = use(UsersPromise);
    const [count , setCount] = useState(0);

    return (
        <div className='rsc'>
            <h2>RSC with Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching.
            </p>
            <p>
                <button onClick={prevCount=> prevCount + 1}>Increment</button>
                <span>{count}</span>
            </p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.title})
                    </li>
                ))}
            </ul>
        </div>
    );
}