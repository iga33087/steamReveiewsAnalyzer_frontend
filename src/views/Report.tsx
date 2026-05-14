import { useState, useEffect } from 'react'
import api from '../assets/js/api'
import dayjs from 'dayjs'
import { markdown } from 'markdown'
import { produce } from 'immer';
import { useParams } from "react-router"
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
    ...data.report.positive.map(r=> {
      return {...r,positive:true}
    }),
    ...data.report.negative.map(r=> {
      return {...r,positive:false}
    }),
  ]
  const min=70/100
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

function comprehensiveChart(data) {
  if(!data) return {}
  return {
    type:'radar',
    data:{
      labels: ['故事劇情', '戰鬥系統', '配樂音效', '玩法創新', '耐玩性','難度'],
      datasets: [{
        label: '分',
        data: [
          data.report.score.story,
          data.report.score.system,
          data.report.score.music,
          data.report.score.creative,
          data.report.score.replayability,
          data.report.score.difficulty
        ],
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 10,
          beginAtZero: true
        }
      },
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
  
  const [report, setReport] = useState(null)
  const params = useParams()

  useEffect(()=> {
    init(params.id)
  },[])

  async function init(reportId) {
    const data=await api.getReport({id:reportId})
    data.report.summary=markdown.toHTML(data.report.summary)
    setReport(data)
  }

  function consumeTime() {
    if(!report) return ''
    const date1 = dayjs(report.genStartTime*1000);
    const date2 = dayjs(report.genEndTime*1000);
    return date2.diff(date1, 'minutes')
  }

  return (
    <div className='report'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <img className="reportGameImg" src={report?.info?.img} style={{width:'100%'}} />
          </div>

          <div className="col-9">
              <div className="row">
                <div className="col-12 fs-1 mb-2">{report?.info?.name}</div>
                <div className="col-4 mb-3"><LabelBox title="評論總數" content={report?.total?.total_reviews}></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="好評率" content={`${report?.total?.total_positive} (${((report?.total?.total_positive / report?.total?.total_reviews).toFixed(2))*100}%)`}></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="負評率" content={`${report?.total?.total_negative} (${((report?.total?.total_negative / report?.total?.total_reviews).toFixed(2))*100}%)`}></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="優點統整" content={
                  (report?.report?.positive||[]).map((item,index)=><span className='ms-2' key={index}>{item.title}</span>)
                }></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="缺點統整" content={
                  (report?.report?.negative||[]).map((item,index)=><span className='ms-2' key={index}>{item.title}</span>)
                }></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="報告生成時間" content={`${dayjs(report?.createTime*1000).format('YYYY/MM/DD HH:mm')}　(${consumeTime()})　(${report?.model})`}></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="評論時間範圍" content={`${report?.timeRange?.start} ~ ${report?.timeRange?.end}　(${report?.size}個評論)`}></LabelBox></div>
              </div>
          </div>

          <div className="col-3 mb-3">
            <CardBox title="綜合評價" content={<ChartBox data={comprehensiveChart(report)} width='100%' />} />
          </div>
          <div className="col-9 mb-3">
            <CardBox title="優缺點統整" content={<ChartBox data={wordCloudChart(report)} height='300px' />} />
          </div>
          <div className="col-6 mb-3">
            <CardBox title="評論語系統計" content={<ChartBox data={languageChart(report)} height='300px' />} />
          </div>
          <div className="col-6 mb-3">
            <CardBox title="評論時間統計" content={<ChartBox data={timeChart(report)} height='300px' />} />
          </div>
          <div className="col-12 mb-3">
            <CardBox title="報告說明" content={<div className='fs-4' dangerouslySetInnerHTML={{ __html: report?.report?.summary }}></div>} />
          </div>
        </div>
      </div>
    </div>
  )
}