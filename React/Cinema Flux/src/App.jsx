import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
// Lazy load components
const MovieList = lazy(() => import('./components/movieList'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));
const Favorites = lazy(() => import('./components/Favorites'));
const NotFound = lazy(() => import('./components/NotFound'));

const FuturisticLoader = () => (
  <div className="loading-container fade-in">
    <div className="loading-spinner"></div>
    <div className="loading-text">INITIALIZING CINEMA FLUX</div>
  </div>
);

const PageLoader = () => (
  <div className="loading-container fade-in">
    <div className="loading-spinner"></div>
    <div className="loading-text">LOADING CONTENT</div>
  </div>
);

const Layout = () => {

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <h1 className="fade-in">CINEMA FLUX</h1>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <div className="background-effects">
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
        <div className="floating-particle particle-4"></div>
        <div className="floating-particle particle-5"></div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MovieList /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "favorites", element: <Favorites /> },
      { path: "movie/:id", element: <MovieDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
