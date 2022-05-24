import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, View, Text, Button, TouchableOpacity, Modal } from 'react-native'

import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'
import FitbitAuthScreen from './FitbitAuthScreen'


const GlassSurface = ({ children, style }) => {
    return <View
        style={{
            ...style,
            borderRadius: 20,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 7,
            // shadowOffset: '0',
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

function FitbitAuthModal(props) {
    return <Modal
        animationType='slide'
        transparent={false}
        visible={props.visible || false}
        onRequestClose={() => props.setModalVisible(false)}
    >
        <View style={{ marginTop: 40, alignItems: 'flex-start' }}>
            <Button title='Close' onPress={() => props.setModalVisible(false)} />
        </View>

        <FitbitAuthScreen onSuccessAuth={() => props.setModalVisible(false)} />
    </Modal>
}

function HealthPage() {
    const [modalVisible, setModalVisible] = useState(false)

    return <SafeAreaView>
        <FitbitAuthModal visible={modalVisible} setModalVisible={setModalVisible} />
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
            }}>
                <Text style={{
                    textAlign: 'center',
                    marginTop: 10
                }}>No sleep data found. Please connect your Fitbit account to view your data and receive $SLEEP rewards.</Text>
                <RoundedButton style={{
                    width: 272,
                    marginTop: 20
                }} title='Connect Fitbit' onPress={() => setModalVisible(true)} />
            </GlassSurface>
        </ScrollView>

    </SafeAreaView >
}

export default HealthPage