import React from 'react'
import { Button, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import * as crypto from 'crypto'

export default function FitbitAuthScreen(props) {

    function handleWebNavigationState(newNavState) {
        if (newNavState.url.includes('?code=')) {
            // TODO: extract auth code and send it to our server
            // so we can read sleep data and produce rewards
            props.onSuccessAuth()
        }
    }

    function buildFitbitAuthUrl() {
        let codeVerifier = crypto.randomBytes(48).toString()
        let hash = crypto.createHash('sha256').update(codeVerifier).digest('base64')
        let params = new URLSearchParams({
            client_id: '',
            scope: 'sleep',
            code_challenge: hash,
            code_challenge_method: 'S256',
            response_type: 'code'
        })
        let url = new URL('https://www.fitbit.com/oauth2/authorize')
        url.searchParams = params
        return url.toString()
    }

    buildFitbitAuthUrl()

    return <WebView
        source={{ uri: buildFitbitAuthUrl() }}
        onNavigationStateChange={handleWebNavigationState}
    />
}