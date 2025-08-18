import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from './analytics/analytics';
import { PageLoading } from './components/Global/LoadingSpinner';
import { ErrorButton } from './components/ErrorButton';

const LandingPage = lazy(() => import('./pages'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Docs = lazy(() => import('./pages/Docs'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

function RouteTracker() {
  const location = useLocation();
  useEffect(() => { trackPageView(location.pathname); }, [location.pathname]);
  return null;
}

function App() {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <RouteTracker />
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 right-4 z-50">
            <ErrorButton />
          </div>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/products/:id" element={<ProductDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
