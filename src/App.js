import React from 'react';
import Header from './components/nheader/header';
import Gnb from './components/gnb/gnb';
import Body from './components/nbody/body';
import Footer from './components/nfooter/footer';

function App() {
  return (
    <div className="weed_wiki">
      <Header/>
      <Gnb/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;