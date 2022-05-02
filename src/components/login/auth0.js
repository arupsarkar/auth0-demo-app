import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Text, Input, VStack } from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'
import MyAuth0Context from './MyAuth0Context'
// import regeneratorRuntime from 'regenerator-runtime'

// https://auth0.com/blog/complete-guide-to-react-user-authentication/
//https://devtrium.com/posts/how-to-use-react-usereducer-hook
// https://blog.logrocket.com/react-hooks-state-management/
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usereducercontext

export const LoginWithAuth0 = () => {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
    const [nickname, setNickname] = useState('')
    const [scipid, setScipId] = useState('')
    const [loginClicked, setLoginClicked] = useState(false)
    const auth0Details = useContext(MyAuth0Context)

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('---> login via Auth0')
        await loginWithRedirect()
            .then(info => {
                console.log(JSON.stringify(info))
            })
            .then(data => {

                console.log(JSON.stringify(data))
            })
            .catch(err => {
                console.log('exception ', err)
            })


    }
    const showProfile = async () => {
        console.log(`User ${JSON.stringify(user)}`)
        console.log(`nick name ${user.nickname}`)
        setNickname(user.nickname)
        setScipId(user.sub)
        if (user.nickname) {
            setLoginClicked(true)
        }
        console.log(`isAuthenticated ${isAuthenticated}`)
    }

    useEffect(() => {
        console.log(`User Authenticated ${isAuthenticated}`)
        console.log(`Auth Params ${JSON.stringify(auth0Details)}`)
    }, [auth0Details])

    return (
        <div>
            <Box p={4} display={{ md: 'flex' }}>
                <Box flexShrink={0}>

                    <Box flexShrink={0} mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                        <VStack>
                            <Input placeholder={auth0Details.state.domain} size='sm' />
                            <Input placeholder={auth0Details.state.clientId} size='sm' />
                            <Input placeholder={auth0Details.state.redirecturi} size='sm' />
                        </VStack>
                    </Box>



                    <Button
                        colorScheme='blue'
                        onClick={handleLogin}
                        isDisabled={isAuthenticated}>
                        Login
                    </Button>
                </Box>


                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <Button
                        colorScheme='green'
                        onClick={async () => await showProfile()}
                        isDisabled={!isAuthenticated}
                    >
                        User Details
                    </Button>
                </Box>

                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <Text mt={2} color='gray.500'>
                        Hello {nickname}
                    </Text>
                    <Text mt={2} color='gray.500'>
                        scip id: {scipid}
                    </Text>
                </Box>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <Button
                        colorScheme='red'
                        onClick={() => logout({ returnTo: window.location.origin })}
                        isDisabled={!isAuthenticated}
                    >
                        Logout
                    </Button>
                </Box>

            </Box>
        </div>


    )
}