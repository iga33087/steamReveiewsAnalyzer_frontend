import { useState, useEffect } from 'react'
import api from '../assets/js/api'
import ButtonBox from "../components/ButtonBox"
import CardBox from "../components/CardBox"

export default function Home() {
  const [model, setModel] = useState([])
  const [form, setForm] = useState({
    id: '',
    model: '',
    size: ''
  })

  useEffect(()=> {
    init()
  },[])

  async function init() {
    setModel(await api.getModel())
  }

  async function genReport() {
    let res = await api.genReport(form)
    location.href = `./report/${res.id}`
  }

  return (
    <div className='home'>
      <div className="homeBox">
        <CardBox title="請輸入遊戲ID或是網址" content={
          <>
            <div className='d-flex align-items-center justify-content-center mb-4'>
              <input className='homeBoxInputBox' type='text' value={form.id} onChange={(e)=>setForm({...form,id:e.target.value})} />
              <select className='homeBoxInputSelect' value={form.model} onChange={(e)=>setForm({...form,model:e.target.value})}>
                <option value=''>請選擇模型</option>
                {model.map(r=> <option value={r.name} key={r.name}>{r.name}</option>)}
              </select>
              <select className='homeBoxInputSelect' value={form.size} onChange={(e)=>setForm({...form,size:e.target.value})}>
                <option value=''>請選擇評論數</option>
                <option value={100}>前100個評論</option>
                <option value={300}>前300個評論</option>
                <option value={500}>前500個評論</option>
                <option value={800}>前800個評論</option>
                <option value={1000}>前1000個評論</option>
              </select>
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