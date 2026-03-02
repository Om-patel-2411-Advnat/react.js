// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home.js';
import EventsPage, { Loader as eventsLoader } from './pages/Events.js';
import EventDetailsPage, { loader as eventDetailLoader , action as deleteEventAction } from './pages/EventDetail.js';
import NewEventPage from './pages/NewEvent.js';
import EditEventPage from './pages/EditEvent.js';
import RootPage from './pages/Root.js';
import EventsRootPage from './pages/EventsRoot.js';
import ErrorPage from './pages/Error.js';
import { action as ManipulateAction } from './components/EventForm.js';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter.js';


const router = createBrowserRouter([
  {
    path: '',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootPage />,
        children: [
          // here the loader is used for returning a function which will be used when ever this component is rendered and the data will be only loaded when the component is rendering or before that
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':id',
            // here we have to use id for getting the specific data and we will use different hook which works same as useLoaderHook but it takes id for checking from which loader to take data
            id: 'event-details',
            // here we are making this route as a parent because we want to pass the same loader to the both components that's why now they both can use this loader
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailsPage />, action : deleteEventAction },
              { path: 'edit', element: <EditEventPage />, action: ManipulateAction }
            ]
          },
          // just like loader action is used to send the data to the backend 
          { path: 'new', element: <NewEventPage />, action: ManipulateAction },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]

  }
])

function App() {

  return <RouterProvider router={router} />;
}

export default App;
