import { useState, useEffect } from 'react'
import api from '../assets/js/api'
import dayjs from 'dayjs'

export default function ReportList() {
  const [list, setList] = useState([])

  useEffect(()=> {
    init()
  },[])

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
    setList(await api.getReport())
    console.log(getTimeDiff(1779077085729,1779077080729))
  }

  return (
    <div className='reportList'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            {list.map(r=> (
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
            <div className='reportListItem'>
              <img className='reportListItemImg' src='https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg?t=1771382452' />
              <div className='reportListItemContent'>
                <div className='reportListItemContentBox'>
                  <div className='reportListItemContentBoxTitle'>Test Game 01</div>
                  <div className='reportListItemContentBoxInfo'>
                    <div className='reportListItemContentBoxInfoItem'>
                      <div className='reportListItemContentBoxInfoItemTitle'>分析模型</div>
                      <div className='reportListItemContentBoxInfoItemValue'>gemma3:4b</div>
                    </div>
                    <div className='reportListItemContentBoxInfoItem'>
                      <div className='reportListItemContentBoxInfoItemTitle'>評論數量</div>
                      <div className='reportListItemContentBoxInfoItemValue'>1000</div>
                    </div>
                  </div>
                </div>
                <div className='reportListItemContentScore'>9.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}