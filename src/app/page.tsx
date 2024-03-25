'use client';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';
import { ScreensWizard } from '@/components/ScreensWizard';

export default function Home() {
  return (
      <Provider store={ store }>
          <ScreensWizard />
      </Provider>
  );
}
