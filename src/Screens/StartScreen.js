import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";

const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

const StartScreen = ({ navigation }) => {
    console.log(navigation)
    return <View style={styles.container}>
        <Text style={styles.headline}>Sleepn</Text>
        <Text style={styles.subheader}>Sleep better, earn crypto</Text>

        <Text style={{ fontSize: 16, paddingTop: 80 }}>How it works:</Text>

        <Text style={styles.featureItem}><B>Mint a Bedroom NFT</B> for membership{'\n'}to the game & enchanted rewards</Text>
        <Text style={styles.featureItem}><B>Connect a wearable</B> to measure your{'\n'}sleep quality</Text>
        <Text style={styles.featureItem}><B>Earn $SLEEP</B> every minute you{'\n'}sleep</Text>
        <Text style={styles.featureItem}><B>Mint bedroom upgrades</B> to earn{'\n'}more</Text>
        <View style={{ marginTop: 40 }} />
        <Button
            onPress={() => navigation.navigate('Email')}
            style={styles.getStartedButton}
            title='Get Started' />
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 80
    },
    headline: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subheader: {
        fontSize: 18,
        textAlign: 'center'
    },
    featureItem: {
        fontSize: 18,
        paddingTop: 40
    },
    getStartedButton: {
        marginTop: 20
    }
})

export default StartScreen