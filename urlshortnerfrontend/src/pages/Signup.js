import UserSignUpForm from "../components/UserSignUpForm.js";
import style from "../static/css/UserSignupForm.module.css";

export default function Signup({ signupFormSubmitHandler }) {

    return (
        <div className={style.container} >

            <UserSignUpForm signupFormSubmitHandler={signupFormSubmitHandler} />
        </div>

    )
}