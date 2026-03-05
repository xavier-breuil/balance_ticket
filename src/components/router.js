import { createBrowserRouter } from "react-router";
import HomePage from './homePage.js';
import ConvertBalanceTickets from './convertBalanceTickets';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/convert_balance_ticket",
    element: <ConvertBalanceTickets />,
  },
]);

export default router;
