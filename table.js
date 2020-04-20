function sortByProperty(property){
   return function(a,b){
     var ap = parseInt(a[property]);
     var bp = parseInt(b[property]);

      if(ap > bp)
         return -1;
      else if(ap < bp)
         return 1;

      return 0;
   }
}
var d ;

function write2(st)
{
  for(var i=0;i<st.length;i++)
  {
    var mark = "<tr class = \"trow\"> <td><strong>"+st[i].state+"</strong></td> <td>"+ st[i].confirmed +"</td> <td>"+ st[i].active +"</td> <td>"+st[i].recovered+"</td> <td>"+st[i].deaths+"</td> </tr>" ;
    $("table").append(mark);
  }
  var row = $('tr');
  for(var i=0;i<row.length;i++){
    var cell = row.eq(i+1).find("td");
    cell.eq(0).addClass("one");

    var rec = st[i].deltarecovered;
    var con = st[i].deltaconfirmed;
    var dec = st[i].deltadeaths;

    var acti = parseInt( con ) - parseInt(rec) - parseInt(dec);
    cell.eq(1).append("<br> <span class = \"con \"> <i class = \"fa fa-caret-up \"> </i>" + con + "</span>");
    cell.eq(2).append("<br> <span class = \"act \"> <i class = \"fa fa-caret-up \"> </i>" +acti + "</span>");
    cell.eq(3).append("<br> <span class = \"rec \"> <i class = \"fa fa-caret-up \"> </i>" +rec + "</span>");
    cell.eq(4).append("<br> <span class = \"dec \"> <i class = \"fa fa-caret-up \"> </i>" +dec + "</span>");
  }
}
function changeOrder(prop)
{

  console.log(prop);


    var states = d.statewise;

    var st = states;
    st.sort(sortByProperty(prop));

    write2(st);

}
$('.dec').on('click',function(){
  var row  = $('tr');
  for(var i=1;i<row.length;i++){
    row[i].remove();
  }
  changeOrder("deaths");
})
$('.rec').on('click',function(){
  var row  = $('tr');
  for(var i=1;i<row.length;i++){
    row[i].remove();
  }
  changeOrder("recovered");
})
$('.act').on('click',function(){
  var row  = $('tr');
  for(var i=1;i<row.length;i++){
    row[i].remove();
  }
  changeOrder("active");
})
$('.con').on('click',function(){
  var row  = $('tr');
  for(var i=1;i<row.length;i++){
    row[i].remove();
  }
  changeOrder("confirmed");
})
$.getJSON("https://api.covid19india.org/data.json",function(data){
  // console.log(data);
  d = data;
  console.log(d.statewise);
  var states = d.statewise;

  $('.confirmed').text(states[0].confirmed);
  $('.active').text(states[0].active);
  $('.recovered').text(states[0].recovered);
  $('.deaths').text(states[0].deaths);

  var st = states;
  changeOrder("confirmed");
  console.log(st);

});
