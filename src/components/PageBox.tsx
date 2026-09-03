import {ChevronLeft,ChevronRight,KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight} from '@mui/icons-material';

export default function PageBox({total,data,setPageForm}) {
  function pageList() {
    let eleArr=[]
    let maxNum=Math.ceil(total/data.limit)
    let pageArr=[]
    for(let i=data.page-3;i<=data.page+3;i++) {
      if(i>0&&i<=maxNum) pageArr.push(i)
    }
    for(let item of pageArr) {
      eleArr.push(<div className={`pageBoxInnerItem ${item===data.page&&'pageBoxInnerItemOn'}`} key={item} onClick={()=>setPageForm({...data,page:item})}>{item}</div>)
    }
    let res=<>
      <div className="pageBoxInnerItem" onClick={()=>setPageForm({...data,page:1})}><KeyboardDoubleArrowLeft /></div>
      <div className="pageBoxInnerItem" onClick={()=>setPageForm({...data,page:(data.page-1<1) ? 1:data.page-1})}><ChevronLeft /></div>
      {eleArr}
      <div className="pageBoxInnerItem" onClick={()=>setPageForm({...data,page:(data.page+1>maxNum) ? maxNum:data.page+1})}><ChevronRight /></div>
      <div className="pageBoxInnerItem" onClick={()=>setPageForm({...data,page:maxNum})}><KeyboardDoubleArrowRight /></div>
    </>
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