import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { config } from './configs/wagmi';
import { router } from './configs/router';
import { queryClient } from './configs/query';

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <PrivyProvider
            appId="clysmtaof02h3ssqae73sck51"
            config={{
              loginMethods: ['email', 'wallet', 'google', 'sms', 'apple'],
              fundingMethodConfig: {
                moonpay: {
                  useSandbox: true,
                },
              },
              embeddedWallets: {
                createOnLogin: 'users-without-wallets',
                requireUserPasswordOnCreate: false,
              },
              mfa: {
                noPromptOnMfaRequired: false,
              },
            }}
          >
            <RouterProvider router={router} />
          </PrivyProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  </React.StrictMode>
);
