import { Suspense } from 'react';
import { Outlet } from 'umi';
import { Provider } from 'react-redux'
import { reduxStore, persistor } from '@/Redux';
import Web3ModalProvider from '@/Provider/Web3ModalProvider';
import ModalProvider from '@/Provider/modalProvider';
import NoticeProvider from '@/Provider/NoticeProvider';
import LoadingProvider from '@/Provider/loadingProvider';
import { PersistGate } from 'redux-persist/integration/react';
import './index.less'
import Header from '@/Components/Header'

export default function Layout() {
  return (
    <Suspense fallback={<div/>}>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Web3ModalProvider>
            <LoadingProvider>
              <ModalProvider>
                <NoticeProvider>
                  <Header/>
                  <Outlet />
                </NoticeProvider>
              </ModalProvider>
            </LoadingProvider>
          </Web3ModalProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}