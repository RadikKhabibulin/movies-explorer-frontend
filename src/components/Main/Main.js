import { Route, Routes } from 'react-router-dom';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';

function Main() {

  return (
    <main className="main-content">
      <Promo />
      <AboutProject />
    </main>
  );
}

export default Main;
