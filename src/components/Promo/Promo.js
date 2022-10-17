function Promo() {
  return (
    <section className="section promo">
      <div className="promo__container">
        <div className="promo__intro">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб‑разработки.
          </h1>
          <p className="promo__text-detailed">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="promo__button-detailed" onClick={()=>{document.location='#about-project'}}>Узнать больше</button>
        </div>
        <div className="promo__image" title="Planet"/>
      </div>
    </section>
  );
}

export default Promo;
