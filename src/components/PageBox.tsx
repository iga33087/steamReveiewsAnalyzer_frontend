export default function PageBox({total,page,limit,setPageForm}) {
  function pageList() {
    let res=[]
    let num=Math.ceil(total/limit)
    for(let i=1;i<=num;i++) {
      res.push(<div className={`pageBoxInnerItem ${i===page&&'pageBoxInnerItemOn'}`} key={i} onClick={()=>setPageForm({limit:limit,page:i})}>{i}</div>)
    }
    return res
  }

  return (
    <div className="pageBox">
      <div className="pageBoxInner">
        {pageList()}
      </div>
    </div>
  )
}