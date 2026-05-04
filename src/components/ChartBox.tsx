import { useRef,useEffect } from 'react'
import Chart from 'chart.js/auto'
import {WordCloudChart, WordCloudController, WordElement} from 'chartjs-chart-wordcloud'
Chart.register(WordCloudChart,WordCloudController,WordElement)

export default function ChartBox({data,width='100%',height='100%'}) {
  const obj=useRef(null)
  const myChart=useRef(null)

  useEffect(()=> {
    let chartData={
      type: data.type,
      data: data.data,
      options: data.options
    }
    obj.current=new Chart(myChart.current, chartData)
    return ()=> {
      if(obj.current) {
        obj.current.destroy()
        obj.current=null
      }
    }
  },[data])

  return (
    <div style={{ position: 'relative', width: width, height: height }}>
      <canvas ref={myChart}></canvas>
    </div>
  )
}