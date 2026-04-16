import { App } from '@components/app/app';
// import { StrictMode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.scss';
import { store } from '@/services/store';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DndProvider>
  // </StrictMode>
);
