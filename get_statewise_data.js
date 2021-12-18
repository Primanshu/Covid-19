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


$.getJSON("https://data.covid19india.org/v4/min/data.min.json", function (data) {
    console.log(data);

    StateDataObject = data;
    //todo - create stateWiseData Array

    for (var key in StateDataObject) {
        var stateObject = {
            "stateName": StatesAbbreviation[key],
            "confirmed": StateDataObject[key].total.confirmed,
            "deceased": StateDataObject[key].total.deceased,
            "recovered": StateDataObject[key].total.recovered,
            "pending": '',
            "vaccinationDose1": StateDataObject[key].total.vaccinated1,
            "vaccinationDose2": StateDataObject[key].total.vaccinationDose2
        }

        //calculating pending cases in the current state
        var pendingCases = parseInt(stateObject.confirmed) - parseInt(stateObject.recovered) - parseInt(stateObject.deceased);
        stateObject.pending = toString(pendingCases);
        
        //Getting total numbers across India, by adding data of each state
        totalConfirmed += parseInt(stateObject.confirmed);
        totalDeceased += parseInt(stateObject.deceased);
        totalPending += parseInt(stateObject.pending);
        totalRecovered += parseInt(stateObject.recovered);
        totalVaccinatedDose1 += parseInt(stateObject.vaccinationDose1);
        totalVaccinatedDose2 += parseInt(stateObject.vaccinationDose2);

        //adding the current state data 
        StateWiseData.push(stateObject);
    }

    //todo - sum it all up, total confirmed cases and other details

});

//todo - export total confirmed, deceased, recovered, pending, vaccination status
export { StateWiseData, totalConfirmed, totalPending, totalRecovered, totalDeceased, totalVaccinatedDose1, totalVaccinatedDose2 };