import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Alert } from 'react-native';
import { StripeTerminalProvider, useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import Index from './Index';

export default function App() {

  useEffect(() => {
    async function init() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Stripe Terminal needs access to your location',
            buttonPositive: 'Accept',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Location');
        } else {
          console.error(
            'Location services are required in order to connect to a reader.'
          );
        }
      } catch {}
    }
    init();
  }, []);

  const fetchTokenProvider = async () => {
    const stripeBaseUrl = 'your url'
    const stripeApiKey = 'your api key'
    const headers = new Headers();
        headers.append('Authorization', `Bearer ${stripeApiKey}`);
        const requestOptions = { method: 'POST', headers };
        const response = await fetch(`${stripeBaseUrl}/terminal/connection_tokens`, requestOptions);

    const { secret } = await response.json();
    return secret;
  };

  return (
    <StripeTerminalProvider
    logLevel='verbose'
    tokenProvider={fetchTokenProvider}>
      <Index />
    </StripeTerminalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
