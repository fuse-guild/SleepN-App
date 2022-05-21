import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Button } from 'react-native'

import { useWalletConnect } from '@walletconnect/react-native-dapp'
import AsyncStorage from '@react-native-async-storage/async-storage'

function ProfileScreen({ navigation, route }) {
    const { logout } = route.params

    const [email, setEmail] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('email')
            .then(email => {
                console.log(email)
                setEmail(email)
            })
    }, [])

    const clearEmail = () => {
        AsyncStorage.clear()
            .then(() => logout())
    }

    return <SafeAreaView>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 60, marginHorizontal: 20 }}>
            <Text>Email: </Text>
            <Text>{email}</Text>
        </View>
        <Button title='Logout' color={'red'} onPress={clearEmail} />
    </SafeAreaView>
}

export default ProfileScreen