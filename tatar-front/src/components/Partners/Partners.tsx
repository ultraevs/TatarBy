import styles from "./styles.module.scss"

const Partners = ({ discount, description, points, imageSrc, left, bottom }: PartnersProps) => {
    return (
        <div className={styles.container__partners}>
            <div className={styles.partners}>
                <div className={styles.partners__info}>
                    <p>{discount}</p>
                    <p className={styles.partners__info__des}>{description}</p>
                </div>
                <div className={styles.partners__costs}>
                    <p>{points}</p>
                </div>
            </div>
            <img src={imageSrc} alt="partners logo" style={{left: `${left}px`, bottom: `${bottom}px` }} />
        </div>

    );
}

export { Partners }