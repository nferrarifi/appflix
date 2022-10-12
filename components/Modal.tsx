import MuiModal from "@mui/material/Modal"
import { modalState, movieState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"
import { XIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { Element, Movie, Genre } from "../typings"
import ReactPlayer from "react-player/lazy"
import { FaPlay } from "react-icons/fa"
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid"

interface Genres {
  genres: Genre []
}

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState (movieState)
  const [trailer, setTrailer] = useState ("")
  const [genres, setGenres] = useState <Genres> ()
  const [muted, setMuted] = useState(true)
  const handleClose = () => {
    setShowModal (false)
  } 


  useEffect (() => {
    if (!movie) {
      return
    }

    async function fetchMovie () {
          const [videos, movieData] = await Promise.all ([
            fetch (`https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then ((res) => res.json()),
            fetch (`https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&`).then ((res) => res.json())
          ])
          if (videos) {
            const index = videos.results?.findIndex((element:Element) => element.type === "Trailer")
            console.log (videos.results[index]?.key)
            setTrailer (videos.results[index]?.key)
          }
          if (movieData?.genres) {
            console.log(movieData.genres)
            setGenres (movieData.genres)
          }
        }
    fetchMovie()
  }, [movie])

  return (
    <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 !left-0 !right-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll rounded-md scrollbar-hide">
        <>
          <button onClick={handleClose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
            <XIcon className="h-6 w-6" />
          </button>

          <div className="relative pt-[56.25%]">
              <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width={"100%"}
              height={"100%"}
              style= {{position: "absolute", top: "0", left: "0"}}
              playing
              muted={muted}
              />

            <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
              <div className="flex space-x-2">
                <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                  <FaPlay className="h-7 w-7 text-black" />
                  Play
                </button>
                <button className="modalButton">
                  <PlusIcon className="h-7 w-7" />
                </button>
                <button className="modalButton">
                  <ThumbUpIcon className="w-7 h-7" />
                </button>
              </div>
              <button className="modalButton" onClick={() => setMuted(!muted)}>
                {muted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
              </button>
            </div>   

          </div>
          <div className="flex rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items center space-x-2 text-sm">
                <p className="font-semibold text-green-400">{movie!.vote_average * 10}% Match</p>
                <p className="font-light ">{movie?.release_date || movie?.first_air_date}</p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>

              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{movie?.overview}</p>
                <div>
                  <div className="flex flex-col space-y-10 text-sm">
                    <span className="text-[gray]">Genres: </span>
                    {genres?.map ((genre: Genre) => genre.name).join(", ")}
                    <span className="text-[gray]">Total Votes: </span>
                    {movie?.vote_count}
                  </div>
                </div>
              </div>

            </div>
          </div>


        </>
    </MuiModal>
  )
}

export default Modal