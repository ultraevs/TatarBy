import styles from "./styles.module.scss"
import yandex from "./../../assets/png/Yandex.png"
const Usefullinks = () => {
    const YandexClick = () => {
        window.location.href = "https://translate.yandex.ru/?source_lang=ru&target_lang=tt";
    };
    const DictionaryClick = () => {
        window.location.href = "https://tatar_russian.academic.ru/";
    };
    return (
        <div className={styles.usefullinks}>
            <div className={styles.usefullinks__link}>
                <div className={styles.usefullinks__link__mockup}>
                    <img src={yandex} alt="yandex_logo" width={"191px"} />
                    <button onClick={YandexClick}>Перейти</button>
                </div>
                <div className={styles.usefullinks__link__text}>
                    <h2>Рекомендуемый переводчик</h2>
                    <p>Яндекс Переводчик</p>
                </div>
            </div>
            <div className={styles.usefullinks__link}>
                <div className={styles.usefullinks__link__text}>
                    <h2>Словарь</h2>
                    <p>Татарско-русский словарь Института языка, <br/> литературы и искусства Республики Татарстан</p>
                </div>
                <div className={styles.usefullinks__link__mockup}>
                    <div className={styles.usefullinks__link__mockup__dict}>
                        <p>ТАТАРСКО-РУССКИЙ <br/> СЛОВАРЬ</p>
                    </div>
                    <button onClick={DictionaryClick}>Перейти</button>
                </div>
            </div>
        </div>
            );
}

export {Usefullinks};