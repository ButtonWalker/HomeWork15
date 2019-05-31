
function buildGauge(sample) {
    Plotly.d3.json(`/wfreq/${sample}`, function(data, wfreq) {
      if (error) return console.warn(error);
      var level = data.WFREQ;
      // var level = parseFloat(wfreq) * 20;
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
      var newGauge = document.getElementById('gauge')
      Plotly.newPlot(newGauge, data, layout);
    });
  };