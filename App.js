import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';
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
    const response = await fetch(`{YOUR BACKEND URL}/connection_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
