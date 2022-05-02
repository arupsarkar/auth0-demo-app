import MyAuth0Context from "./MyAuth0Context";
import React, {useState, useEffect, useReducer} from "react";


const initialState = {
    domain: 'dev-2xjf75by.us.auth0.com',
    clientId: 'm7aVEdkwniIWt5l7qtsb3OqXyLGdCUN2',
    redirecturi: 'https://auth0-react-demo.herokuapp.com'        
}

const reducer = (state, action) => {
    
    console.log('state', state)
    console.log('action payload', action.payload)

    switch(action.type) {
        case 'publishAuth0Params':
            return {
                ...state, 
                [action.payload.key]: action.payload.value,
            }
    }
}

export const MyAuth0Provider = (props) => {

    // const auth0Params = {
    //         domain: 'dev-2xjf75by.us.auth0.com',
    //         clientId: 'm7aVEdkwniIWt5l7qtsb3OqXyLGdCUN2',
    //         redirecturi: 'http://localhost:3000'
    // }



    // const auth0Params = {
    //     domain: 'dev-2xjf75by.us.auth0.com',
    //     clientId: 'm7aVEdkwniIWt5l7qtsb3OqXyLGdCUN2',
    //     redirecturi: 'http://localhost:3000'
    // }

    // const [domain, setDomain] = useState('no domain')
    // const [clientId, setClientId] = useState('no clientId')
    // const [redirecturi, setRedirecturi] = useState('no redirect uri')
    // const [auth0params, setAuth0Params] = useState(auth0Params)


    const getAuth0Params = async () => {
        return new Promise((resolve, reject) => {
            fetchData()
                .then(data => {
                    if(data){
                        console.log(JSON.stringify(data))
                        resolve(data)
                    }else{
                        reject('hmmm there seems to be a problem')
                    }
                })
                .catch(error => {
                    reject('there was a problem')
                })
        })
    }

    const fetchData = async () => {
        const data = await fetch('/api/getAuth0')
        return data
            // .then(res => {
            //     return res.json()
            //     //console.log(JSON.stringify(res))
            // })
            // .then(data => {
            //     setDomain(data.domain)
            //     setClientId(data.clientid)
            //     setRedirecturi(data.redirecturi)
            //     console.log(data.domain)
            //     console.log(data.clientid)
            //     console.log(data.redirecturi)
            //     return data
            // })
            // .catch(error => {
            //     console.log('---> exception ', error)
            // })
    }

    useEffect(() => {
        getAuth0Params()
            .then(data => {
                console.log('---> promised data ', data)
                return data.json()
            })
            .then(info => {
                console.log('---> promised info ', JSON.stringify(info))
                // auth0Params.domain = info.domain
                // auth0Params.clientId = info.clientid
                // auth0Params.redirecturi = info.redirecturi
                // console.log('---> promised array ', {...auth0Params})
                // setDomain(info.domain)
                // setClientId(info.clientid)
                // setRedirecturi(info.redirecturi)
                dispatch({
                    type: 'publishAuth0Params',
                    payload: {key: 'domain', value: info.domain}
                })
                dispatch({
                    type: 'publishAuth0Params',
                    payload: {key: 'clientId', value: info.clientid}
                })
                dispatch({
                    type: 'publishAuth0Params',
                    payload: {key: 'redirecturi', value: info.redirecturi}
                })                                
            })
    }, [])    
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <MyAuth0Context.Provider
            value={{state, dispatch}}
        >
            {props.children}
        </MyAuth0Context.Provider>
    )

}