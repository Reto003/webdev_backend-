import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/kpk0d81oh/moodify/song/fileName_UGnRQhs-k",
    posterUrl: "https://tse1.mm.bing.net/th?id=OIP.7n9s8l2XoQh0jKZy3mLz5gHaHa&pid=Api&P=0",
    title: "Deewaana_Deewaana_128KBPS.mp4",
    mood: "sad",
  });
  const [loading, setLoading] = useState(false);

  return(
    <songContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </songContext.Provider>
  )

};
