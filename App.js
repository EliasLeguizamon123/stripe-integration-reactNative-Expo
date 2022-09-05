import { useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
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
                        message:
                            'Stripe Terminal needs access to your location',
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
            } catch (error) {
                Alert.alert(error);
            }
        }
        init();
    }, []);

    const fetchTokenProvider = async () => {
        const stripeBaseUrl = 'https://api.stripe.com/v1';
        const stripeApiKey =
            'sk_test_51KLxAPKQeCRku2NZXnQd9FbcgqSGs3AlmZf8TfWoYttDL7oCk7olt7qQS7jZX9TnrO6HjHeBg7BsnaUaFGh23IzJ00QGViSBXq';
        const headers = new Headers();

        headers.append('Authorization', `Bearer ${stripeApiKey}`);
        const requestOptions = { method: 'POST', headers };
        const response = await fetch(
            `${stripeBaseUrl}/terminal/connection_tokens`,
            requestOptions
        );

        const { secret } = await response.json();

        return secret;
    };

    return (
        <StripeTerminalProvider
            logLevel="verbose"
            tokenProvider={fetchTokenProvider}
        >
            <Index />
        </StripeTerminalProvider>
    );
}
