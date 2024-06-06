import transcript from './data/transcript.json';
import audio from './data/audio.wav';
import { useEffect, useState } from 'react';

type Message = {
  content: string;
  role: string;
  start: number;
  end: number;
}

const App = () => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    audioElement.addEventListener('timeupdate', () => {
      setCurrentTime(audioElement.currentTime);
    });
  }, []);

  const setMessageTime = (time: number) => {
    const audioElement = document.querySelector('audio') as HTMLAudioElement;
    audioElement.currentTime = time;
    audioElement.play();
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
            className={`flex p-2 mx-16 rounded-lg bg-opacity-50 cursor-pointer
              ${message.role === 'user' ? 'bg-blue-500 items-start ml-4' : 'bg-green-500 mr-4 items-end'}
              ${currentTime >= message.start && currentTime <= message.end ? 'bg-opacity-100' : ''}
            `}
          >
            {message.content}
          </div>
        ))
      }

      <audio
        className="fixed bottom-0 w-full"
        src={audio}
        controls
      />
    </div>
  )
}

export default App;