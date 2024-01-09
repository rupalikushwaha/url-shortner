import style from "../static/css/UserSignupForm.module.css"
import { Link } from "react-router-dom"




export default function UserSignUpForm({ signupFormSubmitHandler }) {



    return (<>
        <div className={style.container} >
            <form className={style.form} onSubmit={signupFormSubmitHandler}>
                <p className={style.heading} >Sign up | URL Shortner</p>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name..." />

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Enter your email..." />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password..." />


                <label htmlFor="confirm_password">Confirm Password:</label>
                <input
                    type="password" id="confirm_password" name="confirm_password" placeholder="Re-enter your password..."
                />
                <input type="submit" value="SIGN UP" className={style.submitBtn} />

                <p>Already a user? <Link to="/users/login" >Login</Link> </p>
            </form>

        </div>
    </>)
}