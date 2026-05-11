import { useState, useEffect } from 'react'
import api from '../assets/js/api'
import CardBox from "../components/CardBox"
import LabelBox from "../components/LabelBox"
import ChartBox from "../components/ChartBox"

function languageChart(data) {
  if(!data) return {}
  const labels=Object.keys(data.countryObj)
  return {
    type:'bar',
    data:{
      labels,
      datasets: [
        {
          label: '好評',
          data: labels.map(r=>data.countryObj[r].voted_up),
          borderWidth: 1,
          backgroundColor:'rgb(67, 109, 172)'
        },
        {
          label: '負評',
          data: labels.map(r=>data.countryObj[r].voted_down),
          borderWidth: 1,
          backgroundColor:'rgb(145, 28, 28)'
        },
      ]
    },
    options:{
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
}

function timeChart(data) {
  if(!data) return {}
  const labels=Object.keys(data.timeObj)
  return {
    type:'bar',
    data:{
      labels,
      datasets: [
        {
          label: '好評',
          data: labels.map(r=>data.timeObj[r].all.voted_up),
          borderWidth: 1,
          backgroundColor:'rgb(67, 109, 172)'
        },
        {
          label: '負評',
          data: labels.map(r=>data.timeObj[r].all.voted_down),
          borderWidth: 1,
          backgroundColor:'rgb(145, 28, 28)'
        },
      ]
    },
    options:{
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
}

function wordCloudChart(data) {
  if(!data) return {}
  const labels=[
    ...data.positive.map(r=> {
      return {...r,positive:true}
    }),
    ...data.negative.map(r=> {
      return {...r,positive:false}
    }),
  ]
  const min=100/100
  return {
    type:'wordCloud',
    data:{
      labels: labels.map(r=>r.title),
      datasets: [
        {
          data: labels.map(r=>r.score*min),
          color: labels.map(r=>r.positive ? 'rgb(67, 109, 172)' : 'rgb(145, 28, 28)')
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      minRotation:0,
      title: {
        display: false,
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}

function getObj2() {
  const text=[10,20,30,40,50,100]
  const min=100/100
  return {
    type:'wordCloud',
    data:{
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
        label: '# of Votes',
        data: text.map(r=>r*min),
        color: ()=> {
          return '#f00'
          }
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      minRotation:0,
      title: {
        display: false,
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}

function comprehensiveChart(data) {
  if(!data) return {}
  return {
    type:'radar',
    data:{
      labels: ['故事劇情', '戰鬥系統', '配樂音效', '玩法創新', '耐玩性','難度'],
      datasets: [{
        label: '分',
        data: [
          data.score.story,
          data.score.system,
          data.score.music,
          data.score.creative,
          data.score.replayability,
          data.score.difficulty
        ],
      }]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: false,
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}

export default function Report() {
  
  const [test, setTest] = useState(1)
  const [info, setInfo] = useState(null)
  const [report, setReport] = useState(null)

  useEffect(()=> {
    init()
  },[])

  async function init() {
    setInfo(await api.getInfo())
    setReport(await api.getReport())
  }

  return (
    <div className='report'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <img className="reportGameImg" src={info?.info?.img} style={{width:'100%'}} />
          </div>

          <div className="col-9">
              <div className="row">
                <div className="col-12 fs-1 mb-2">{info?.info?.name}</div>
                <div className="col-4 mb-3"><LabelBox title="評論總數" content={info?.total?.total_reviews}></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="好評率" content={info?.total?.total_positive}></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="負評率" content={info?.total?.total_negative}></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="優點統整" content={
                  (report?.positive||[]).map((item,index)=><span className='ms-2' key={index}>{item.title}</span>)
                }></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="缺點統整" content={
                  (report?.negative||[]).map((item,index)=><span className='ms-2' key={index}>{item.title}</span>)
                }></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="報告生成時間" content="2026/05/01"></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="評論時間範圍" content={`${info?.timeRange?.[0]} ~ ${info?.timeRange?.[1]}`}></LabelBox></div>
              </div>
          </div>

          <div className="col-3 mb-3">
            <CardBox title="綜合評價" content={<ChartBox data={comprehensiveChart(report)} width='100%' />} />
          </div>
          <div className="col-9 mb-3">
            <CardBox title="優缺點統整" content={<ChartBox data={wordCloudChart(report)} height='300px' />} />
          </div>
          <div className="col-6 mb-3">
            <CardBox title="評論語系統計" content={<ChartBox data={languageChart(info)} height='300px' />} />
          </div>
          <div className="col-6 mb-3">
            <CardBox title="評論時間統計" content={<ChartBox data={timeChart(info)} height='300px' />} />
          </div>
          <div className="col-12 mb-3">
            <CardBox title="報告說明" content={<div className='fs-3'>{report?.summary}</div>} />
          </div>
        </div>
      </div>
    </div>
  )
}