import React, { useEffect } from 'react'
import { ScrollView, SafeAreaView, View, Text, Button, TouchableOpacity } from 'react-native'

import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'


const GlassSurface = ({ children, style }) => {
    return <View
        style={{
            ...style,
            borderRadius: 20,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 7,
            shadowOffset: '0 0',
            padding: 10,
            backgroundColor: 'white'
        }}
    >
        {children}
    </View>
}

const RoundedButton = (props) => {
    return <TouchableOpacity onPress={props.onPress}>
        <View style={{
            ...props.style,
            backgroundColor: '#4318FF',
            borderRadius: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 46
        }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: 'white' }}>{props.title}</Text>
        </View>
    </TouchableOpacity>
}

function HealthPage() {

    return <SafeAreaView>
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                height: '100%'
            }}
        >
            <GlassSurface
                style={{
                    width: '95%',
                    marginTop: 50,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: '500' }}>☀️ Good Morning, User </Text>
            </GlassSurface>
            <GlassSurface style={{
                width: '95%',
                height: 300,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 24, fontWeight: '500' }}>You earned:</Text>
                <Text style={{ fontSize: 64, fontWeight: 'bold', marginTop: 20 }}>469</Text>
                <Text style={{ fontSize: 30, fontWeight: '500' }}>$SLEEP</Text>
                <RoundedButton style={{
                    width: 272,
                    marginTop: 20
                }} title='Buy sleep stuff' onPress={() => { }} />
            </GlassSurface>

            <GlassSurface style={{
                width: '95%',
                height: 300,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}></GlassSurface>
        </ScrollView>

    </SafeAreaView >
}

export default HealthPage