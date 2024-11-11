import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogFelvetel from './components/BlogFelvetel';
import BlogTorles from './components/BlogTorles';
import BlogLista from './components/BlogLista';
import BlogReszlet from './components/BlogReszlet.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogLista />,
  },
  {
    path: "/telefonok",
    element: <BlogLista />,
  },  
  {
    path: "/BlogFelvetel",
    element: <BlogFelvetel />,
  },
  {
    path: "/BlogTorles",
    element: <BlogTorles />,
  },
  {
    path: "/telefonok/:phoneId",
    element: <BlogReszlet />
  }
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
