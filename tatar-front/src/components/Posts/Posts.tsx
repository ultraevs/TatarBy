import styles from "./styles.module.scss"
import classNames from "classnames"

import post1 from "../../assets/jpg/Post1.jpg"
import post2 from "../../assets/jpg/Post2.jpg"

const Posts = () => {
    const Click1 = () => {
        window.location.href = "https://t.me/tatarlearn/3"
    }
    const Click2 = () => {
        window.location.href = "https://t.me/tatarlearn/4"
    }
    return (
        <div className={classNames("container", styles.posts)}>
            <h3>Новости</h3>
            <div className={styles.posts__frames}>
                <div className={styles.posts__post} onClick={Click1}>
                    <img src={post1} alt="post 1" width={"307px"} height={"187px"} />
                    <p>Татарский язык - один из самых <br /> удивительных и богатых языков <br /> мира, но откуда он взялся? <br />
                        Татарский язык принадлежит к тюркской языковой семье и имеет множество общих черт с другими тюркскими языками, такими как турецкий, азербайджанский и узбекский.</p>
                </div>
                <div className={styles.posts__post} onClick={Click2}>
                    <img src={post2} alt="post 1" width={"307px"} height={"187px"} />
                    <p>Около 5 миллионов человек в мире говорят на татарском языке. 
                        Это включает в себя жителей Республики Татарстан, а также татарские диаспоры в России, Украине, Казахстане, Турции и других странах.</p>
                </div>
            </div>

        </div>
    );
}

export { Posts };