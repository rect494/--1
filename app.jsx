import React, { useState } from 'react';
import FileSelector from './components/FileSelector';
import PlayerControls from './components/PlayerControls';
import Playlist from './components/Playlist';
import Visualizer from './components/Visualizer';
import LyricsDisplay from './components/LyricsDisplay';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';
import AIPlaylist from './components/AIPlaylist';
import History from './components/History';
import ThemeManager from './components/ThemeManager';

function App() {
  const [theme, setTheme] = useState('light');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [history, setHistory] = useState([]);

  return (
    <ThemeManager theme={theme} setTheme={setTheme}>
      <div className="app-container">
        <header>
          <h1>プロ級音楽プレイヤー</h1>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>

        <aside className="sidebar">
          <FileSelector setPlaylist={setPlaylist} />
          <Playlist 
            playlist={playlist} 
            currentTrack={currentTrack} 
            setCurrentTrack={setCurrentTrack} 
          />
          <AIPlaylist playlist={playlist} setPlaylist={setPlaylist} />
        </aside>

        <main className="main-content">
          <Visualizer currentTrack={currentTrack} />
          <PlayerControls 
            currentTrack={currentTrack} 
            setCurrentTrack={setCurrentTrack} 
            playlist={playlist} 
            setHistory={setHistory}
          />
          <LyricsDisplay lyrics={lyrics} />
          <Settings theme={theme} setTheme={setTheme} />
          <History history={history} />
        </main>
      </div>
    </ThemeManager>
  );
}

export default App;
