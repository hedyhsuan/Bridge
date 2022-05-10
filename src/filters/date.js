export default function (num){

const date=new Date(num*1000);

var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = date.getDate() + ' ';
// var h = date.getHours() + ':';
// var m = date.getMinutes() + ':';
// var s = date.getSeconds(); 
const newDate=Y+M+D;
return newDate;
// return date;
}