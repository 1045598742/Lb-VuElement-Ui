export const timeSeat = (val)=>{ // 时间小于10 补零
  return val>=10?val:`0${val}`
}