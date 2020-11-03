import React from 'react';
import Header from './components/nheader/header';
import Gnb from './components/gnb/gnb';
import Body from './components/nbody/body';
import Footer from './components/nfooter/footer';

function App() {
  return (
    <div className="weed_wiki">
      <div className="dummy type_small">
      </div>
      <Header/>
      <Gnb/>
      <Body/>
      <div className="dummy">
      </div>
      <Footer/>
    </div>
  );
}

export default App;