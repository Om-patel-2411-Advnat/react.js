// import ClientDemo from "@/components/ClientDemo";  
// import DataFetchingDemo from "@/components/DataFetchingDemo";
// import RSCDemo from "@/components/RSCDemo";
// import ServerActionsDemo from "@/components/ServerActionDemo";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";
import fs from 'node:fs/promises';
import ErrorBoundary from "@/components/ErrorBoundry";

export default async function Home() { 

  const fetchUserPromise = new Promise((resolve , reject) => 
    setTimeout(async()=>{
      const data = await fs.readFile('dummy-db.json', 'utf-8'); 
      const users = JSON.parse(data);
      // resolve(users);
      reject(new Error('Error occurred!!'));
    }, 2000));

  return (
    <main>
      {/* <RSCDemo /> */}
      {/* <ClientDemo>
        <RSCDemo />
      </ClientDemo> */}

      {/* <DataFetchingDemo /> */}

      {/* <ServerActionsDemo /> */}

      <ErrorBoundary fallback={<p>Something went Wrong!!</p>}>
        <Suspense fallback={<p>Loading....</p>}>
          <UsePromiseDemo UsersPromise={fetchUserPromise}/>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
