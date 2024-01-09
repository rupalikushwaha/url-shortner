import style from "../static/css/ShortUrl.module.css"

export default function ShortUrl({ shortUrl }) {

    return (

        <div className={style.container}>
            <p className={style.text} >
                {shortUrl}
            </p>

        </div>
    )
}