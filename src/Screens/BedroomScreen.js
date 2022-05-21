import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Button } from 'react-native'
import { useWalletConnect } from '@walletconnect/react-native-dapp'
import WalletConnectProvider from '@walletconnect/web3-provider'

function buildProvider(connector) {
    return new WalletConnectProvider({
        chainId: connector.chainId,
        connector: connector,
        infuraId: 'be826230571044188683235f675fd2b7',
        qrcode: false
    })
}

export default function BedroomScreen() {
    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const connector = useWalletConnect()

    const connect = () => {
        connector.connect()
            .then((status) => {
                if (status.accounts.length < 1) {
                    throw Error('No account provided')
                }
                console.log('Got account on connect:', status.accounts)
                setAccount(status.accounts[0])
                console.log(connector.accounts)
            })
            .catch((err) => {
                console.log('Failed to connect:', err)
            })
    }

    const disconnect = () => {
        connector.killSession()
            .then(() => { setAccount(null) })
    }

    let button = (() => {
        if (!connector.connected) {
            return <Button title='Connect Wallet' onPress={connect} />
        } else {
            return <Button title='Disconnect' onPress={disconnect} />
        }
    })()


    useEffect(() => {
        if (connector.connected) {
            setAccount(connector.accounts[0])
        }
    }, [])

    useEffect(() => {
        if (account && !provider) {
            setProvider(buildProvider(connector))
            console.log(provider)
        }
    }, [account])

    const emptyNft = <View style={{
        width: 200,
        height: 200,
        backgroundColor: '#00000011',
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Please connect your wallet to see your bedroom NFT</Text>
    </View>

    return <SafeAreaView>
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 150
        }}>
            {!account ?
                emptyNft
                :
                <Text>{account}</Text>}
            <View style={{ marginTop: 25 }}></View>
            {button}
        </View>

    </SafeAreaView>
}