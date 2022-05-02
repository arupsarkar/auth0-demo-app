import React, { useEffect, useState, useContext, useCallback } from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { MainContent } from "./content/main"
import { LoginWithAuth0 } from "./login/auth0"
import { Auth0Provider } from "@auth0/auth0-react"
// import { MyAuth0Provider } from "./login/MyAuth0Provider"
import MyAuth0Context from "./login/MyAuth0Context"
export default function App() {

    // const[domain, setDomain] = useState('')
    // const[clientId, setClientId] = useState('')
    // const[redirecturi, setRedirecturi] = useState('')

    const auth0Details = useContext(MyAuth0Context)    

    // const domainChanged = useCallback((domain) => {
    //     console.log('---> domain callback ', domain)
    //     setDomain(domain)
    // }, [domain])

    // const clientIdChanged = useCallback((clientId) => {
    //     console.log('---> clientId callback ', clientId)
    //     setClientId(clientId)
    // }, [clientId])
    
    // const recirectUriChanged = useCallback((redirectUri) => {
    //     console.log('---> redirectUri callback ', redirectUri)
    //     setRedirecturi(redirectUri)
    // }, [redirecturi])    

    // const getAuth0Params = async () => {
    //     return new Promise((resolve, reject) => {
    //         fetchData()
    //             .then(data => {
    //                 if (data) {
    //                     console.log(JSON.stringify(data))
    //                     resolve(data)
    //                 } else {
    //                     reject('hmmm there seems to be a problem')
    //                 }
    //             })
    //             .catch(error => {
    //                 reject('there was a problem')
    //             })
    //     })
    // }

    // const fetchData = async () => {
    //     const data = await fetch('/api/getAuth0')
    //     return data
    // }

    useEffect(() => {
        console.log('---> app.js auth0 params ', auth0Details)
        console.log('---> domain ', auth0Details.state.domain)
        console.log('---> client id ', auth0Details.state.clientId)
        console.log('---> redirect uri ', auth0Details.state.redirecturi)
        // setDomain(auth0Details.state.domain)
        // setClientId( auth0Details.state.clientId)
        // setRedirecturi(auth0Details.state.redirecturi)
        // domainChanged(auth0Details.state.domain)
        // clientIdChanged(auth0Details.state.clientId)
        // recirectUriChanged(auth0Details.state.redirecturi)

        // getAuth0Params()
        //     .then(data => {
        //         console.log('---> promised data ', data)
        //         return data.json()
        //     })
        //     .then(info => {
        //         console.log('---> promised info ', JSON.stringify(info))
        //         setDomain(info.domain)
        //         setClientId(info.clientid)
        //         setRedirecturi(info.redirecturi)
        //     })
        //fetchData()
    }, [auth0Details])

    return (

                <Auth0Provider
                    domain={auth0Details.state.domain}
                    clientId={auth0Details.state.clientId}
                    redirectUri={auth0Details.state.redirecturi}
                >
                    <ChakraProvider>
                        <LoginWithAuth0></LoginWithAuth0>
                        <MainContent></MainContent>
                    </ChakraProvider>
                </Auth0Provider>

    )
}