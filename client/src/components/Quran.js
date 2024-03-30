import React, { useEffect, useState } from "react";
import axios from "axios";
import SurahList from "./SurahList";
import QURAN_CHAPTERS from "./surahs";

function Quran() {

  const [surahNumber, setSurahNumber] = useState(1);
  const [ayaat, setAyaat] = useState({});
  const [search, setSearch] = useState([]);
  const [word, setWord] = useState('');
  const [tab, setTab] = useState('reading');

  useEffect(() => {
    getSurah();
  }, [surahNumber]);

  const getSurah = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/surah/${surahNumber}`);
      setAyaat(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const wordSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/rootsearch/${word}`);
      setSearch(res.data);
      console.log(Object.keys(res.data));
      console.log(typeof res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="frame">
      <h1>Qur'an API</h1>
      <div className="divider"></div>
      <button className="btn" onClick={() => setTab('reading')}>Reading</button>
      <button className="btn" onClick={() => setTab('search')}>Search</button>
      {tab === 'reading' ?
        <div className="reading">
          <div className="col-3">
            <SurahList onUpdate={setSurahNumber} />
          </div>
          <div className="col-9">
            <h2>{ayaat.Chapter}</h2>
            <div>
              {ayaat.normal &&
                ayaat.normal.map((aya, idx) => (
                  <p className="aya" key={idx}>
                    <span>{aya}</span> {" "}
                    <span>{idx + 1}. </span>

                  </p>
                ))}
            </div>
          </div>
        </div>
        :
        <div className="reading">
          <div className="col-3">
          <h3>Search for a word in the Qur'an</h3>
          <input className="search" type="text" onChange={(e) => setWord(e.target.value)} />
          <button className="btn" onClick={wordSearch}>Search</button>
          </div>
          <div className="col-9">
            {search &&
              search.map((instance, idx) => (
                <p className="aya" key={idx}>
                  <span>{QURAN_CHAPTERS[instance[0]]}, </span> 
                  <span>Ayah: {instance[1]} </span> 
                  <span>{instance[2]} </span> 
                </p>
              ))}
          </div>
        </div>
      }
    </div>
  );
}


export default Quran;