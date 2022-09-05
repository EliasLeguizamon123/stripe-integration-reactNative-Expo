import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import { useEffect, useState } from 'react';
import { Alert, Text, View, TouchableHighlight } from 'react-native';

function Index() {
    const { initialize } = useStripeTerminal();
    const [readerz, setReaderz] = useState([]);
    const init = async () => {
        initialize({
            logLevel: 'error',
        });
    };

    useEffect(() => {
        init();
    }, []);

    const { discoverReaders, connectBluetoothReader, cancelDiscovering } =
        useStripeTerminal({
            onUpdateDiscoveredReaders: (readers) => {
                setReaderz(readers);
            },
        });

    const handleDiscoverReaders = async () => {
        setTimeout(async () => {
            await cancelDiscovering();
        }, 5000);

        const { error } = await discoverReaders({
            discoveryMethod: 'bluetoothScan',
        });

        if (error) {
            Alert.alert(
                'Discover readers error: ',
                `${error.code}, ${error.message}`
            );
        }
    };

    const handleConnectBluetoothReader = async () => {
        const { reader, error } = await connectBluetoothReader({
            reader: readerz[0],
            locationId: 'tml_EvxVCwBCHu1BMA',
        });

        if (error) {
            Alert.alert('error', error);

            return;
        }

        Alert.alert('Reader connected successfully', reader);
    };

    return (
        <View>
            <Text style={{ padding: 12 }}>Connect Reader Bellow</Text>
            <TouchableHighlight
                activeOpacity={0.6}
                onPress={() => handleDiscoverReaders()}
            >
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#343452',
                        padding: 10,
                        margin: 10,
                    }}
                >
                    <Text style={{ color: 'white' }}>Search Here</Text>
                </View>
            </TouchableHighlight>
            <Text style={{ padding: 12 }}>Connect Reader Bellow</Text>
            <Text>
                {readerz.length > 0
                    ? readerz[0].serialNumber
                    : 'No readers yet'}
            </Text>
            <TouchableHighlight onPress={() => handleConnectBluetoothReader()}>
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#343452',
                        padding: 10,
                        margin: 10,
                    }}
                >
                    <Text style={{ color: 'white' }}>Connect Here</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default Index;
