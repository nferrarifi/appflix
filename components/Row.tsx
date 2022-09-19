import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'
interface Props {
    title: string
    movies: Movie[]
}

const Row = ({title,  movies}: Props) => {
  const rowRef = useRef <HTMLDivElement> (null)
  const [isMoved, setIsMoved] = useState (false)
  const handleScroll = (direction: String) => {
    setIsMoved (true)
    if (rowRef.current) {
      const {scrollLeft, clientWidth } = rowRef.current
      const scrollDirection = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      rowRef.current.scrollTo({left: scrollDirection, behavior:"smooth"})
    }
  }


  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
        <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
        <div className='group relative md:-ml-2'>
            <ChevronLeftIcon className='rowButton' onClick={() => handleScroll ("left")} />
            <div ref= {rowRef} className='flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2'>
                {movies.map((movie) => <Thumbnail key={movie.id} movie={movie} />)}
            </div>
            <ChevronRightIcon className='rowButton right-2' onClick={() => handleScroll ("right")}/>
        </div>
    </div>
  )
}

export default Row