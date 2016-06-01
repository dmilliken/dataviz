/*
By Tristan Schorn.
Uses a lot of Mike Bostock's example code, but in particular his scatter plot example at: https://bl.ocks.org/mbostock/3887118
and his brush slider example here: https://bl.ocks.org/mbostock/6452972

*/
var selectedIndex;
var data;

var margin = {top: 60, right: 30, bottom: 30, left: 40},
    width = 1280 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
	//.tickPadding(100)
	.tickFormat(d3.format("$s"))
    .scale(x)
    .orient("bottom");

var noComma = d3.format('')(xAxis);

var xValue = function(d){return d.Country;}

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var yValue = function(d){return d.Dollar}

var animate = true;

var cValue = function(d) { return d.Continent;},
    color = d3.scale.category10();



var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var rect = d3.select("svg g rect");

var headers;
var dispatch = d3.dispatch("load", "statechange");
var year;
var duration = 600;
var continentSelected = false;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")");

dispatch.on("load.menu", function(modelToSelect) {
  var select = d3.select("body")
    .append("div")
    .append("select")
      .on("change", function() { 
		//dispatch.statechange(modelToSelect.get(this.value)); 
		console.log("update here");
		update();});

  select.selectAll("option")
      .data(modelToSelect.values())
    .enter().append("option")
      .attr("value", function(d,i) { return headers[i]; })
      .text(function(d,i) { return headers[i]; });

  dispatch.on("statechange.menu", function(model) {
    select.property("value", model.ModelName);
	update();
  });
});

function update(){

	d3.csv("https://dl.dropboxusercontent.com/u/18421157/Link%20to%20Tesla%20rankings/data-Sq2Fw.csv", function(error, data) {
	  if (error) throw error;

	  data.forEach(function(d) {
		d.ModelName = d.ModelName;
		d.OverallScore = +d.OverallScore;
		d.Segment = d.Segment;
		d.Reliability = +d.Reliability;
		d.BuildQuality = +d.BuildQuality;
		d.RunningCosts = +d.RunningCosts;
		d.Performance = +d.Performance;
		d.RoadHandling = +d.RoadHandling;
		d.RideQuality = +d.RideQuality;
		d.EaseOfDriving = +d.EaseOfDriving;
		d.SeatComfort = +d.SeatComfort;
		d.Practicality = +d.Practicality;
		d.InCarTechnology = +d.InCarTechnology;
	  });


	svg.selectAll(".dot")
		.transition()
		.duration(500)
		.delay(function(d,i){return i * 5;})

		//.attr("cx", function(d){return x(interpolateX(d, year));})
		//.attr("cy", function(d){return y(interpolateY(d, year));});
		//.attr("cx", function(d,i) {return i * 30})
		//.domain(data.sort(function(d){return d3.descending(d.Performance);}))
		//.attr("cy", function(d) { return y(d.Performance); });


  x.domain(d3.extent(data, function(d) { return d.ModelName; })).nice();
  y.domain(d3.extent(data, function(d) { return d.Performance; })).nice();
})}

main(year);

function main(year){
d3.csv("https://dl.dropboxusercontent.com/u/18421157/Link%20to%20Tesla%20rankings/data-Sq2Fw.csv", function(error, data) {
  if (error) throw error;
  var modelToSelect = d3.map();
  headers = d3.keys(data[0]);
  console.log(headers);

  data.forEach(function(d) {
	modelToSelect.set(d.ModelName, d);

	d.ModelName = d.ModelName;
	d.OverallScore = +d.OverallScore;
	d.Segment = d.Segment;
	d.Reliability = +d.Reliability;
	d.BuildQuality = +d.BuildQuality;
	d.RunningCosts = +d.RunningCosts;
	d.Performance = +d.Performance;
	d.RoadHandling = +d.RoadHandling;
	d.RideQuality = +d.RideQuality;
	d.EaseOfDriving = +d.EaseOfDriving;
	d.SeatComfort = +d.SeatComfort;
	d.Practicality = +d.Practicality;
	d.InCarTechnology = +d.InCarTechnology;
  });
  dispatch.load(modelToSelect);
  //dispatch.statechange(modelToSelect.get("Tesla Model S MkI"));


  x.domain(d3.extent(data, function(d) { return d.ModelName; })).nice();
  y.domain(d3.extent(data, function(d) { return d.Performance; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
	  .style("font-size", "14px")
	  //.format("04d")
	 // xAxis.replace(",", "")
	  //console.log(xAxis)
	  
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -10)
      .style("text-anchor", "end")
	  .style("font-size", "14px")
      .text("Brands");

  svg.append("g")
      .attr("class", "y axis")
	  .style("font-size", "14px")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
	  .style("font-size", "14px")
      .text("Overall Score");

  svg.append("text")
	  .attr("y", -15)
	  .attr("x", 0)
	  .style("font-size", "34px")
	  .text("Vehicle Brands");

  svg.selectAll(".dot")
	  .data(data)
	.enter().append("text")
      .attr("cx", function(d,i) {return i * 25; }) //x(d.Country)
      .attr("cy", function(d) { return y(d.OverallScore); })
	  .style("fill", "green")
	  .text("T");

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 8.5)
	  .attr("opacity", 0.8)
      .attr("cx", function(d,i) {return i * 25; }) //x(d.Country)
      .attr("cy", function(d) { return y(d.OverallScore); })
      .style("fill", function(d) { return color(cValue(d));})
	  .on("mouseover", function(d) {
          tooltip
			   .style("font-size", "14px")
			   .transition()
               .duration(400)
               .style("opacity", .9);
          tooltip.html(d["ModelName"])
               .style("left", (d3.event.pageX + 8) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", function(d) {	
		if (d.hovered === undefined) {
			d.hovered = false;
		}
		if(d.clicked == false || d.hovered == false){	
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);		
		}
      })
	});
};

