import { Route, Routes } from 'react-router-dom';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';

function Main() {

  return (
    <main className="main-content">
      <Promo />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default Main;
