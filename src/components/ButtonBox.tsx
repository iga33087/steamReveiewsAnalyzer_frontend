export default function ButtonBox({content,onClick}:any) {
  return (
    <>
      <div className="buttonBox" onClick={onClick}>
        <div className="buttonBoxInner">
          {content}
        </div>
      </div>
    </>
  )
}