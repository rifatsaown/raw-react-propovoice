import ContactBook from '@/pages/ContactBook';
import ContactDetails from '@/pages/ContactDetails';
import ErrorPage from '@/pages/error/Error';
import Home from '@/pages/home';
import MainLayouts from '@/pages/Layouts/MainLayouts';
import SelesPipeline from '@/pages/SelesPipeline/SelesPipeline';
import { createHashRouter } from 'react-router-dom';
import DevDocs from './pages/Dev_Docs/DevDocs';

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/main',
        element: <Home />,
        children: [
          {
            path: '/main/contact-book',
            element: <ContactBook />,
          },
          {
            path: '/main/sales-pipeline',
            element: <SelesPipeline />,
          },
        ],
      },
      {
        path: '/contact-details/:id',
        element: <ContactDetails />,
      },
      {
        path: '/profile-info',
        element: <div>Userprofile info</div>,
      },
      {
        path: '/help',
        element: <DevDocs />,
      },
    ],
  },
]);
