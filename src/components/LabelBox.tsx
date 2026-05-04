export default function LabelBox({title,content}) {
  return (
    <>
      <div className="labelBox">
        <div className="labelBoxTitle">{title}</div>
        <div className="labelBoxContent">{content}</div>
      </div>
    </>
  )
}