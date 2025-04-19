import React, { useRef, useState } from "react";

const Videos = () => {
  const videoRefs = useRef([]);
  const overlayRefs = useRef([]);
  const [playingIndexes, setPlayingIndexes] = useState([]);

  const handlePlay = (index) => {
    const video = videoRefs.current[index];
    const overlay = overlayRefs.current[index];

    if (video.paused) {
      video.play();
      overlay.style.display = "none";
      setPlayingIndexes((prev) => [...prev, index]);
    } else {
      video.pause();
      overlay.style.display = "flex";
      setPlayingIndexes((prev) => prev.filter((i) => i !== index));
    }
  };

  const handlePause = (index) => {
    const video = videoRefs.current[index];
    const overlay = overlayRefs.current[index];
    video.pause();
    overlay.style.display = "flex";
    setPlayingIndexes((prev) => prev.filter((i) => i !== index));
  };

  const Videos = [
    { source: "/video/videos.mp4" },
    { source: "/video/videos.mp4" },
    { source: "/video/videos.mp4" },
  ];

  return (
    <>
      <div className="mainvideo">
        <div className="title text-3xl md:text-4xl font-bold font-[Montserrat] mb-6">
          <h3>Videos</h3>
        </div>
        <div className="videos flex flex-wrap gap-6 sm:gap-8 justify-center">
          {Videos.map((video, index) => (
            <div
              className="w-full sm:w-[70%] md:w-[35%] lg:w-[30%] rounded-lg overflow-hidden shadow-lg relative group"
              key={index}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.source}
                className="w-full h-[225px] object-cover"
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                controls={false}
              />

              {/* Play Overlay */}
              <button
                ref={(el) => (overlayRefs.current[index] = el)}
                className="absolute inset-0 flex items-center justify-center text-[#eb4a36] hover:border-4 transition-all duration-300"
                onClick={() => handlePlay(index)}
              >
                <svg
                  className="w-20 h-20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              {/* Pause Button */}
              {playingIndexes.includes(index) && (
                <button
                  className="absolute inset-0 flex items-center justify-center  text-[#eb4a36] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handlePause(index)}
                >
                  <svg
                    className="w-20 h-20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 5H10V19H6V5ZM14 5H18V19H14V5Z" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Videos;
