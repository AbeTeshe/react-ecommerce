import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { auth } from '../../firebase';
import "./login.css";
import { setUser } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth) {
                    dispatch(setUser(auth.user));
                    navigate("/");
                }
            }).catch(error=> alert(error.message));
    }

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth) {
                    dispatch(setUser(auth.user));
                    navigate("/");
                }
            })
            .catch(error => alert(error.message));
    }

  return (
    <div className="login">
         <div className='login__container'>
            <h1>Sign-in</h1>
            <form >
                <h5>E-mail</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit" onClick={signIn} className='login__signInButton'>Sign In</button>
            </form>
            <button onClick ={register} className='login__registerButton'>Create Account</button>
        </div>
    </div>
  )
}

export default Login;