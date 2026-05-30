import { useState, useEffect } from 'react'
import PageBox from '../components/PageBox'
import api from '../assets/js/api'
import { NavLink } from "react-router";
import global from '../assets/js/global'
import { useSelector, useDispatch } from 'react-redux'
import { loadingChange } from '../store/globalSlice'

export default function ReportList() {
  const dispatch = useDispatch()
  const [pageForm,setPageForm] = useState({
    page:1,
    limit:10,
    name:''
  })
  const [list, setList] = useState({data:[],total:0})

  useEffect(()=> {
    init()
  },[pageForm.page])

  async function init() {
    dispatch(loadingChange(true))
    setList(await api.getReport(pageForm))
    dispatch(loadingChange(false))
  }

  async function searchSub() {
    setPageForm({...pageForm,page:1})
    setList(await api.getReport(pageForm))
  }

  return (
    <div className='reportList'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <div className='d-flex justify-content-center align-items-center mb-3'>
              <input className="form-control me-2" type="text" value={pageForm.name} onChange={(e)=>setPageForm({...pageForm,name:e.target.value})} onKeyDown={(e)=> {if(e.key === 'Enter') searchSub()}} />
              <button className='btn btn-primary' onClick={searchSub}>Search</button>
            </div>
          </div>
        </div>
        <PageBox total={list.total} data={pageForm} setPageForm={setPageForm} />
        <div className="row">
          <div className="col-12">
            {list.data.map(r=> (
                <NavLink to={`/report/${r['_id']['$oid']}`} className='reportListItem' key={r['_id']['$oid']}>
                  <div className='reportListItemImg'>
                    <img className='reportListItemImgBox' src={r['info']['img']} />
                  </div>
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
                </NavLink>
            ))}
          </div>
        </div>
        <PageBox total={list.total} data={pageForm} setPageForm={setPageForm} />
      </div>
    </div>
  )
}