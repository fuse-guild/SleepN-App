import React, { useState, useEffect, Children } from 'react'
import { SafeAreaView, View, Text, Button, TouchableOpacity } from 'react-native'
import { useWalletConnect } from '@walletconnect/react-native-dapp'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

import dex from '../abis/Dex.json'

async function buildProvider(connector) {
    let wcProvider = new WalletConnectProvider({
        chainId: connector.chainId,
        rpc: {
            80001: 'https://matic-mumbai.chainstacklabs.com',
        },
        connector: connector,
        infuraId: 'be826230571044188683235f675fd2b7',
        qrcode: false
    })

    await wcProvider.enable()

    return new Web3(wcProvider)
}

function shortAddress(address) {
    if (!address) return ""
    let first = address.slice(0, 6)
    let last = address.slice(-4)
    return `${first}...${last}`
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
            let pp = buildProvider(connector)
            console.log(pp)
            setProvider(pp)
        }
    }, [account])

    return <SafeAreaView>
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%'
        }}>
            {!account ?
                <View>
                    <View style={{ marginTop: 150 }}></View>
                    <NftBox>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Please connect your wallet to see your bedroom NFT</Text>
                    </NftBox>
                    <View style={{ marginTop: 25 }}></View>
                    {button}
                </View>
                :
                <ConnectedContent provider={provider} account={account} disconnect={disconnect} />}
        </View>

    </SafeAreaView>
}

function NftBox({ children }) {
    return <View style={{
        width: 200,
        height: 200,
        backgroundColor: '#00000011',
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>{children}</View>
}

function ConnectedContent({ provider, account, disconnect }) {
    const mintNft = async () => {
        let p = await provider
        let contract = new p.eth.Contract(dex.abi, '0x41D0fF135f6e50e9b5Bc6e030E7573703179D960', {
            from: account
        })
        contract.methods.buyNft(0, 0).send()
            .then(console.log)
            .catch(console.log)
    }

    return <View style={{
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
        height: '100%'
    }}>
        <View style={{
            borderRadius: 15,
            backgroundColor: 'cyan',
            alignSelf: 'flex-end',
            padding: 8
        }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {shortAddress(account)}
            </Text>
        </View>

        <TouchableOpacity style={{
            alignSelf: 'center',
            marginTop: 60
        }} onPress={() => mintNft()}>
            <NftBox>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Mint your first bedroom NFT!</Text>
            </NftBox>
        </TouchableOpacity>

        <Button title='Disconnect' onPress={disconnect} />
    </View>
}