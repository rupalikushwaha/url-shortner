import style from "../static/css/UserSignupForm.module.css"
import { Link } from "react-router-dom"

export default function UserLoginForm({ loginFormSubmitHandler }) {
    return (
        <>


            <form className={style.loginForm} onSubmit={loginFormSubmitHandler}>
                <p className={style.heading}>Login | URL Shortner</p>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Enter your email..." />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password..." />
                <input type="submit" value="LOGIN" className={style.submitBtn} />

                <p>Not a user? <Link to="/users/sign-up" >Sign Up</Link> </p>
            </form>
        </>


    )
}