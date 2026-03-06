// we can import this to check that currently react is fetching data or not
import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {

  // here isFetching is a number that's 0 if there is no fetching data currently or higher number if there is fetching data currently
  // so we can use this to show a loading indicator when there is fetching data currently
  const isFetching = useIsFetching();

  return (
    <>
      <div id="main-header-loading">
        {isFetching > 0 && <progress />}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}