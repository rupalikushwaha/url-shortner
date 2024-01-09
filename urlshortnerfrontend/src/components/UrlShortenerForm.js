
import style from "../static/css/UrlShortnerForm.module.css"

export default function UrlShortnerForm({ shortUrlFromSubmitHandler }) {

    return (

        <>
            <form className={style.UrlShortnerForm} onSubmit={shortUrlFromSubmitHandler} >
                <p>Paste your Url here!</p>
                <textarea name="url" placeholder="Original Url.." type="text" className={style.urlInput} />
                <input type="submit" value="Submit" className={style.submitBtn} />

            </form>


        </>
    )
}