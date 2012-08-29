$(document).ready(function(){

 // load the Google Charts gauges json from the specified directory
 $('.benchmark-gauges').each(function(){
   var filename = $(this).data('file');
   $.ajax({
          url: filename,
          dataType: 'json',
          success: function(data){
            // load the gauge data
            var data_table = new google.visualization.DataTable(data);

            // for each gauge
            $('.benchmark-gauge').each(function(){
              // row name
              var rowname = $(this).data('col');
              
              // filter the data table to just this column
              var view = new google.visualization.DataView(data_table);
              for(var i = 0; i < data_table.getNumberOfRows(); i++){
                if(data_table.getValue(i, 0) == rowname){
                	 // set the label to blank
                	 data_table.setCell(i, 0, '');
                	 
                	 // filter to this row
                   view.setRows([i]);
                   break;
                }
              }

              // set the options
              var options = {
                width: 110, height: 110,
                redFrom: 0, redTo: $(this).data('yellow'),
                yellowFrom: $(this).data('yellow'), yellowTo: $(this).data('green'),
                greenFrom: $(this).data('green'), greenTo: $(this).data('max'),
                min: 0,
                max: $(this).data('max'),
              };

              var chart = new google.visualization.Gauge(this);
              chart.draw(view, options);
            });
          }
        });
   });
        
   // load the Google Charts benchmarks chart json from the specified directory
 $('.benchmark-chart').each(function(){
   var filename = $(this).data('file');  	
   var colname = $(this).data('col');
   var container = this;
   $.ajax({
          url: filename,
          dataType: 'json',
          success: function(data){
            // load the data
            var data_table = new google.visualization.DataTable(data);

            // filter out all columns except the one we're working with
            var col_ids = ((String)($(container).data('cols'))).split(',');
            var cols = [1,2];
            for(var i = 0; i < data_table.getNumberOfColumns(); i++){
              // add any column that matches the input ids specified
              var id = data_table.getColumnId(i);
              if(col_ids.indexOf(id) != -1){
                cols.push(i);
              }
            }
            console.log(cols);
  
            var view = new google.visualization.DataView(data_table);
            view.setColumns(cols);
            
            // sort the data table by the sort column
            for(var i = 0; i < data_table.getNumberOfColumns(); i++){
            	var sort_id = $(container).data('sortby');
            	if(data_table.getColumnId(i) == sort_id)
                 data_table.sort(i);
             }

            // set the options
            var options = {
                //title: $(container).data('title'),
                chartArea:{left:70,top:0, width:770, height:240 },
                hAxis: { direction: -1, textPosition: 'out', showTextEvery: 1,
                  slantedText: true, slantedTextAngle: 30, allowContainerBoundaryTextCufoff: false },
                vAxis: {title: $(container).data('title'),
                  viewWindow: {min: 0, max: 15}, min: 0, max: 15},
                axisTitlesPosition: 'in',
                legend: { position: 'none' },
                height: 320,
                isStacked: true,
                colors: ['#336699','#336633','#FF1100'],
                tooltip: {trigger: 'hover'},
              };
              
            var chart = new google.visualization.ColumnChart(container);
            chart.draw(view, options);
            
            // register a selection callback to open the page for the selected license
            google.visualization.events.addListener(chart, 'select', function(){
            	var selection = chart.getSelection();
            	console.log(selection);
            	
            	var license_id = data_table.getValue(selection[0].row, 0);
            	location.href = 'license-info.php?id=' + license_id;
            });

          },
     });
 });
});