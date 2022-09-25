import Image from 'next/image'
import { Movie } from '../typings'
import {useState, useEffect} from 'react'
import { basePosterUrl } from '../constants/movie'
import {FaPlay} from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
    netflixOriginals: Movie[]
}


const Banner = ({netflixOriginals}: Props) => {
   const [randomMovie, setRandomMovie] = useState<Movie | null>(null)
   useEffect (() => {
    setRandomMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
}, [])

    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
    const moreInfoHandler = () => {
        setCurrentMovie (randomMovie)
        setShowModal (true)
    }
  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 pl-6'>
        <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
            <Image layout='fill' objectFit="cover" src={`${basePosterUrl + (randomMovie?.backdrop_path || randomMovie?.poster_path)}`} />
        </div>
        <h1 className='text-2xl md:text-4xl lg:text-7xl font-bold'>{randomMovie?.title || randomMovie?.original_title}</h1>
        <p className='text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl  '>{randomMovie?.overview}</p>

        <div className="space-y-3 md:flex md:space-x-3 md:space-y-0">
            <button className="bannerButton bg-white text-black"> <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' /> Play</button>
            <button className="bannerButton bg-[gray]/70" onClick={() => moreInfoHandler()}>More Info <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8'/></button>
        </div>
    </div>
  )
}

export default Banner