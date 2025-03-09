
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import HomePage from './pages/home/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import JournalsPage from './pages/JournalsPage';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AccessibilityStatement from './pages/AccessibilityStatement';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="ScholarHub - Academic Journal Database" />
          <link rel="icon" href="/favicon.ico" />
          <title>ScholarHub - Academic Journal Database</title>
        </Helmet>
        <Routes>
          <Route path="/" element={<Layout><Outlet /></Layout>}>
            <Route index element={<HomePage />} />
            <Route path="journals" element={<JournalsPage />} />
            <Route path="journals/:category" element={<CategoryPage />} />
            <Route path="journals/:category/page/:page" element={<CategoryPage />} />
            <Route path="journals/:category/:slug" element={<ArticlePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="accessibility" element={<AccessibilityStatement />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
