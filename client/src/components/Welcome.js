import React from 'react';
import axios from 'axios';
import QuranVerse from './QuranVerse';

function Welcome() {

  const axios = require('axios');

  let config = {
    method: 'get',
  maxBodyLength: Infinity,
    url: 'https://api.quran.com/api/v4/verses/random?words=true&language=en',
    headers: { 
      'Accept': 'application/json'
    }
  };

  const randomVerse = () => {
  
  axios(config)
  .then((response) => {
    console.log(response.data)
    return response.data
    
  })
  .catch((error) => {
    console.log(error);
  });
  
  }
    return (
        <div className='frame'> 
          <h2>Welcome</h2>

          
          <QuranVerse verseData={randomVerse()} />
          <p>
            The Lytham St. Annes Islamic Society (LSA) was established by a
            dedicated group of Muslims who recognized the importance of
            fostering a strong sense of community among its members, both in
            terms of religious and social aspects. The primary objective of LSA
            is to promote religious harmony and cultivate positive relationships
            between Muslims and non-Muslims, while facilitating the integration
            of Muslims residing on the Fylde Coast into the local society. A key
            goal is to unite Muslims on the Fylde Coast under a single
            organization and actively engage in fundraising for local charitable
            initiatives.
          </p>

        <p>
          LSA stands out as an exceptional and dynamic organization that
          collaborates closely with local communities to provide essential
          services and support to our users and the broader community. We firmly
          believe that the future of our communities lies in the hands of our
          young generation, who require guidance and assistance to understand
          and shape the future effectively. LSA remains dedicated to working
          tirelessly towards peace and harmony within our communities.{" "}
        </p>
        </div>
    );
}

export default Welcome;
