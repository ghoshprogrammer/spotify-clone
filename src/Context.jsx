import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "./assets/assets";

const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {

    const [track, setTrack] = useState(songsData[2])
    const [playStatus, setPlayStatus] = useState(false)

    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }

    })
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()
    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)

    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    },
                })
            }


        }, 1000)
    }, [audioRef])

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)

    }
    const playWithId = async (id) => {
        await setTrack(songsData[id])
        await audioRef.current.play()
        setPlayStatus(true)

    }

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play()
            playStatus(true)
        }
    }

    const next = async () => {
        if (track.id < songsData.length) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play()
            playStatus(true)
        }
    }

    const seekSong=async(event)=>{
           audioRef.current.currentTime=((event.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        time,
        setTime,
        playStatus,
        setPlayStatus,
        track,
        setTrack,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong


    }


    return <PlayerContext.Provider value={contextValue}>
        {children}
    </PlayerContext.Provider>
}

export default PlayerContextProvider
export { PlayerContext }