import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import { albumsData } from '../assets/assets'
import { songsData } from '../assets/assets'
import SongItem from './SongItem'

const DisplayHome = () => {
    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className="flex overflow-auto">
                    {
                        albumsData.map((curItem, index) => (<AlbumItem key={index} name={curItem.name} image={curItem.image} desc={curItem.desc} id={curItem.id} />))
                    }
                </div>

            </div>
            <div className="mb-4">
                <h1 className='my-5 font-bold text-2xl'>Today's hits</h1>
                <div className="flex overflow-auto">
                    {
                        songsData.map((curItem, index) => (<SongItem key={index} name={curItem.name} desc={curItem.desc} image={curItem.image} id={curItem.id} />))
                    }
                </div>

            </div>
        </>
    )
}

export default DisplayHome