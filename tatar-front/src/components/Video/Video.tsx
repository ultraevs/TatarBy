import styles from "./styles.module.scss"



const Video: React.FC<VideoProps> = ({ videoUrl, videoTitle }) => {
    return (
        <div className={styles.video__container}>
            <iframe 
                width="960" 
                height="600" 
                src={videoUrl} 
                style={{border:0}} 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title={videoTitle}
            ></iframe>
            <p>Видео-урок {videoTitle}</p>
        </div>
    );
};

export {Video};

