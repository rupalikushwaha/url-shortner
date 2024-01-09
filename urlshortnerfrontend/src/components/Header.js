import { Link } from "react-router-dom"

import style from "../static/css/Header.module.css"

export default function Header({ isLogged, username, logoutBtnClickHandler }) {
    return (

        <>
            <header className={style.header} >
                <h1>URL SHORTNer</h1>
                <nav>
                    {isLogged ?
                        <ul>
                            <li>
                                <p onClick={logoutBtnClickHandler} >Log out</p>
                            </li>
                            <li>
                                <p>{username}</p>

                            </li>
                        </ul> :
                        <ul>
                            <li>
                                <Link to="/users/login" >Login</Link>
                            </li>

                            <li>
                                <Link to="/users/sign-up" >Sign up</Link>

                            </li>



                        </ul>
                    }




                </nav>


            </header>

        </>
    )

}