import React from 'react';
import QURAN_CHAPTERS from './surahs';
const Menu = ({onUpdate}) => {

    const handleClick = (e) => {
        console.log(e.target.value);
        onUpdate(e.target.value);
    }
    
    return (
        <div >
          <ul className="select-list">
            {QURAN_CHAPTERS.map((surah, index) => (
              <li className='list-item' key={index} value={index + 1} >
                <button onClick={handleClick} className='hidden' key={index} value={index + 1}>
                {surah}
                </button>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default Menu;