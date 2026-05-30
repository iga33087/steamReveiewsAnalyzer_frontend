export default function PageBox({total,data,setPageForm}) {
  function pageList() {
    let res=[]
    let num=Math.ceil(total/data.limit)
    for(let i=1;i<=num;i++) {
      res.push(<div className={`pageBoxInnerItem ${i===data.page&&'pageBoxInnerItemOn'}`} key={i} onClick={()=>setPageForm({...data,page:i})}>{i}</div>)
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