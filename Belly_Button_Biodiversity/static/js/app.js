function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var metaDataurl = `/metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
  var panelMetadata = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
  panelMetadata.html('');
  // @TODO: Complete the following function that builds the metadata panel
  d3.json(metaDataurl).then(function(sample){
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(function ([key, value]) {
      var row = panelMetadata.append("p");
      row.text(`${key}: ${value}`);
});
});
};
var level = data.WFREQ;

// Trig for meter points
var degrees = 180 - (level*20),
radius = .7;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// path for guage
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
pathX = String(x),
space = ' ',
pathY = String(y),
pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
  x: [0], y:[0],
  marker: {size: 28, color:'850000'},
  showlegend: false,
  name: 'speed',
  text: level,
  hoverinfo: 'text+name'},
{ values: [45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 50],
rotation: 90,
text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
          '1-2', '0-1', ''],
textinfo: 'text',
textposition:'inside',
marker: {colors:['#84B589','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                        'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                        'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                        '#F4F1E4','#F8F3EC', 'rgba(255, 255, 255, 0)',]},
labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
'1-2', '0-1', ''],
hoverinfo: 'label',
hole: .5,
type: 'pie',
showlegend: false
}];
var layout = {
shapes:[{
    type: 'path',
    path: path,
    fillcolor: '850000',
    line: {
      color: '850000'
    }
  }],

title: 'Belly Button Cleaning Frequency',
xaxis: {zeroline:false, showticklabels:false,
          showgrid: false, range: [-1, 1]},
yaxis: {zeroline:false, showticklabels:false,
          showgrid: false, range: [-1, 1]}
};
Plotly.newPlot('gauge', data, layout);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data) {

    // @TODO: Build a Bubble Chart using the sample data
    var x_values = data.otu_ids;
    var y_values = data.sample_values;
    var m_size = data.sample_values;
    var m_colors = data.otu_ids; 
    var t_values = data.otu_labels;

    var trace1 = {
      x: x_values,
      y: y_values,
      text: t_values,
      mode: 'markers',
      marker: {
        color: m_colors,
        size: m_size
      } 
    };
  
    var data = [trace1];

    var layout = {
      xaxis: { title: "OTU ID"},
    };

    Plotly.newPlot('bubble', data, layout);
   

    // @TODO: Build a Pie Chart
    d3.json(url).then(function(data) {  
    var pie_values = data.sample_values.slice(0,10);
      var pie_labels = data.otu_ids.slice(0,10);
      var pie_hover = data.otu_labels.slice(0,10);

      var data = [{
        values: pie_values,
        labels: pie_labels,
        hovertext: pie_hover,
        type: 'pie'
      }];

      Plotly.newPlot('pie', data);

    });
  });   
}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();