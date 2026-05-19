import { NavLink } from "react-router";

export default function HeaderBox() {
  return (
    <>
      <div className="headerBox">
        <div className="headerBoxInner">
          <div className="headerBoxInnerLogo">LOGO</div>
          <div className="headerBoxInnerMenu">
            <NavLink to="/" className="headerBoxInnerMenuItem">Home</NavLink>
            <NavLink to="/reportList" className="headerBoxInnerMenuItem">Reports</NavLink>
            <div className="headerBoxInnerMenuItem">About me</div>
          </div>
        </div>
      </div>
    </>
  )
}