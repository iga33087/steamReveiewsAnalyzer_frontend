import dayjs from 'dayjs'

export default {
  getTimeDiff(start,end) {
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
}