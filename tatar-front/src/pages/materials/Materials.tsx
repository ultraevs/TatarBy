import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames";

import { MainLayout } from "../../components/MainLayout";
import { Usefullinks } from "../../components/Usefullinks/Usefullinks";
import { Video } from "../../components/Video";

const Materials = () => {
    const songs = [
        { name: "Салкын чэй", url: "https://music.yandex.ru/album/10133467/track/63611359" },
        { name: "Әлдермеш (Хания Фархи)", url: "https://music.yandex.ru/album/28116155/track/119042033" },
        { name: "Эх, дэрт бар иде", url: "https://music.yandex.ru/album/5108175/track/66877320" }
    ];
    const lessonHandleClick = (musicUrl: string) => {
        window.location.href = musicUrl
    };
    return (
        <MainLayout>
            <div className={styles.materials}>
                <div className={classNames("container")}>
                    <Usefullinks />
                    <Video videoUrl="https://www.youtube.com/embed/u9wkm3Mi1Uk" videoTitle='"Поход в магазин"' />
                    <Video videoUrl="https://www.youtube.com/embed/CSA_SK5KOjU" videoTitle='"Поздравления"' />
                    <Video videoUrl="https://www.youtube.com/embed/qe05MDDrqj8" videoTitle='"Числа"' />
                </div>
                <div className={styles.musics}>
                    {songs.map((song, index) => (
                        <div key={index} className={styles.musics__item}>
                            <div>
                                <p>{song.name}</p>
                                <button onClick={() => lessonHandleClick(song.url)}>
                                    Слушать
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </MainLayout>
    );
}

export { Materials };
