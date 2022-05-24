import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

const BorderContainer = ({ children, style }) => {
    let innerStyle = style || {}
    return <View style={{
        ...innerStyle,
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center'
    }}>
        {children}
    </View>
}

export default function EmailScreen({ navigation, route }) {

    let { onJoin } = route.params

    const [email, setEmail] = useState('')
    const join = () => {
        if (email.includes('@') && email.includes('.')) {
            AsyncStorage.setItem('email', email)
                .then((_) => onJoin())
        } else {
            alert('Please enter valid email')
        }
    }

    return <View style={{ paddingHorizontal: 20, paddingTop: 20, display: 'flex', flexDirection: 'column' }}>
        <View style={{ alignSelf: 'flex-start' }}>
            <Button onPress={() => navigation.goBack()} title='Back' />
        </View>

        <View style={{ marginTop: 100 }}></View>
        <Text style={{ fontSize: 16 }}>Join using your email. We'll send you a link to confirm.</Text>
        <View style={{ marginTop: 15 }}></View>
        <BorderContainer style={{ backgroundColor: 'white', height: 50 }}>
            <TextInput onChangeText={setEmail} style={{ flex: 1 }} placeholder='Enter your email' textContentType='emailAddress' autoComplete='email' />
        </BorderContainer>
        <View style={{ marginTop: 15 }}></View>
        <Button onPress={() => join()} title='Join' />
    </View>
}