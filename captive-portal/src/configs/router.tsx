import { createBrowserRouter } from 'react-router-dom';
import UserPage from '../pages/UserPage';
import OperatorPage from '../pages/OperatorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserPage />,
  },
  {
    path: '/operator',
    element: <OperatorPage />,
  },
]);
