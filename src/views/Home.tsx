import { useState, useEffect } from 'react'
import api from '../assets/js/api'
import ButtonBox from "../components/ButtonBox"
import CardBox from "../components/CardBox"
import { useDispatch } from 'react-redux'
import { loadingChange } from '../store/globalSlice'

export default function Home() {
  const dispatch = useDispatch()
  const [model, setModel] = useState([])
  const [form, setForm] = useState({
    id: '',
    model: '',
    size: '',
    refer: false
  })

  useEffect(()=> {
    init()
  },[])

  async function init() {
    dispatch(loadingChange(true))
    setModel(await api.getModel())
    dispatch(loadingChange(false))
  }

  async function genReport() {
    dispatch(loadingChange(true))
    let res = await api.genReport(form)
    location.href = `./report/${res.id}`
  }

  return (
    <div className='home'>
      <div className="homeBox">
        <CardBox title="請輸入遊戲ID或是網址" content={
          <>
            <div className='container-fluid'>
              <div className="row">
                <div className='col-12 col-md-6 mb-3'>
                  <input className='homeBoxInputBox' type='text' value={form.id} onChange={(e)=>setForm({...form,id:e.target.value})} />
                </div>
                <div className='col-12 col-md-3 mb-3'>
                  <select className='homeBoxInputSelect' value={form.model} onChange={(e)=>setForm({...form,model:e.target.value})}>
                    <option value=''>請選擇模型</option>
                    {model.map((r:any)=> <option value={r.name} key={r.name}>{r.name}</option>)}
                  </select>
                </div>
                <div className='col-12 col-md-3 mb-3'>
                  <select className='homeBoxInputSelect' value={form.size} onChange={(e)=>setForm({...form,size:e.target.value})}>
                    <option value=''>請選擇評論數</option>
                    <option value={10}>前10個評論</option>
                    <option value={30}>前30個評論</option>
                    <option value={50}>前50個評論</option>
                    <option value={100}>前100個評論</option>
                    <option value={300}>前300個評論</option>
                    <option value={500}>前500個評論</option>
                    <option value={800}>前800個評論</option>
                    <option value={1000}>前1000個評論</option>
                  </select>
                </div>
                <div className='col-12 col-md-3 mb-3'>
                  <div className='form-check'>
                    <input className="form-check-input" type="checkbox" value={form.refer} id="flexCheckChecked" onChange={(e)=>setForm({...form,refer:e.target.checked ? true : false})} />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                      參考範例文本
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-end'>
              <ButtonBox content="Generate" onClick={genReport} />
            </div>
          </>
        } />
      </div>
    </div>
  )
}