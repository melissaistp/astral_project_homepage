//Event listener that detects scrolling in order to change the fixed navbar's bg color
window.addEventListener('scroll', function(e) {
    
    let navbar = document.getElementById("nav");

    if(window.scrollY <= navbar.offsetHeight){ 
      navbar.className = ''; 
    }
    else {
      navbar.className = 'scrolled'
  }
  });


//Random number picker up to 100th decimal point between in a range
let precision=100;
function randomnum(max, min) {
  return Math.floor(Math.random() * (max*precision - min*precision) + min*precision)/precision;
}

//Converty frequency of sleeping together to a color
function convertFrequency(frequency) { 
  switch(frequency) {
    case("Never"):
      return 0;
    case ("Once a year or less") :
      return randomnum(1,0);
    case("Once a month or less"):
      return randomnum(12,1);
    case ("A few times per month") :
      return randomnum(30,12);
    case("A few times per week"):
      return randomnum(300,30);
    case("Every night"):
      return randomnum(365,300);
  }
}

//Convert the length of relationship to a number used for x-axis
function convertLength(length) { 
  if (length==="Less than 1 year"){
    return randomnum(1,0);
  }
  if (length==="1-5 years"){
    return randomnum(5,1);
  }
  if (length==="6-10 years"){
    return randomnum(10,6);
  }
  if (length ==="11-15 years"){
    return randomnum(15,11);
  }
  if (length==="16-20 years"){
    return randomnum(20,16);
  }
  if (length==="More than 20 years"){
    return randomnum(22,20);
  }
}

//Convert the household income of each couple to a number used for the y-axis
function convertIncome(income) { 
    if (income==="$0 - $24,999"){
      return randomnum(25,0);
    }
    if (income==="$25,000 - $49,999"){
      return randomnum(50,25);
    }
    if (income==="$50,000 - $99,999"){
      return randomnum(100,50);
    }
    if (income==="$100,000 - $149,999"){
      return randomnum(150,100);
    }
    if (income==="$150,000.00"){
      return randomnum(155,150);
    }
    else return null;
  }
  

function whyChart() {
  // set the dimensions and margins of the graph
  let margin = {top: 10, right: 50, bottom: 70, left: 80},
  width = 520 - margin.left - margin.right,
  height = 520 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  let svg = d3.select("#whyChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

  //Read the data
  d3.csv("data/sleeping-alone-data-short.csv", function(data) {

    // Add X axis
    let x = d3.scaleLinear()
    .domain([0,21])
    .range([ 10, width-10 ])
    svg.append("g")
    .attr("class","axisWhite")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(10))
    .select(".domain").remove()

    // Add Y axis
    let y = d3.scaleLinear()
    .domain([0, 150])
    .range([height-10, -0])
    .nice()
    svg.append("g")
    .attr("class","axisWhite")
    .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(6))
    .select(".domain").remove()

    // Customization
    svg.selectAll(".tick line").attr("stroke", "blue");

    // Add X axis label:
    svg.append("text")
    .style("fill", "#9b00f0")
    .attr("font-family", "Montserrat")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left )
      .attr("y", height + 50)
      .text("Years in relationship");

    // Y axis label:
    svg.append("text")
    .style("fill", "#9b00f0")
    .attr("font-family", "Montserrat")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -margin.top - height/2 +60)
      .text("Household Income")

    // Color scale
    let color = d3.scaleLinear()
    .domain([0,200])
    .range(["#fff", "#9b00f0"])

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(convertLength(d.relationship_length)); } )
      .attr("cy", function (d) { return y(convertIncome(d.income)); } )
      .attr("r", function(d) {return d.income == "" ? 0 : 4;})
      .style("fill", function (d) { return color(convertFrequency(d.sleeping_alone_frequency)) 
      } )

})
}

whyChart();