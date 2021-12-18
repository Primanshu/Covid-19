var StatesAbbreviation = {
  "AN": "Andaman and Nicobar Islands",
  "AP": "Andhra Pradesh",
  "AR": "Arunachal Pradesh",
  "AS": "Assam",
  "BR": "Bihar",
  "CH": "Chandigarh",
  "CT": "Chhattisgarh",
  "DN": "Dadra and Nagar Haveli",
  "DD": "Daman and Diu",
  "DL": "Delhi",
  "GA": "Goa",
  "GJ": "Gujarat",
  "HR": "Haryana",
  "HP": "Himachal Pradesh",
  "JK": "Jammu and Kashmir",
  "JH": "Jharkhand",
  "KA": "Karnataka",
  "KL": "Kerala",
  "LD": "Lakshadweep",
  "MP": "Madhya Pradesh",
  "MH": "Maharashtra",
  "MN": "Manipur",
  "ML": "Meghalaya",
  "MZ": "Mizoram",
  "NL": "Nagaland",
  "OR": "Odisha",
  "PY": "Puducherry",
  "PB": "Punjab",
  "RJ": "Rajasthan",
  "SK": "Sikkim",
  "TN": "Tamil Nadu",
  "TG": "Telangana",
  "TR": "Tripura",
  "UP": "Uttar Pradesh",
  "UT": "Uttarakhand",
  "WB": "West Bengal"
}

var StateWiseData = []
var totalConfirmed = 0, totalPending = 0, totalRecovered = 0, totalDeceased = 0
var totalVaccinatedDose1 = 0, totalVaccinatedDose2 = 0


$(document).ready(function () {

  //Note - Inside $.getJSON(), everything is synchronous. But outside it is asynchronous
  $.getJSON("https://data.covid19india.org/v4/min/data.min.json", function (data) {

    StateDataObject = data;
    //todo - create stateWiseData Array

    for (var key in StateDataObject) {
      var stateObject = {
        "stateName": StatesAbbreviation[key],
        "confirmed": StateDataObject[key].total.confirmed,
        "deceased": StateDataObject[key].total.deceased,
        "recovered": StateDataObject[key].total.recovered,
        "vaccinationDose1": StateDataObject[key].total.vaccinated1,
        "vaccinationDose2": StateDataObject[key].total.vaccinated2
      }

      //calculating pending cases in the current state
      var pendingCases = parseInt(stateObject.confirmed) - parseInt(stateObject.recovered) - parseInt(stateObject.deceased);
      stateObject["pending"] = pendingCases;
      console.log(stateObject.stateName , stateObject.pending)

      //Getting total numbers across India, by adding data of each state
      totalConfirmed = totalConfirmed + stateObject.confirmed;
      totalDeceased += parseInt(stateObject.deceased);
      totalPending += pendingCases;
      totalRecovered += parseInt(stateObject.recovered);
      totalVaccinatedDose1 += parseInt(stateObject.vaccinationDose1);
      totalVaccinatedDose2 += parseInt(stateObject.vaccinationDose2);

      // adding the current state data, and filtering out garbage data
      if(stateObject.stateName!=undefined)
        StateWiseData.push(stateObject);
    }

    // Removing please wait message
    $('#pleaseWait').css("display", "none");

    if (StateWiseData) {
      write2(StateWiseData);
    }
  });

});

function sortByProperty(property) {
  return function (a, b) {
    var ap = parseInt(a[property]);
    var bp = parseInt(b[property]);

    if (ap > bp)
      return -1;
    else if (ap < bp)
      return 1;

    return 0;
  }
}

function write2(stateData) {

  $('.confirmed').text(totalConfirmed);
  $('.pending').text(totalPending);
  $('.recovered').text(totalRecovered);
  $('.deaths').text(totalDeceased);

  for (var i = 0; i < stateData.length; i++) {
    var serialNo = parseInt(i+1);
    var mark = "<tr class = \"trow\"> <td style=\"padding-left:0px\"><strong>" + serialNo + '. ' + stateData[i].stateName + "</strong></td> <td>" + stateData[i].confirmed + "</td> <td>" + stateData[i].pending + "</td> <td>" + stateData[i].recovered + "</td> <td>" + stateData[i].deceased + "</td> </tr>";
    $("table").append(mark);
  }
  var row = $('tr');
  for (var i = 0; i < row.length; i++) {
    var cell = row.eq(i + 1).find("td");
    cell.eq(0).addClass("one");

    var recovered = stateData[i].recovered;
    var confirmed = stateData[i].confirmed;
    var deceased = stateData[i].deceased;
    var active = stateData[i].pending;
  }
}

function changeOrder(prop) {
  console.log(prop);
  var states = StateWiseData;
  states.sort(sortByProperty(prop));
  write2(states);
}

//sorting according to the option chosen
$('.dec').on('click', function () {
  var row = $('tr');
  for (var i = 1; i < row.length; i++) {
    row[i].remove();
  }
  changeOrder("deceased");
})

$('.rec').on('click', function () {
  var row = $('tr');
  for (var i = 1; i < row.length; i++) {
    row[i].remove();
  }
  changeOrder("recovered");
})

$('.act').on('click', function () {
  var row = $('tr');
  for (var i = 1; i < row.length; i++) {
    row[i].remove();
  }
  changeOrder("pending");
})

$('.con').on('click', function () {
  var row = $('tr');
  for (var i = 1; i < row.length; i++) {
    row[i].remove();
  }
  changeOrder("confirmed");
})



