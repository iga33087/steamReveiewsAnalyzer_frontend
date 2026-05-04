import { useState } from 'react'
import CardBox from "../components/CardBox"
import LabelBox from "../components/LabelBox"
import ChartBox from "../components/ChartBox"

function getObj(data) {
  return {
    type:'bar',
    data:{
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [data, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor:'rgb(67, 109, 172)'
        },
        {
          label: '# of Votes',
          data: [data, 19, 3, 5, 2, 3],
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

function getObj2() {
  const text=[10,20,30,40,50,100]
  const min=100/100
  return {
    type:'wordCloud',
    data:{
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: text.map(r=>r*min),
      }]
    },
    options: {
      maintainAspectRatio: false,
      minRotation:0,
      title: {
        display: false,
        text: "Chart.js Word Cloud"
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}

function getObj3() {
  return {
    type:'radar',
    data:{
      labels: ['故事劇情', '戰鬥系統', '配樂音效', '玩法創新', '耐玩性','難度'],
      datasets: [{
        label: '# of Votes',
        data: [100,80,60,50,90,60],
      }]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: false,
        text: "Chart.js Word Cloud"
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
  return (
    <div className='report'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <img className="reportGameImg" src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/header.jpg" style={{width:'100%'}} />
          </div>
          <div className="col-9">
              <div className="row">
                <div className="col-12 fs-1 mb-2">Persona 5 Royal</div>
                <div className="col-4 mb-3"><LabelBox title="評論總數" content="123,059"></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="好評率" content="95%"></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="負評率" content="5%"></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="優點統整" content="..."></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="缺點統整" content="..."></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="報告生成時間" content="2026/05/01"></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="評論時間範圍" content="2026/05/01 ~ 2026/05/02"></LabelBox></div>
              </div>
          </div>

          <div className="col-3 mb-3">
            <CardBox title="綜合評價" content={<ChartBox data={getObj3()} width='100%' />} />
          </div>
          <div className="col-9 mb-3">
            <CardBox title="優缺點統整" content={<ChartBox data={getObj2()} height='300px' />} />
          </div>
          <div className="col-6 mb-3">
            <CardBox title="評論語系統計" content={<ChartBox data={getObj(test)} height='300px' />} />
          </div>
          <div className="col-6 mb-3">
            <CardBox title="評論時間統計" content={<ChartBox data={getObj(test)} height='300px' />} />
          </div>
          <div className="col-12 mb-3">
            <CardBox title="報告說明" content="111111111" />
          </div>
        </div>
      </div>
    </div>
  )
}