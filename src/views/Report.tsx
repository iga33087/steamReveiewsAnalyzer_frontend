import { useState, useEffect } from 'react'
import api from '../assets/js/api'
import dayjs from 'dayjs'
import { markdown } from 'markdown'
import { produce } from 'immer';
import global from '../assets/js/global'
import { useParams } from "react-router"
import CardBox from "../components/CardBox"
import LabelBox from "../components/LabelBox"
import ChartBox from "../components/ChartBox"
import { useSelector, useDispatch } from 'react-redux'
import { loadingChange } from '../store/globalSlice'
import * as echarts from 'echarts';

function languageChart(data) {
  if(!data) return {}
  const labels=Object.keys(data.countryObj)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: false
    },
    xAxis: {
      data: labels,
      axisLabel: {
        interval: 0,
        rotate: 45,
        inside: false,
        color: '#fff'
      },
    },
    yAxis: {
      axisLabel: {
        color: '#999'
      }
    },
    series: [
      {
        name: '好評',
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        data: labels.map(r=>data.countryObj[r].voted_up)
      },
      {
        name: '負評',
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#f68383' },
            { offset: 0.5, color: '#f01818' },
            { offset: 1, color: '#f01818' }
          ])
        },
        data: labels.map(r=>data.countryObj[r].voted_down)
      }
    ]
  }
}

function timeChart(data) {
  if(!data) return {}
  const labels=Object.keys(data.timeObj)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: false
    },
    xAxis: {
      data: labels,
      axisLabel: {
        rotate: 45,
        inside: false,
        color: '#fff'
      },
    },
    yAxis: {
      axisLabel: {
        color: '#999'
      }
    },
    series: [
      {
        name: '好評',
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        data: labels.map(r=>data.timeObj[r].all.voted_up)
      },
      {
        name: '負評',
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#f68383' },
            { offset: 0.5, color: '#f01818' },
            { offset: 1, color: '#f01818' }
          ])
        },
        data: labels.map(r=>data.timeObj[r].all.voted_down)
      }
    ]
  }
}

function wordCloudChart(data) {
  if(!data) return {}
  return {
    tooltip: {
      formatter: function (info) {
        var value = info.value;
        var treePathInfo = info.treePathInfo;
        var treePath = [];
        for (var i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        return [
          '<div class="tooltip-title">' +
            echarts.format.encodeHTML(treePath.join('/')) +
            '</div>',
          '分數: ' + echarts.format.addCommas(value)
        ].join('');
      }
    },
    series: [
      {
        type: 'treemap',
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          containLabel: false
        },
        breadcrumb: {
          show: false
        },
        data: [
          {
            name: '優點',
            children: data.report.positive.map((r)=>({name:r.title,value:r.score})),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            }
          },
          {
            name: '缺點',
            children: data.report.negative.map((r)=>({name:r.title,value:r.score})),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#f68383' },
                { offset: 0.5, color: '#f01818' },
                { offset: 1, color: '#f01818' }
              ])
            }
          }
        ]
      }
    ]
  }
}

function comprehensiveChart(data) {
  if(!data) return {}
  return {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: false
    },
    radar: {
      axisName: {
        color: '#999',
      },
      indicator: [
        { name: '故事劇情', max: 10 },
        { name: '戰鬥系統', max: 10 },
        { name: '配樂音效', max: 10 },
        { name: '玩法創新', max: 10 },
        { name: '耐玩性', max: 10 },
        { name: '難度', max: 10 }
      ]
    },
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        itemStyle: {
          color: '#188df0'    // Color of the data points and lines (unless overridden)
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        data: [
          {
            value: [
              data.report.score.story,
              data.report.score.system,
              data.report.score.music,
              data.report.score.creative,
              data.report.score.replayability,
              data.report.score.difficulty
            ],
          },
        ]
      }
    ]
  }
}

export default function Report() {
  const dispatch = useDispatch()
  const [report, setReport] = useState(null)
  const params = useParams()

  useEffect(()=> {
    init(params.id)
  },[])

  async function init(reportId) {
    dispatch(loadingChange(true))
    const data=await api.getReportOne(reportId)
    data.report.summary=markdown.toHTML(data.report.summary)
    setReport(data)
    dispatch(loadingChange(false))
  }

  return (
    <div className='report'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <img className="reportGameImg mb-3" src={report?.info?.img} style={{width:'100%'}} />
          </div>

          <div className="col-9">
              <div className="row">
                <div className="col-12 fs-1 mb-2">{report?.info?.name}</div>
                <div className="col-4 mb-3"><LabelBox title="評論總數" content={report?.total?.total_reviews}></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="好評率" content={`${report?.total?.total_positive} (${((report?.total?.total_positive / report?.total?.total_reviews).toFixed(2))*100}%)`}></LabelBox></div>
                <div className="col-4 mb-3"><LabelBox title="負評率" content={`${report?.total?.total_negative} (${((report?.total?.total_negative / report?.total?.total_reviews).toFixed(2))*100}%)`}></LabelBox></div>
                {/*
                <div className="col-6 mb-3"><LabelBox title="優點統整" content={
                  (report?.report?.positive||[]).map((item,index)=><span className='ms-2' key={index}>{item.title}</span>)
                }></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="缺點統整" content={
                  (report?.report?.negative||[]).map((item,index)=><span className='ms-2' key={index}>{item.title}</span>)
                }></LabelBox></div>
                */}
                <div className="col-6 mb-3"><LabelBox title="報告生成時間" content={`${dayjs(report?.createTime*1000).format('YYYY/MM/DD HH:mm')}　(耗時 ${global.getTimeDiff(report?.genEndTime*1000,report?.genStartTime*1000)})　(${report?.model})`}></LabelBox></div>
                <div className="col-6 mb-3"><LabelBox title="評論時間範圍" content={`${report?.timeRange?.start} ~ ${report?.timeRange?.end}　(${report?.size}個評論)`}></LabelBox></div>
              </div>
          </div>

          <div className="col-3 mb-3">
            <CardBox title="綜合評價" content={<ChartBox data={comprehensiveChart(report)} width='100%' height='300px' />} />
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