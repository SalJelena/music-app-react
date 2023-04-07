import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause,  setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img src={song?.images?.coverart} alt={song?.title} className="w-10 h-10 rounded-lg" />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-base font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/songs/${song.artists[0].adamid}`}>
            <p className="text-base font-bold text-gray-300 mt-1">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause 
        isPlaying={isPlaying} 
        activeSong={activeSong} 
        song={song} 
        handlePause={handlePauseClick} 
        handlePlay={handlePlayClick} 
      />
    </div>
  ) 
}

const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data} = useGetTopChartsQuery();
  const topPlays = data?.slice(0,5);
  
  const handlePauseClick = () => {
    dispatch(playPause(true))
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  return (
    <div  className="mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => <TopChartCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song, i)} />)}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>

          <div className="xl:overflow-visible w-full left-0 relative">
            <Swiper 
              slidesPerView="auto"
              spaceBetween={15}
              freeMode
              centeredSlides
              centeredSlidesBounds
              modules={[FreeMode]}
              className="mt-4 xl:overflow-visible"
            >
              {topPlays?.map((song, i) => <SwiperSlide 
                key={song.key}
                style={{width: '25%', height: 'auto'}}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adaimid}`}>
                  <img src={song?.images.background} alt="name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>)}
            </Swiper>
          </div>

        </div>
      </div>
      
    </div>
  )

}

export default TopPlay;
