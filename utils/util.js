function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function sliceStr(name) {
  let str = '';
  if (name.length > 12) {
    str = name.substring(0, 8) + '...';
  } else {
    str = name;
  }
  return str;
}


module.exports = {
  formatTime: formatTime,
  sliceStr: sliceStr
}
