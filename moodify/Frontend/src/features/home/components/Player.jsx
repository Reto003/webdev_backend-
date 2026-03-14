import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80";

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.playbackRate = speed;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, [speed, song?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();
  }, [song?.url]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio playback failed", error);
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const handleProgressChange = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newTime = (Number(event.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="player-card">
      <div className="player-card__visual">
        <img
          className="player-card__poster"
          src={song?.posterUrl || FALLBACK_POSTER}
          alt={song?.title || "Current track"}
        />
        <div className="player-card__glow" />
      </div>

      <div className="player-card__body">
        <div className="player-card__meta">
          <p className="player-card__eyebrow">Moodify Player</p>
          <h3 className="player-card__title">{song?.title || "No track selected"}</h3>
          <p className="player-card__mood">Mood: {song?.mood || "Unknown"}</p>
        </div>

        <audio ref={audioRef} src={song?.url} preload="metadata" />

        <div className="player-card__progress">
          <input
            className="player-card__slider"
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
          />
          <div className="player-card__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-card__controls">
          <button className="player-card__chip" onClick={() => skip(-10)} type="button">
            -10s
          </button>
          <button className="player-card__play" onClick={togglePlayPause} type="button">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="player-card__chip" onClick={() => skip(10)} type="button">
            +10s
          </button>
        </div>

        <div className="player-card__footer">
          <label className="player-card__speed-label" htmlFor="player-speed">
            Speed
          </label>
          <select
            className="player-card__speed"
            id="player-speed"
            value={speed}
            onChange={handleSpeedChange}
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Player;
