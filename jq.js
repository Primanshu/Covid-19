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

$('.act').on('click',function(){
  sortByProperty('active');
  write2(st);
})
function write2(st)
{
  for(var i=0;i<st.length;i++)
  {
    var mark = "<tr> <td><strong>"+st[i].state+"</strong></td> <td>"+ st[i].confirmed +"</td> <td>"+ st[i].active +"</td> <td>"+st[i].recovered+"</td> <td>"+st[i].deaths+"</td> </tr>" ;
    $("table").append(mark);
  }
  var row = $('tr');
  for(var i=1;i<row.length;i++){
    row.eq(i).find("td").eq(0).addClass("one");
  }
}


$.getJSON("https://api.covid19india.org/data.json",function(data){
  // console.log(data);
  console.log(data.statewise);
  var states = data.statewise;

  $('.confirmed').text(states[0].confirmed);
  $('.active').text(states[0].active);
  $('.recovered').text(states[0].recovered);
  $('.deaths').text(states[0].deaths);

  var st = states;
  st.sort(sortByProperty("confirmed"));
  console.log(st);

  write2(st);
})
