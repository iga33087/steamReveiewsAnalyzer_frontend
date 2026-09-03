export default function CardBox({title,content}:any) {
  return (
    <>
      <div className="cardBox">
        <div className="cardBoxInner">
          <div className="cardBoxTitle">{title}</div>
          <div className="cardBoxContent">
            {content}
          </div>
        </div>
      </div>
    </>
  )
}