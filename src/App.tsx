import '@/shared/styles/global.css';
import '@/shared/styles/variables.css';
import '@/shared/fonts/montserrat/index.css';
import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/shared/ui/layouts/Layout/Layout';
import { NotFoundPage } from '@/shared/ui/pages/NotFoundPage';

const Home = lazy(() => import('@/shared/ui/pages/Homepage/HomePage'));
const RecipeCatalog = lazy(() => import('@/shared/ui/pages/RecipeCatalogPage/RecipeCatalogPage'));
const Recipe = lazy(() => import('@/shared/ui/pages/RecipePage/RecipePage'));
const Guide = lazy(() => import('@/shared/ui/pages/GuidePage/GuidePage'));
const DirectorySection = lazy(
  () => import('@/shared/ui/pages/DirectorySectionPage/DirectorySectionPage'),
);
const DirectorySectionItem = lazy(
  () => import('@/shared/ui/pages/DirectorySectionItemPage/DirectorySectionItemPage'),
);
const ProfileUser = lazy(() => import('@/shared/ui/pages/ProfileUserPage/ProfileUserPage'));
const ProfileEditor = lazy(() => import('@/shared/ui/pages/ProfileEditor/ProfileEditor'));
const NotFound = lazy(() => import('@/shared/ui/pages/NotFoundPage/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'catalog', element: <RecipeCatalog /> },
      { path: 'catalog/:recipeId', element: <Recipe /> },
      {
        path: 'guide',
        element: <Guide />,
      },
      {
        path: 'guide/:sectionName',
        element: <DirectorySection />,
      },
      { path: 'guide/:sectionName/:itemId', element: <DirectorySectionItem /> },
      { path: 'profile', element: <ProfileUser /> },
      { path: 'profile/setting', element: <ProfileEditor /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
