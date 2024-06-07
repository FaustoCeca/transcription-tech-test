import transcript from './data/transcript.json';
import audio from './data/audio.wav';
import { useEffect, useRef, useState } from 'react';

type Message = {
  content: string;
  role: string;
  start: number;
  end: number;
}

const App = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current === null) return;
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    })
  }, []);

  const setMessageTime = (time: number) => {
    if (audioRef.current === null) return;

    audioRef.current.currentTime = time;
    audioRef.current?.play();
  }

  return (
    <div
      className="flex flex-col h-screen bg-gray-800 text-white gap-6"
    >
      {
        transcript.map((message: Message) => (
          <div
            key={message.start}
            onClick={() => setMessageTime(message.start)}
            className={`flex p-2 mx-16 rounded-lg bg-opacity-30 cursor-pointer
              ${message.role === 'user' ? 'bg-blue-500 items-start ml-4' : 'bg-green-500 mr-4 items-end'}
              ${currentTime >= message.start && currentTime < message.end ? '!bg-opacity-100' : ''}
            `}
          >
            {message.content}
          </div>
        ))
      }

      <audio
        ref={audioRef}
        className="fixed bottom-0 w-full"
        src={audio}
        controls
      />
    </div>
  )
}

export default App;