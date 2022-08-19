import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native';

function Index() {
    const { initialize } = useStripeTerminal();

    useEffect(() => {
        initialize({
            logLevel: 'verbose',
        })
    }, [initialize])

  return (
    <View>
        <Text>Hola</Text>
    </View>
  )
}

export default Index