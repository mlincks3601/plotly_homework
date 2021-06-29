// Read json
d3.json("samples.json").then(function(data) {
    var names = data.names;

   var otu_ids = data.samples[0].otu_ids

   var sample_values = data.samples[0].sample_values

   var wash_freq = data.metadata[0].wfreq

   var otu_labels = data.samples[0].otu_labels
   console.log(otu_labels)
    )
};


//-------------------------------------------------------------------

// get the user input field
function(init) {
    var dataset_id = d3.select("#selDataset");
    names.forEach((dropdown) => {
      dataset_id
        .append("option")
        .text(dropdown)
        .property("value", dropdown); 
    });
}
    init();
    
    
//-------------------------------------------------------------------
    
    // Build the Demographics Panel 
    function buildMetadata(sample) {
        d3.json("samples.json").then((data) => {
          var metadata = data.metadata;
          // Filter the data for the object with the desired sample number
          var metadata_id = data.metadata[0].id
          var result = metadata_id[0];
          // Use d3 to select the panel with id of `#sample-metadata`
          var PANEL = d3.select("#sample-metadata");
      
          // Use `.html("") to clear any existing metadata
          PANEL.html("");
      
        
        });
      }
      
      
//-------------------------------------------------------------------

//Create the Trace for the bar chart
    var yticks = otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse()

    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: yticks,
        hoverinfo: otu_labels,
        type: "bar",
        orientation:"h",
        backgroundColor: "rgb(192,189,189)"
    };
  
//Create the data array for the plot
  var data = [trace1];
  
//Define the plot layout
  var layout = {
    title: "Belly Button Diversity",
    xaxis: { title: "value" },
    yaxis: { title: "Bacteria ID's" }
  };
  
//Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", data, layout);


//--------------------------------------------------------
//Create the Trace for the bubble chart
 var trace2 = {
    x: otu_ids,
    y: sample_values,
    type: "bubble",
    text: otu_labels,
    hoverinfo: "x+y+text"
    mode: 'markers',
    color: otu_ids
    marker: {
      size: [sample_values]
    }
  };
  
  var data = [trace2];
  
  var layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble', data, layout);
  }
};


//----------------------------------------------------------------
//Create the gauge chart
var trace3 = [
	{   gauge: {
            axis: {range: [0,10], dtick: 2},
        bar: {color: "black"},
		value: wash_freq,
		title: { text: "Speed" },
		type: "indicator",
		mode: "gauge+number"
	}
];

var data = [trace3];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);


//------------------------------------------------------------------































