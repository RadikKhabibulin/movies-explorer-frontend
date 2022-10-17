import Navigation from "../Navigation/Navigation";

function Sidebar({loggedIn, isOpen, onClose}) {

  return (
    loggedIn &&
    <nav className={`sidebar ${isOpen ? 'sidebar_sidebar-opened' : ''}`}>
      <div className="sidebar__container">
        <button className="sidebar__close" onClick={onClose}></button>
        <div className="sidebar__nav">
          <Navigation loggedIn={loggedIn} inHeader={false} onClose={onClose}/>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
