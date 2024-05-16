import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import AddYourEvent from './components/AddYourEvent/AddYourEvent';
import EventDetailPage from './components/EventDetailPage/EventDetailPage'
import SelectSeats from './components/SelectSeats/SelectSeats'
import PurchaseTicket from './components/PurchaseTicket/PurchaseTicket';
import ConcertIndex from './components/ConcertIndex/ConcertIndex';
import AccountPage from './components/AccountPage/AccountPage'
import UpdateYourEvent from './components/UpdateYourEvent/UpdateYourEvent';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ConcertIndex />
      },
      {
        path: '/events/new',
        element: <AddYourEvent />
      },
      {
        path: '/events/:eventId',
        element: <EventDetailPage />
      },
      {
        path: '/events/:eventId/seats',
        element: <SelectSeats />
      },
      {
        path: '/tickets/:eventId/checkout',
        element: <PurchaseTicket />
      },
      {
        path: '/accounts',
        element: <AccountPage />
      },
      {
        path: '/events/:eventId/edit',
        element: <UpdateYourEvent />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
