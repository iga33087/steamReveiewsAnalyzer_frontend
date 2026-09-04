import { useRef,useEffect } from 'react'
import * as echarts from 'echarts';

export default function ChartBox1({data,width='100%',height='100%'}) {
  const obj=useRef(null) as any
  const myChart=useRef(null)

  useEffect(()=> {
    obj.current = echarts.init(myChart.current)
    window.addEventListener('resize', ()=> {
        obj.current.resize();
    });
  },[])

  useEffect(()=> {
    obj.current.setOption(data)
    obj.current.resize()
  },[data])

  return (
    <div ref={myChart} style={{ position: 'relative', width: width, height: height }}>
    </div>
  )
}