import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import { AppProviders } from './contexts/AppProviders';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
    return pages[`./pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <BrowserRouter>  {/* Use BrowserRouter instead of Router */}
        <ThemeProvider>
          <SearchProvider>
            <AppProviders>
              <App {...props} />
            </AppProviders>
          </SearchProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  },
});
