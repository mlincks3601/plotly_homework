

// Read json
// d3.json("samples.json").then(function(data) {
    // var names = data.names;
// 
//    var otu_ids = data.samples[0].otu_ids
// 
//    var sample_values = data.samples[0].sample_values
// 
//    var wash_freq = data.metadata[0].wfreq
// 
//    var otu_labels = data.samples[0].otu_labels
//    console.log(otu_labels)
    // 
// });

    //Time to Create Our Menus
//-------------------------------------------------------------------

// get the user input field
function init() {
    //Read the Json File 
    d3.json("data/samples.json").then(function(data) {

    var names = data.names;

    var dataset_id = d3.select("#selDataset")

     names.forEach((dropdown) => {
       dataset_id
         .append("option")
         .text(dropdown)
         .property("value", dropdown); 
         })
    })
};

init();
    
    
//-------------------------------------------------------------------
    
    // Build the Demographics Panel 
function buildMetadata() {
    d3.json("data/samples.json").then((data) => {

        var dataset_id = d3.select("#selDataset").node().value

       var metadata_data = data.metadata.filter(d => d.id === parseInt(dataset_id));
        console.log(metadata_data);
        // Filter the data for the object with the desired sample number
        var metadata_id = metadata_data;
        var result = metadata_id[0];
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#sample-metadata")
        

        Object.entries(result).forEach((demotable) => {
                PANEL
                .append("option")
                .text(demotable)
                .property("value", demotable); 
        })
        console.log(data.metadata);
      
          // Use `.html("") to clear any existing metadata
          //PANEL.html("");
      
        
        });
      }

buildMetadata();
      //Time to Create the Charts 
//-------------------------------------------------------------------

//Create the Trace for the bar chart
function barchart() {
    d3.json("data/samples.json").then(function(data) {        
    var otu_ids = data.samples[0].otu_ids
        
    var sample_values = data.samples[0].sample_values
            
    var otu_labels = data.samples[0].otu_labels

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
})};
barchart();

//--------------------------------------------------------
//Create the Trace for the bubble chart
function bubblechart() {
    d3.json("data/samples.json").then(function(data) {
        
        var otu_ids = data.samples[0].otu_ids
        
        var sample_values = data.samples[0].sample_values
                
        var otu_labels = data.samples[0].otu_labels
        var dataset_id = d3.select("#selDataset")
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        type: "bubble",
        text: otu_labels,
        hoverinfo: "x+y+text",
        mode: 'OTU Id',
        marker: {
            color: otu_ids,
        size: [sample_values]
        }
    };
  
    var data = [trace2];
  
    var layout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Amount of Samples Collected" },

     showlegend: false,
        height: 600,
        width: 600
    };
  
  Plotly.newPlot('bubble', data, layout);
})};
bubblechart();  



//----------------------------------------------------------------
//Create the gauge chart
function gaugechart() {
    d3.json("data/samples.json").then(function(data) {

        var wash_freq = data.metadata[0].wfreq

        var trace3 = [
	        {   
            domain: {x: [0,1], y:[0,1] },
            bar: {color: "black"},
		    value: wash_freq,
		    title: { text: "Belly button wash frequency" },
		    type: "indicator",
		    mode: "gauge+number",
            gauge: {
                axis: {range: [null, 9]},
	}}]


    var data = [trace3];

    var layout = { width: 700, height: 600, margin: 
        { t: 20, b: 40, l:100, r:100 } };

    Plotly.newPlot('gauge', data, layout);
})};
gaugechart();


//------------------------------------------------------------------


