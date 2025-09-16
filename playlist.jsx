import React from 'react';
import Player from '../player';
import { getFileName } from '../helpers';

function Playlist({ playlist, currentTrack, setCurrentTrack }) {

  const handleTrackClick = (index) => {
    setCurrentTrack(index);
    Player.setTrack(index);
  };

  const handleRemoveTrack = (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);
    // プレイリスト更新
    setCurrentTrack((prev) => {
      if (prev === index) {
        Player.stop();
        return null;
      } else if (prev > index) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleShuffle = () => {
    Player.toggleShuffle();
    alert(Player.isShuffle ? 'シャッフルON' : 'シャッフルOFF');
  };

  return (
    <div className="playlist">
      <h3>プレイリスト</h3>
      <button onClick={handleShuffle}>シャッフル</button>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} className={currentTrack === index ? 'active' : ''}>
            <span onClick={() => handleTrackClick(index)}>
              {getFileName(track)}
            </span>
            <button onClick={() => handleRemoveTrack(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
