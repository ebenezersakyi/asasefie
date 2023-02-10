import React, { useRef, useState } from 'react'
import './SignIn.css'
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

import { useAuth } from "../contexts/AuthContext"

import firebase from "firebase/compat/app"
import 'firebase/compat/auth'

function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [hasAccount, setHasAccount] = useState(true)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { signup } = useAuth()
    const { login } = useAuth()

    const userSignUp = async () => {
        console.log(emailRef.current.value)
        setLoading(true)
        try{
            await signup(emailRef.current.value, passwordRef.current.value)
            .then( async (result) => {
                try{
                    const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/createuserprofile`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: emailRef.current.value
                        })
                    })
                    const data2 = await apiResponse.json()
                    // this.setState({ _id: data2.data._id })
                    console.log("data", data2.data)

                    sendAsasefieMessage()

                    firebase.firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        email: emailRef.current.value, 
                        _id: data2.data._id,  
                        isAgent: false,          
                    })
                  } catch(error) {
                      console.log(error)
                  }


                history.push("/")
                console.log(result)
            })
            .catch((error) => {
                alert(error.message)
            })
        }catch(error){
            alert("Error :",error)
        }

        setLoading(false)
    }

    const sendAsasefieMessage = async () => {
        const body = {
            firstUserEmail: "Asasefie",
            secondUserEmail: emailRef.current.value,
            firstUserMessage: "Thank you for downloading our app! We hope you enjoy using it and find it useful. If you have any feedback or suggestions, we'd love to hear from you. ",
            secondUserMessage: '',
        }
        try{
          const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/sendmessage`, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
          })
          const data2 = await apiResponse.json()
            // this.sendNotification(body.firstUserMessage)
            // this.findConversation()
          } catch(error) {
            console.log(error)
          } finally {
            
          }
    }

    const userLogIn = async () => {
        console.log(emailRef.current.value)
        setLoading(true)
        try{
            await login(emailRef.current.value, passwordRef.current.value)
            .then((result) => {
                history.push("/")
                console.log(result)
            })
            .catch((error) => {
                alert(error.message)
            })
        }catch(error){
            alert("Error :",error)
        }
        setLoading(false)
    }

  return (
    <div>
        {hasAccount?(
            <div className='sign__in'>
                <div className='input__field'>
                    <h1 style={{ margin: 40 }}>Asasefie</h1>
                    <input ref={emailRef}  placeholder='Email' type="email" />
                    <input ref={passwordRef} placeholder='Password' type="password" />
                    <Button disabled={loading} className='login__button' variant='outlined' onClick={() => userLogIn()}>
                        Log In
                    </Button>
                    <p>Forgotten you password?</p>
                </div>

                <div className='change__field' >
                    <p style={{ textAlign: 'center' }}>Don't have an account?</p> 
                    <Button onClick={()=>setHasAccount(!hasAccount)} style={{ color: 'rgb(0, 140, 255)', textAlign: 'center' }}>
                        Sign up
                    </Button>
                    {/* <Link onClick={()=>setHasAccount(!hasAccount) }><p style={{ color: 'rgb(0, 140, 255)', textAlign: 'center' }}>Sign up</p></Link> */}
                </div>

                <div className='download__img'>
                    <h3>Get the app</h3>
                    <a href='' style={{ color: 'black', textDecoration: 'none' }}>
                        <img className='image__tag' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"} alt="" />
                    </a>

                    <a href='https://play.google.com/store/apps/details?id=com.asasefie' style={{ color: 'black', textDecoration: 'none' }}>
                        <img className='image__tag' src={"https://mylapels.com/wp-content/uploads/2019/02/global-playstore.png"} alt="" />
                    </a>
                </div>
            </div>
        ):(
            <div className='sign__in'>
                <div className='input__field'>
                    <h1 style={{ margin: 40 }}>Asasefie</h1>
                    <input ref={emailRef} placeholder='Email' type="email" />
                    <input ref={passwordRef} placeholder='Password' type="password" />
                    <Button disabled={loading} className='login__button' variant='outlined' onClick={() => userSignUp()}>
                        Sign Up
                    </Button>
                    {/* <p>Forgotten you password?</p> */}
                </div>

                <div className='change__field' >
                    <p style={{ textAlign: 'center' }}>Have an account?</p> 
                    <Button onClick={()=>setHasAccount(!hasAccount)} style={{ color: 'rgb(0, 140, 255)', textAlign: 'center' }}>
                        Log in
                    </Button>
                    {/* <Link onClick={()=>setHasAccount(!hasAccount) }><p style={{ color: 'rgb(0, 140, 255)', textAlign: 'center' }}>Log in</p></Link> */}
                </div>

                <div className='download__img'>
                    <h3>Get the app</h3>
                    <a href='' style={{ color: 'black', textDecoration: 'none' }}>
                        <img className='image__tag' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"} alt="" />
                    </a>

                    <a href='https://play.google.com/store/apps/details?id=com.asasefie' style={{ color: 'black', textDecoration: 'none' }}>
                        <img className='image__tag' src={"https://mylapels.com/wp-content/uploads/2019/02/global-playstore.png"} alt="" />
                    </a>
                </div>
            </div>
        )}
        {/* <Footer/> */}
    </div>
    
  )
}

export default SignIn