  import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './i18n/LanguageContext';
import { LanguageChooser } from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <LanguageChooser />
    </LanguageProvider>
  );
}

export default App;
