console.log('hello');
var prev = 0;

function getDate(test,i)
{
  var date = test[i].updatetimestamp;
  //console.log(date);
  var day = date[0]+date[1];
  var month = date[3]+date[4];
  var year = date[6]+date[7]+date[8]+date[9];
  var val = parseInt(test[i].totalpositivecases);
  if(val==0 || val==='' || val<prev){
    val = prev;
  }
  prev = val;
  var point = {x: new Date(parseInt(year),parseInt(month)-1,parseInt(day)), y:val};
  return point;
}

$.getJSON("https://api.covid19india.org/data.json",function(data){
  // console.log(data);
  //console.log(data.tested);
  var test = data.tested;
  var dataPoints = []   //[{x:new date(y,m,d), y:}]
  for(var i=0;i<test.length;i++){
    var point = getDate(test,i);
    dataPoints.push(point);
  }

  var chart = new CanvasJS.Chart("chartContainer", {
			title : {
				text : ""
			},
      axisX:{
        title: "Date",
        gridThickness: 2
      },
      axisY: {
        title: "Confirmed Cases"
      },
			data : [{
					type : "spline",
					dataPoints : dataPoints
				}
			]
		});
  chart.render();
});
