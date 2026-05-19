import { useState, useEffect } from 'react'
import PageBox from '../components/PageBox'
import api from '../assets/js/api'
import dayjs from 'dayjs'

export default function ReportList() {
  const [pageForm,setPageForm] = useState({
    page:1,
    limit:5,
    name:'wilds'
  })
  const [list, setList] = useState({data:[],total:0})

  useEffect(()=> {
    init(pageForm)
  },[pageForm])

  function getTimeDiff(start,end) {
    let res=''
    let key=0
    let list=['seconds','minutes','hours']
    while(true) {
      res=dayjs(start).diff(end,list[key])
      if(res>=60&&key<list.length-1) key++
      else break
    }
    return `${res} ${list[key]}`
  }

  async function init() {
    setList(await api.getReport(pageForm))
    console.log(getTimeDiff(1779077085729,1779077080729))
  }

  return (
    <div className='reportList'>
      <div className="container-fluid">
        <PageBox total={list.total} page={pageForm.page} limit={pageForm.limit} setPageForm={setPageForm} />
        <div className="row">
          <div className="col-8">
            {list.data.map(r=> (
                <div className='reportListItem' key={r['_id']['$oid']}>
                  <img className='reportListItemImg' src={r['info']['img']} />
                  <div className='reportListItemContent'>
                    <div className='reportListItemContentBox'>
                      <div className='reportListItemContentBoxTitle'>{r['info']['name']}</div>
                      <div className='reportListItemContentBoxInfo'>
                        <div className='reportListItemContentBoxInfoItem'>
                          <div className='reportListItemContentBoxInfoItemTitle'>分析模型</div>
                          <div className='reportListItemContentBoxInfoItemValue'>{r['model']}</div>
                        </div>
                        <div className='reportListItemContentBoxInfoItem'>
                          <div className='reportListItemContentBoxInfoItemTitle'>評論數量</div>
                          <div className='reportListItemContentBoxInfoItemValue'>{r['size']}</div>
                        </div>
                      </div>
                    </div>
                    <div className='reportListItemContentScore'>{r?.['report']?.['score']?.['avg']||'0'}</div>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <PageBox total={list.total} page={pageForm.page} limit={pageForm.limit} setPageForm={setPageForm} />
      </div>
    </div>
  )
}