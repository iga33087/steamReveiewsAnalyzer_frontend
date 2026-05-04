export default function CardBox({title,content}) {
  return (
    <>
      <div className="cardBox">
        <div className="cardBoxTitle">{title}</div>
        <div className="cardBoxContent">
          {content}
        </div>
      </div>
    </>
  )
}