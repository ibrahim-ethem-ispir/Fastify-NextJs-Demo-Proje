import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import Styles from "../styles/Home.module.css"
import {FaFacebookF} from "react-icons/fa"
import {BsGoogle, BsTwitter, BsFillPersonFill} from "react-icons/bs"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import cookie from "js-cookie"

function loginAndRegister() {
    const router = useRouter()
    const successMessage = () => toast.success(`User Registration Successful`)
    const errorMessage = () => toast.error(`passwords are not the same`)
    // Register 
    const [userNameReg,setUserName] = useState("")
    const [emailReg,setEmail] = useState("")
    const [passwordReg,setPassword] = useState("")
    const [passwordConfirmReg,setPasswordConfirm] = useState("")


    async function handlerRegister() {
        if (passwordReg === passwordConfirmReg) {
            const registerInfo = {
                userName : userNameReg,
                email: emailReg,
                password: passwordReg
            }
    
            const register = await fetch("http://localhost:3002/api/register",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerInfo)
            }).then(() => successMessage())
        }
        else{
            errorMessage()
        }
       
    }
    // login
    const [userNameLog,setUserNameLog] = useState("")
    const [PasswordLog,setPasswordLog] = useState("")

    async function handleLogin() {
        const loginInfo = {
            userName : userNameLog,
            password: PasswordLog
        }

        const login =  await fetch("http://localhost:3002/api/login",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        }).then(() => {
            cookie.set("token" , "6d1fa12afa41ggsd,sd5=t!sa" , {expires:7} )
            router.push("/login-confirm")
        })
    }

    return (
        <div className={Styles.container, Styles.backgroundImage}>
            <div className={Styles.backgroundColor}>
                <Head>
                    <title>Login And Register</title>
                    <meta name="description" content="Demo Projects Nextjs" />
                    <meta name="viewport" content="width_device-width, initial-scale=1.0" />
                </Head>
                <div className={Styles.loginAndRegister}>

                    <div className={Styles.register}>
                        <span className={Styles.registerHeader}>Sing up</span>
                        <div className={Styles.strike}>
                            <span>with your social network</span>
                        </div>
                        <br />
                        <div>
                            <a  className={Styles.socialIcon} href="#"> <FaFacebookF  size={24} /></a>
                            <a  className={Styles.socialIcon} href="#"><BsGoogle size={24} /></a>
                            <a  className={Styles.socialIcon} href="#"><BsTwitter size={24} /></a>
                        </div>
                        <br />
                        <div className={Styles.strike}>
                            <span>or</span>
                        </div>

                        <form>
                            <div>
                                <label htmlFor="userName">Login</label>
                                <input id="userName" onChange={e => {setUserName(e.target.value)}}  placeholder="Your Name" type="text" required />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" onChange={e => {setEmail(e.target.value)}}  autoComplete="email" type="text" placeholder="Your Email" required />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input id="password" onChange={e => {setPassword(e.target.value)}} autoComplete="password" type="password" placeholder="Password" required />
                            </div>
                            <div>
                                <label htmlFor="passwordConfirm">Confirmation</label>
                                <input id="passwordConfirm" onChange={e => {setPasswordConfirm(e.target.value)}} placeholder="Confirm" type="password" required />
                            </div>
                            <Link href="#">
                                <a>Forget Your Password?</a>
                            </Link>
                            <br /><br />
                            <button type="reset" onClick={() => handlerRegister()} >Sing up</button>
                            <br />
                            <ToastContainer />
                            <div>
                                ı have an account! <Link href="#"><a>Log in</a></Link>
                            </div>
                        </form>
                    </div>

                    <div className={Styles.login}>
                        <br />
                        <span className={Styles.loginHeader}>Log in</span>
                        <br />
                        <form>
                            <div>
                                <label htmlFor="userName">Login</label>
                                <input id="userName"  onChange={e => {setUserNameLog(e.target.value)}} placeholder="Your Name" type="text" autoComplete="userName" required />
                            </div>
                            <br />
                            
                            <div>
                                <label htmlFor="password">Password</label>
                                <input id="password" onChange={e => {setPasswordLog(e.target.value)}} type="password" placeholder="Password" autoComplete="password" required />
                            </div>
                            <br />
                            <ToastContainer />
                            <Link href="#">
                                <a>Forget Your Password?</a>
                            </Link>
                            <br />
                            <br />
                            <input type="checkbox" id="checkbox"/>
                            <span htmlFor="checkbox">Remember the password</span>
                            
                            <br /><br />
                            <button type="button" onClick={() => handleLogin() }>Log in</button>
                            
                        
                        </form>        

                    </div>
                    <style jsx>{`
                                form > div {
                                    width: 70%;
                                    margin: auto;
                                    padding: 1%;
                                }
                                input {
                                background: #f2f2f2; 
                                padding: 8px; 
                                width: 100%;
                                border-radius: 5px;
                                }
                                label {
                                    float: left;
                                    padding-left: 15px;
                                    font-weight: 500;
                                }
                                a {
                                    color: blue;
                                    text-decoration: underline;
                                }
                                button {
                                    padding: 12px 90px 12px 90px;
                                    border-radius: 8px;
                                    background: #0070f3;
                                    color: white;
                                    font-size: 1.1rem
                                }
                               
                                `}</style>
                </div>
            </div>
        </div>
    )
}


export default loginAndRegister