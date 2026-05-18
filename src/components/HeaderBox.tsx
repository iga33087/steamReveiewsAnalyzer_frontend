export default function HeaderBox() {
  return (
    <>
      <div className="headerBox">
        <div className="headerBoxInner">
          <div className="headerBoxInnerLogo">LOGO</div>
          <div className="headerBoxInnerMenu">
            <a href="./" className="headerBoxInnerMenuItem">Home</a>
            <a href="./reportList" className="headerBoxInnerMenuItem">Reports</a>
            <div className="headerBoxInnerMenuItem">About me</div>
          </div>
        </div>
      </div>
    </>
  )
}