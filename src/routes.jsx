import UsersPage from "./pages/UsersPage";
//import EventsPage from "./pages/EventsPage";
import TopicsPage from "./pages/TopisPage"; 

const routes = [
  {
    path: "/",
    element: <UsersPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  // {
  //   path: "/events",
  //   element: <EventsPage />,
  // },
  {
    path: "/topics",
    element: <TopicsPage />,
  }
];

export default routes;
