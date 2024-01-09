import Header from "../components/Header"
import UrlShortnerForm from "../components/UrlShortenerForm"
import ShortUrl from "../components/ShortUrl"

import { useEffect } from "react"
import style from "../static/css/Home.module.css"


export default function Home({ isLogged, username, logoutBtnClickHandler, shortUrlFromSubmitHandler, shortUrl }) {


    return (

        <>
            <Header isLogged={isLogged} username={username} logoutBtnClickHandler={logoutBtnClickHandler} />


            <main className={style.mainContainer}>

                <UrlShortnerForm shortUrlFromSubmitHandler={shortUrlFromSubmitHandler} />
                {shortUrl && <ShortUrl shortUrl={shortUrl} />}


            </main>
        </>
    )
}