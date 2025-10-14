import ErrorPage from "@/pages/error/Error";
import Home from "@/pages/home";
import MainLayouts from "@/pages/Layouts/MainLayouts";
import { createHashRouter } from "react-router-dom";
import ContactBook from "@/pages/ContactBook";
import ContactDetails from "@/pages/ContactDetails";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/main",
        element: <Home />,
        children: [
          {
            path: "/main/contact-book",
            element: <ContactBook />,
          },
        ],
      },
      {
        path: "/contact-details/:id",
        element: <ContactDetails />,
      },
      {
        path: "/profile-info",
        element: <div>Userprofile info</div>,
      }
    ],
  },
]);
