import UserLoginForm from "../components/UserLoginForm";
import style from "../static/css/UserSignupForm.module.css";

export default function Login({ loginFormSubmitHandler }) {

    return (
        <div className={style.container} >

            <UserLoginForm loginFormSubmitHandler={loginFormSubmitHandler} />
        </div>

    )
}