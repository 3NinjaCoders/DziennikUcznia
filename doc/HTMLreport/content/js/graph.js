/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 416.0, "series": [{"data": [[0.0, 308.0], [300.0, 3.0], [3000.0, 1.0], [200.0, 6.0], [100.0, 29.0], [400.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher", "isController": false}, {"data": [[0.0, 27.0], [300.0, 1.0], [100.0, 8.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet", "isController": false}, {"data": [[0.0, 250.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass", "isController": false}, {"data": [[0.0, 416.0], [600.0, 1.0], [300.0, 2.0], [700.0, 4.0], [2900.0, 1.0], [100.0, 25.0], [200.0, 13.0], [400.0, 2.0], [800.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass", "isController": false}, {"data": [[0.0, 41.0], [300.0, 1.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession", "isController": false}, {"data": [[0.0, 7.0], [300.0, 3.0], [200.0, 1.0], [400.0, 3.0]], "isOverall": false, "label": "reset", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0", "isController": false}, {"data": [[0.0, 193.0], [300.0, 1.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1", "isController": false}, {"data": [[0.0, 244.0], [300.0, 5.0], [100.0, 37.0], [200.0, 12.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60", "isController": false}, {"data": [[0.0, 189.0], [300.0, 3.0], [200.0, 1.0], [100.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5", "isController": false}, {"data": [[0.0, 47.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4", "isController": false}, {"data": [[0.0, 186.0], [300.0, 3.0], [200.0, 2.0], [100.0, 9.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1", "isController": false}, {"data": [[0.0, 51.0], [100.0, 6.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0", "isController": false}, {"data": [[0.0, 50.0], [100.0, 5.0], [200.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5", "isController": false}, {"data": [[0.0, 46.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7", "isController": false}, {"data": [[0.0, 56.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6", "isController": false}, {"data": [[0.0, 51.0], [300.0, 1.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7", "isController": false}, {"data": [[0.0, 57.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0", "isController": false}, {"data": [[0.0, 57.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1", "isController": false}, {"data": [[0.0, 56.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2", "isController": false}, {"data": [[0.0, 54.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2", "isController": false}, {"data": [[300.0, 3.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3", "isController": false}, {"data": [[0.0, 34.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4", "isController": false}, {"data": [[0.0, 39.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2", "isController": false}, {"data": [[0.0, 39.0], [600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5", "isController": false}, {"data": [[0.0, 32.0], [300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7", "isController": false}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6", "isController": false}, {"data": [[0.0, 250.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0", "isController": false}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5", "isController": false}, {"data": [[0.0, 250.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1", "isController": false}, {"data": [[0.0, 38.0], [100.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6", "isController": false}, {"data": [[0.0, 250.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2", "isController": false}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1", "isController": false}, {"data": [[0.0, 250.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3", "isController": false}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2", "isController": false}, {"data": [[0.0, 232.0], [100.0, 13.0], [400.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4", "isController": false}, {"data": [[0.0, 232.0], [300.0, 4.0], [100.0, 12.0], [400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5", "isController": false}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0", "isController": false}, {"data": [[0.0, 250.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6", "isController": false}, {"data": [[0.0, 239.0], [300.0, 1.0], [100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0", "isController": false}, {"data": [[0.0, 397.0], [300.0, 4.0], [100.0, 40.0], [400.0, 4.0], [200.0, 4.0], [800.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil", "isController": false}, {"data": [[0.0, 165.0], [300.0, 5.0], [100.0, 24.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60", "isController": false}, {"data": [[0.0, 300.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6", "isController": false}, {"data": [[0.0, 285.0], [300.0, 1.0], [100.0, 10.0], [200.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5", "isController": false}, {"data": [[0.0, 283.0], [300.0, 2.0], [100.0, 6.0], [200.0, 9.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 2.0], [2200.0, 2.0], [2400.0, 1.0], [3200.0, 1.0], [4300.0, 1.0], [4600.0, 1.0], [1200.0, 2.0], [1300.0, 3.0], [1400.0, 5.0], [1500.0, 6.0], [1600.0, 6.0], [1700.0, 10.0], [1800.0, 2.0], [1900.0, 3.0], [2000.0, 3.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[300.0, 3.0], [200.0, 1.0], [400.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset", "isController": false}, {"data": [[0.0, 195.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/", "isController": false}, {"data": [[0.0, 87.0], [300.0, 2.0], [600.0, 1.0], [100.0, 17.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout", "isController": false}, {"data": [[0.0, 48.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5", "isController": false}, {"data": [[0.0, 47.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6", "isController": false}, {"data": [[0.0, 300.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0", "isController": false}, {"data": [[0.0, 41.0], [300.0, 2.0], [700.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3", "isController": false}, {"data": [[0.0, 44.0], [300.0, 1.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4", "isController": false}, {"data": [[0.0, 300.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2", "isController": false}, {"data": [[0.0, 48.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1", "isController": false}, {"data": [[0.0, 300.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1", "isController": false}, {"data": [[0.0, 48.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2", "isController": false}, {"data": [[0.0, 282.0], [300.0, 1.0], [100.0, 14.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4", "isController": false}, {"data": [[0.0, 300.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3", "isController": false}, {"data": [[0.0, 48.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0", "isController": false}, {"data": [[0.0, 246.0], [300.0, 1.0], [600.0, 1.0], [700.0, 3.0], [2800.0, 1.0], [100.0, 6.0], [200.0, 4.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5", "isController": false}, {"data": [[0.0, 245.0], [200.0, 6.0], [100.0, 7.0], [400.0, 2.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4", "isController": false}, {"data": [[0.0, 244.0], [300.0, 1.0], [100.0, 12.0], [200.0, 3.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7", "isController": false}, {"data": [[0.0, 258.0], [100.0, 4.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6", "isController": false}, {"data": [[0.0, 262.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1", "isController": false}, {"data": [[0.0, 150.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet", "isController": false}, {"data": [[0.0, 262.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0", "isController": false}, {"data": [[0.0, 260.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3", "isController": false}, {"data": [[0.0, 261.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2", "isController": false}, {"data": [[0.0, 18.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message", "isController": false}, {"data": [[0.0, 37.0], [100.0, 5.0], [800.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64", "isController": false}, {"data": [[0.0, 36.0], [300.0, 1.0], [200.0, 5.0], [100.0, 15.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 4.0], [1300.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [400.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "uczen", "isController": true}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 8.0], [1200.0, 5.0], [1300.0, 5.0], [1400.0, 2.0], [1500.0, 2.0], [800.0, 5.0], [1700.0, 2.0], [900.0, 11.0], [1000.0, 9.0]], "isOverall": false, "label": "teacher", "isController": true}, {"data": [[0.0, 30.0], [600.0, 1.0], [100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2", "isController": false}, {"data": [[0.0, 29.0], [100.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5", "isController": false}, {"data": [[0.0, 32.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0", "isController": false}, {"data": [[0.0, 114.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2", "isController": false}, {"data": [[0.0, 43.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1", "isController": false}, {"data": [[0.0, 114.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3", "isController": false}, {"data": [[0.0, 43.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6", "isController": false}, {"data": [[0.0, 107.0], [200.0, 2.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4", "isController": false}, {"data": [[0.0, 42.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7", "isController": false}, {"data": [[0.0, 106.0], [300.0, 2.0], [600.0, 1.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5", "isController": false}, {"data": [[0.0, 186.0], [300.0, 1.0], [3000.0, 1.0], [100.0, 9.0], [400.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4", "isController": false}, {"data": [[0.0, 43.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1", "isController": false}, {"data": [[0.0, 185.0], [300.0, 1.0], [100.0, 11.0], [200.0, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5", "isController": false}, {"data": [[0.0, 43.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2", "isController": false}, {"data": [[0.0, 114.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0", "isController": false}, {"data": [[0.0, 43.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3", "isController": false}, {"data": [[0.0, 114.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1", "isController": false}, {"data": [[0.0, 41.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4", "isController": false}, {"data": [[0.0, 43.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0", "isController": false}, {"data": [[0.0, 39.0], [300.0, 4.0], [700.0, 1.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6", "isController": false}, {"data": [[0.0, 192.0], [100.0, 6.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7", "isController": false}, {"data": [[0.0, 114.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6", "isController": false}, {"data": [[0.0, 108.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 14670.0, "series": [{"data": [[0.0, 14670.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 31.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 4.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 1170.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.5883377E12, "maxY": 50.0, "series": [{"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.58833794E12, 50.0], [1.58833776E12, 50.0], [1.58833782E12, 50.0], [1.5883377E12, 38.39896596294702], [1.58833788E12, 50.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58833794E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 1892.1799999999998, "series": [{"data": [[50.0, 69.0771428571429]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher", "isController": false}, {"data": [[50.0, 69.0771428571429]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-Aggregated", "isController": false}, {"data": [[50.0, 99.25000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet", "isController": false}, {"data": [[50.0, 99.25000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-Aggregated", "isController": false}, {"data": [[50.0, 12.432]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass", "isController": false}, {"data": [[50.0, 12.432]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass-Aggregated", "isController": false}, {"data": [[32.0, 38.2], [33.0, 42.0], [34.0, 55.66666666666667], [35.0, 40.0], [36.0, 15.0], [37.0, 50.666666666666664], [38.0, 53.6], [39.0, 40.0], [40.0, 64.66666666666667], [41.0, 67.33333333333333], [42.0, 112.66666666666666], [43.0, 35.0], [44.0, 51.2], [45.0, 43.0], [46.0, 34.2], [47.0, 53.333333333333336], [48.0, 48.0], [49.0, 55.0], [50.0, 79.81739130434784], [5.0, 42.0], [6.0, 46.0], [10.0, 47.0], [11.0, 39.5], [13.0, 45.0], [14.0, 156.75], [15.0, 284.0], [16.0, 76.0], [17.0, 46.0], [18.0, 45.0], [19.0, 25.0], [20.0, 34.5], [21.0, 56.5], [22.0, 28.0], [23.0, 52.2], [25.0, 12.5], [26.0, 47.4], [27.0, 18.0], [28.0, 61.333333333333336], [29.0, 42.0], [30.0, 35.125], [31.0, 51.285714285714285]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass", "isController": false}, {"data": [[44.991452991452945, 72.51068376068383]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-Aggregated", "isController": false}, {"data": [[50.0, 91.35999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession", "isController": false}, {"data": [[50.0, 91.35999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-Aggregated", "isController": false}, {"data": [[0.0, 0.0], [50.0, 359.4285714285714]], "isOverall": false, "label": "reset", "isController": true}, {"data": [[25.0, 179.71428571428567]], "isOverall": false, "label": "reset-Aggregated", "isController": true}, {"data": [[50.0, 6.7]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0", "isController": false}, {"data": [[50.0, 6.7]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0-Aggregated", "isController": false}, {"data": [[50.0, 39.24000000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7", "isController": false}, {"data": [[50.0, 39.24000000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7-Aggregated", "isController": false}, {"data": [[50.0, 8.14]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2", "isController": false}, {"data": [[50.0, 8.14]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2-Aggregated", "isController": false}, {"data": [[50.0, 32.35500000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6", "isController": false}, {"data": [[50.0, 32.35500000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6-Aggregated", "isController": false}, {"data": [[50.0, 7.08]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1", "isController": false}, {"data": [[50.0, 7.08]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1-Aggregated", "isController": false}, {"data": [[50.0, 84.6266666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60", "isController": false}, {"data": [[50.0, 84.6266666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-Aggregated", "isController": false}, {"data": [[50.0, 41.824999999999974]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5", "isController": false}, {"data": [[50.0, 41.824999999999974]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5-Aggregated", "isController": false}, {"data": [[50.0, 49.75999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4", "isController": false}, {"data": [[50.0, 49.75999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4-Aggregated", "isController": false}, {"data": [[50.0, 42.53000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4", "isController": false}, {"data": [[50.0, 42.53000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4-Aggregated", "isController": false}, {"data": [[50.0, 53.099999999999994]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3", "isController": false}, {"data": [[50.0, 53.099999999999994]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3-Aggregated", "isController": false}, {"data": [[50.0, 44.85000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3", "isController": false}, {"data": [[50.0, 44.85000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3-Aggregated", "isController": false}, {"data": [[50.0, 37.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6", "isController": false}, {"data": [[50.0, 37.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6-Aggregated", "isController": false}, {"data": [[50.0, 7.904999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2", "isController": false}, {"data": [[50.0, 7.904999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2-Aggregated", "isController": false}, {"data": [[50.0, 41.27999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5", "isController": false}, {"data": [[50.0, 41.27999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5-Aggregated", "isController": false}, {"data": [[50.0, 7.024999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1", "isController": false}, {"data": [[50.0, 7.024999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1-Aggregated", "isController": false}, {"data": [[32.0, 62.0], [33.0, 63.0], [34.0, 70.0], [35.0, 57.0], [37.0, 60.0], [38.0, 80.0], [39.0, 60.0], [40.0, 58.0], [41.0, 60.0], [43.0, 58.0], [44.0, 77.0], [45.0, 65.0], [46.0, 160.0], [47.0, 56.0], [3.0, 139.5], [49.0, 77.5], [50.0, 40.333333333333336], [4.0, 58.0], [6.0, 64.0], [7.0, 57.0], [8.0, 63.0], [9.0, 107.0], [10.0, 86.0], [11.0, 49.0], [13.0, 63.5], [15.0, 131.0], [17.0, 57.0], [18.0, 63.0], [19.0, 65.0], [20.0, 66.5], [22.0, 65.33333333333333], [23.0, 59.0], [26.0, 59.5], [28.0, 63.0], [29.0, 69.0], [31.0, 64.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4", "isController": false}, {"data": [[29.70175438596491, 68.14035087719297]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4-Aggregated", "isController": false}, {"data": [[50.0, 8.195000000000007]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0", "isController": false}, {"data": [[50.0, 8.195000000000007]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0-Aggregated", "isController": false}, {"data": [[32.0, 55.0], [33.0, 49.0], [34.0, 68.0], [35.0, 47.0], [37.0, 49.0], [38.0, 47.0], [39.0, 52.0], [40.0, 56.5], [41.0, 98.0], [43.0, 51.0], [44.0, 74.0], [45.0, 58.0], [46.0, 151.0], [47.0, 54.0], [3.0, 91.0], [49.0, 65.5], [50.0, 48.44444444444444], [4.0, 56.0], [6.0, 46.0], [7.0, 55.0], [8.0, 64.0], [9.0, 89.0], [10.0, 50.5], [11.0, 186.0], [13.0, 180.5], [15.0, 83.0], [17.0, 90.0], [18.0, 49.0], [19.0, 47.0], [20.0, 64.5], [22.0, 63.0], [23.0, 47.0], [26.0, 52.5], [28.0, 61.0], [29.0, 65.33333333333333], [31.0, 62.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5", "isController": false}, {"data": [[29.70175438596491, 67.80701754385962]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5-Aggregated", "isController": false}, {"data": [[50.0, 51.879999999999995]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7", "isController": false}, {"data": [[50.0, 51.879999999999995]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7-Aggregated", "isController": false}, {"data": [[32.0, 54.0], [33.0, 51.0], [34.0, 62.0], [35.0, 40.0], [37.0, 51.0], [38.0, 41.0], [39.0, 47.0], [40.0, 37.5], [41.0, 51.0], [43.0, 39.5], [44.0, 68.0], [45.0, 35.0], [46.0, 146.0], [47.0, 33.0], [3.0, 40.5], [49.0, 57.5], [50.0, 32.33333333333334], [4.0, 50.0], [6.0, 46.0], [7.0, 52.0], [8.0, 51.0], [9.0, 50.0], [10.0, 42.0], [11.0, 34.0], [13.0, 42.5], [15.0, 37.0], [17.0, 37.0], [18.0, 50.0], [19.0, 40.0], [20.0, 52.5], [22.0, 45.666666666666664], [23.0, 47.0], [26.0, 46.5], [28.0, 60.0], [29.0, 55.666666666666664], [31.0, 49.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6", "isController": false}, {"data": [[29.70175438596491, 46.157894736842096]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6-Aggregated", "isController": false}, {"data": [[32.0, 42.0], [33.0, 61.0], [34.0, 59.0], [35.0, 134.0], [37.0, 48.0], [38.0, 47.0], [39.0, 51.0], [40.0, 42.0], [41.0, 44.0], [43.0, 66.0], [44.0, 66.0], [45.0, 72.0], [46.0, 150.0], [47.0, 48.0], [3.0, 120.5], [49.0, 55.0], [50.0, 42.111111111111114], [4.0, 48.0], [6.0, 45.0], [7.0, 47.0], [8.0, 49.0], [9.0, 47.0], [10.0, 49.5], [11.0, 53.0], [13.0, 195.5], [15.0, 92.0], [17.0, 55.0], [18.0, 55.0], [19.0, 57.0], [20.0, 53.0], [22.0, 70.66666666666667], [23.0, 52.0], [26.0, 45.0], [28.0, 48.0], [29.0, 56.0], [31.0, 54.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7", "isController": false}, {"data": [[29.70175438596491, 63.64912280701755]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7-Aggregated", "isController": false}, {"data": [[32.0, 7.0], [33.0, 7.0], [34.0, 6.0], [35.0, 7.0], [37.0, 7.0], [38.0, 7.0], [39.0, 7.0], [40.0, 7.0], [41.0, 7.0], [43.0, 7.0], [44.0, 6.0], [45.0, 7.0], [46.0, 6.0], [47.0, 8.0], [3.0, 7.5], [49.0, 6.5], [50.0, 6.5555555555555545], [4.0, 7.0], [6.0, 8.0], [7.0, 7.0], [8.0, 7.0], [9.0, 10.0], [10.0, 10.0], [11.0, 7.0], [13.0, 7.0], [15.0, 7.0], [17.0, 7.0], [18.0, 7.0], [19.0, 7.0], [20.0, 7.0], [22.0, 8.0], [23.0, 7.0], [26.0, 10.5], [28.0, 7.0], [29.0, 7.0], [31.0, 6.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0", "isController": false}, {"data": [[29.70175438596491, 7.228070175438598]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0-Aggregated", "isController": false}, {"data": [[32.0, 7.0], [33.0, 7.0], [34.0, 8.0], [35.0, 7.0], [37.0, 6.0], [38.0, 7.0], [39.0, 7.0], [40.0, 7.5], [41.0, 8.0], [43.0, 6.5], [44.0, 7.0], [45.0, 7.0], [46.0, 8.0], [47.0, 7.0], [3.0, 7.0], [49.0, 9.0], [50.0, 9.333333333333334], [4.0, 7.0], [6.0, 7.0], [7.0, 9.0], [8.0, 7.0], [9.0, 7.0], [10.0, 8.5], [11.0, 7.0], [13.0, 7.5], [15.0, 7.0], [17.0, 7.0], [18.0, 7.0], [19.0, 7.0], [20.0, 6.5], [22.0, 7.0], [23.0, 7.0], [26.0, 8.0], [28.0, 6.0], [29.0, 7.666666666666667], [31.0, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1", "isController": false}, {"data": [[29.70175438596491, 7.614035087719297]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1-Aggregated", "isController": false}, {"data": [[32.0, 8.0], [33.0, 7.0], [34.0, 11.0], [35.0, 7.0], [37.0, 8.0], [38.0, 9.0], [39.0, 8.0], [40.0, 9.5], [41.0, 12.0], [43.0, 8.5], [44.0, 11.0], [45.0, 7.0], [46.0, 106.0], [47.0, 8.0], [3.0, 8.0], [49.0, 22.0], [50.0, 14.777777777777779], [4.0, 8.0], [6.0, 8.0], [7.0, 8.0], [8.0, 8.0], [9.0, 8.0], [10.0, 13.5], [11.0, 8.0], [13.0, 9.5], [15.0, 7.5], [17.0, 7.0], [18.0, 7.0], [19.0, 8.0], [20.0, 8.0], [22.0, 8.666666666666666], [23.0, 8.0], [26.0, 7.5], [28.0, 8.0], [29.0, 14.666666666666666], [31.0, 8.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2", "isController": false}, {"data": [[29.70175438596491, 12.052631578947366]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2-Aggregated", "isController": false}, {"data": [[32.0, 54.0], [33.0, 82.0], [34.0, 90.0], [35.0, 47.0], [37.0, 82.0], [38.0, 75.0], [39.0, 78.0], [40.0, 66.5], [41.0, 52.0], [43.0, 49.0], [44.0, 83.0], [45.0, 42.0], [46.0, 146.0], [47.0, 53.0], [3.0, 179.0], [49.0, 64.0], [50.0, 32.77777777777778], [4.0, 53.0], [6.0, 69.0], [7.0, 85.0], [8.0, 49.0], [9.0, 75.0], [10.0, 65.5], [11.0, 43.0], [13.0, 56.5], [15.0, 60.5], [17.0, 70.0], [18.0, 60.0], [19.0, 88.0], [20.0, 61.5], [22.0, 52.333333333333336], [23.0, 52.0], [26.0, 51.5], [28.0, 56.0], [29.0, 70.0], [31.0, 87.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3", "isController": false}, {"data": [[29.70175438596491, 63.87719298245617]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3-Aggregated", "isController": false}, {"data": [[50.0, 48.142857142857146]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5", "isController": false}, {"data": [[50.0, 48.142857142857146]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5-Aggregated", "isController": false}, {"data": [[50.0, 40.714285714285715]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6", "isController": false}, {"data": [[50.0, 40.714285714285715]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6-Aggregated", "isController": false}, {"data": [[50.0, 37.857142857142854]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3", "isController": false}, {"data": [[50.0, 37.857142857142854]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3-Aggregated", "isController": false}, {"data": [[50.0, 40.857142857142854]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4", "isController": false}, {"data": [[50.0, 40.857142857142854]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4-Aggregated", "isController": false}, {"data": [[50.0, 8.285714285714286]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1", "isController": false}, {"data": [[50.0, 8.285714285714286]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1-Aggregated", "isController": false}, {"data": [[50.0, 61.99999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2", "isController": false}, {"data": [[50.0, 61.99999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2-Aggregated", "isController": false}, {"data": [[50.0, 291.7142857142857]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0", "isController": false}, {"data": [[50.0, 291.7142857142857]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0-Aggregated", "isController": false}, {"data": [[50.0, 55.27777777777777]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3", "isController": false}, {"data": [[50.0, 55.27777777777777]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3-Aggregated", "isController": false}, {"data": [[50.0, 48.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4", "isController": false}, {"data": [[50.0, 48.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4-Aggregated", "isController": false}, {"data": [[50.0, 51.390243902439025]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7", "isController": false}, {"data": [[50.0, 51.390243902439025]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7-Aggregated", "isController": false}, {"data": [[50.0, 6.9444444444444455]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1", "isController": false}, {"data": [[50.0, 6.9444444444444455]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1-Aggregated", "isController": false}, {"data": [[50.0, 8.194444444444445]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2", "isController": false}, {"data": [[50.0, 8.194444444444445]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2-Aggregated", "isController": false}, {"data": [[50.0, 61.58536585365853]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5", "isController": false}, {"data": [[50.0, 61.58536585365853]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5-Aggregated", "isController": false}, {"data": [[50.0, 58.58333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7", "isController": false}, {"data": [[50.0, 58.58333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7-Aggregated", "isController": false}, {"data": [[50.0, 40.48780487804878]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6", "isController": false}, {"data": [[50.0, 40.48780487804878]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6-Aggregated", "isController": false}, {"data": [[50.0, 7.211999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0", "isController": false}, {"data": [[50.0, 7.211999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0-Aggregated", "isController": false}, {"data": [[50.0, 52.75609756097561]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3", "isController": false}, {"data": [[50.0, 52.75609756097561]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3-Aggregated", "isController": false}, {"data": [[50.0, 39.63888888888889]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5", "isController": false}, {"data": [[50.0, 39.63888888888889]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5-Aggregated", "isController": false}, {"data": [[50.0, 7.0440000000000005]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1", "isController": false}, {"data": [[50.0, 7.0440000000000005]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1-Aggregated", "isController": false}, {"data": [[50.0, 50.21951219512197]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4", "isController": false}, {"data": [[50.0, 50.21951219512197]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4-Aggregated", "isController": false}, {"data": [[50.0, 39.25000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6", "isController": false}, {"data": [[50.0, 39.25000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6-Aggregated", "isController": false}, {"data": [[50.0, 7.943999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2", "isController": false}, {"data": [[50.0, 7.943999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2-Aggregated", "isController": false}, {"data": [[50.0, 7.097560975609756]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1", "isController": false}, {"data": [[50.0, 7.097560975609756]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1-Aggregated", "isController": false}, {"data": [[50.0, 46.20800000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3", "isController": false}, {"data": [[50.0, 46.20800000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3-Aggregated", "isController": false}, {"data": [[50.0, 8.512195121951219]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2", "isController": false}, {"data": [[50.0, 8.512195121951219]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2-Aggregated", "isController": false}, {"data": [[50.0, 44.391999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4", "isController": false}, {"data": [[50.0, 44.391999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4-Aggregated", "isController": false}, {"data": [[50.0, 48.48400000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5", "isController": false}, {"data": [[50.0, 48.48400000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5-Aggregated", "isController": false}, {"data": [[50.0, 6.902439024390244]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0", "isController": false}, {"data": [[50.0, 6.902439024390244]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0-Aggregated", "isController": false}, {"data": [[50.0, 33.60800000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6", "isController": false}, {"data": [[50.0, 33.60800000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6-Aggregated", "isController": false}, {"data": [[50.0, 41.46400000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7", "isController": false}, {"data": [[50.0, 41.46400000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7-Aggregated", "isController": false}, {"data": [[50.0, 13.361111111111112]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0", "isController": false}, {"data": [[50.0, 13.361111111111112]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0-Aggregated", "isController": false}, {"data": [[50.0, 58.177777777777784]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil", "isController": false}, {"data": [[50.0, 58.177777777777784]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-Aggregated", "isController": false}, {"data": [[50.0, 83.92499999999995]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60", "isController": false}, {"data": [[50.0, 83.92499999999995]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-Aggregated", "isController": false}, {"data": [[50.0, 31.669999999999998]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6", "isController": false}, {"data": [[50.0, 31.669999999999998]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6-Aggregated", "isController": false}, {"data": [[50.0, 37.79666666666666]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5", "isController": false}, {"data": [[50.0, 37.79666666666666]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5-Aggregated", "isController": false}, {"data": [[50.0, 43.35333333333332]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7", "isController": false}, {"data": [[50.0, 43.35333333333332]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7-Aggregated", "isController": false}, {"data": [[50.0, 1892.1799999999998]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[50.0, 1892.1799999999998]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[50.0, 359.4285714285714]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset", "isController": false}, {"data": [[50.0, 359.4285714285714]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-Aggregated", "isController": false}, {"data": [[2.0, 20.0], [3.0, 24.0], [4.0, 17.0], [5.0, 15.0], [6.0, 15.0], [7.0, 17.0], [8.0, 16.0], [9.0, 17.0], [10.0, 18.0], [11.0, 20.0], [12.0, 16.0], [13.0, 16.0], [14.0, 17.0], [15.0, 16.0], [16.0, 15.0], [17.0, 17.0], [18.0, 19.0], [19.0, 17.0], [20.0, 25.0], [21.0, 16.0], [22.0, 17.0], [23.0, 18.0], [24.0, 16.0], [25.0, 16.0], [26.0, 17.0], [27.0, 15.0], [28.0, 17.0], [29.0, 15.0], [30.0, 15.0], [31.0, 21.0], [32.0, 14.0], [33.0, 15.0], [34.0, 18.0], [35.0, 18.0], [36.0, 15.0], [37.0, 16.0], [38.0, 20.0], [39.0, 17.0], [40.0, 14.0], [41.0, 25.0], [42.0, 15.0], [43.0, 15.0], [44.0, 15.0], [45.0, 15.0], [46.0, 103.0], [47.0, 21.0], [48.0, 15.0], [49.0, 16.0], [50.0, 14.632653061224488], [1.0, 22.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/", "isController": false}, {"data": [[43.75, 15.714285714285715]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/-Aggregated", "isController": false}, {"data": [[50.0, 102.79824561403508]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout", "isController": false}, {"data": [[50.0, 102.79824561403508]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-Aggregated", "isController": false}, {"data": [[50.0, 39.625000000000014]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5", "isController": false}, {"data": [[50.0, 39.625000000000014]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5-Aggregated", "isController": false}, {"data": [[50.0, 43.81249999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6", "isController": false}, {"data": [[50.0, 43.81249999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6-Aggregated", "isController": false}, {"data": [[50.0, 7.87]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0", "isController": false}, {"data": [[50.0, 7.87]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0-Aggregated", "isController": false}, {"data": [[50.0, 81.70833333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3", "isController": false}, {"data": [[50.0, 81.70833333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3-Aggregated", "isController": false}, {"data": [[50.0, 54.10416666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4", "isController": false}, {"data": [[50.0, 54.10416666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4-Aggregated", "isController": false}, {"data": [[50.0, 7.776666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2", "isController": false}, {"data": [[50.0, 7.776666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2-Aggregated", "isController": false}, {"data": [[50.0, 8.104166666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1", "isController": false}, {"data": [[50.0, 8.104166666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1-Aggregated", "isController": false}, {"data": [[50.0, 7.083333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1", "isController": false}, {"data": [[50.0, 7.083333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1-Aggregated", "isController": false}, {"data": [[50.0, 56.24999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2", "isController": false}, {"data": [[50.0, 56.24999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2-Aggregated", "isController": false}, {"data": [[50.0, 39.40333333333329]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4", "isController": false}, {"data": [[50.0, 39.40333333333329]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4-Aggregated", "isController": false}, {"data": [[50.0, 43.48666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3", "isController": false}, {"data": [[50.0, 43.48666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3-Aggregated", "isController": false}, {"data": [[50.0, 7.229166666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0", "isController": false}, {"data": [[50.0, 7.229166666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0-Aggregated", "isController": false}, {"data": [[32.0, 16.333333333333336], [33.0, 35.0], [34.0, 40.5], [35.0, 7.25], [37.0, 24.0], [38.0, 21.0], [39.0, 39.0], [40.0, 36.0], [41.0, 20.0], [42.0, 24.5], [43.0, 7.0], [44.0, 26.25], [45.0, 9.75], [46.0, 27.0], [47.0, 38.0], [48.0, 38.5], [49.0, 20.0], [50.0, 78.25698324022348], [5.0, 7.0], [6.0, 6.0], [10.0, 7.0], [11.0, 24.0], [13.0, 7.0], [14.0, 56.75], [15.0, 36.0], [16.0, 21.5], [17.0, 6.0], [18.0, 13.0], [19.0, 7.0], [20.0, 24.666666666666668], [21.0, 22.5], [22.0, 6.0], [23.0, 26.0], [26.0, 15.0], [28.0, 15.666666666666668], [29.0, 12.0], [30.0, 32.333333333333336], [31.0, 24.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5", "isController": false}, {"data": [[43.824427480916064, 60.75572519083973]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5-Aggregated", "isController": false}, {"data": [[32.0, 24.666666666666668], [33.0, 34.0], [34.0, 39.0], [35.0, 7.25], [37.0, 23.0], [38.0, 30.75], [39.0, 34.0], [40.0, 144.0], [41.0, 38.66666666666667], [42.0, 137.0], [43.0, 8.0], [44.0, 27.0], [45.0, 6.5], [46.0, 26.5], [47.0, 38.5], [48.0, 37.5], [49.0, 25.0], [50.0, 55.83798882681566], [5.0, 7.0], [6.0, 8.0], [10.0, 7.0], [11.0, 14.0], [13.0, 7.0], [14.0, 90.25], [15.0, 269.0], [16.0, 48.0], [17.0, 6.0], [18.0, 17.0], [19.0, 8.0], [20.0, 15.666666666666666], [21.0, 29.0], [22.0, 36.0], [23.0, 24.25], [26.0, 15.25], [28.0, 17.666666666666668], [29.0, 11.5], [30.0, 30.0], [31.0, 31.8]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4", "isController": false}, {"data": [[43.824427480916064, 48.82061068702294]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4-Aggregated", "isController": false}, {"data": [[32.0, 26.0], [33.0, 37.0], [34.0, 43.5], [35.0, 16.5], [37.0, 26.5], [38.0, 21.0], [39.0, 45.0], [40.0, 41.0], [41.0, 23.333333333333336], [42.0, 24.5], [43.0, 9.0], [44.0, 33.0], [45.0, 7.5], [46.0, 27.5], [47.0, 42.5], [48.0, 44.0], [49.0, 28.0], [50.0, 57.089385474860336], [5.0, 7.0], [6.0, 7.0], [10.0, 9.0], [11.0, 47.0], [13.0, 9.0], [14.0, 96.75], [15.0, 33.0], [16.0, 18.0], [17.0, 6.0], [18.0, 27.0], [19.0, 7.0], [20.0, 18.333333333333332], [21.0, 34.5], [22.0, 11.0], [23.0, 26.0], [26.0, 19.0], [28.0, 18.666666666666668], [29.0, 11.5], [30.0, 37.333333333333336], [31.0, 38.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7", "isController": false}, {"data": [[43.824427480916064, 48.13358778625953]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7-Aggregated", "isController": false}, {"data": [[32.0, 21.0], [33.0, 40.0], [34.0, 48.0], [35.0, 16.75], [37.0, 24.5], [38.0, 24.75], [39.0, 34.0], [40.0, 38.0], [41.0, 27.666666666666668], [42.0, 25.0], [43.0, 18.0], [44.0, 33.5], [45.0, 14.5], [46.0, 34.5], [47.0, 37.5], [48.0, 44.5], [49.0, 29.0], [50.0, 37.636871508379855], [5.0, 13.0], [6.0, 12.0], [10.0, 11.0], [11.0, 13.5], [13.0, 12.0], [14.0, 20.0], [15.0, 14.0], [16.0, 35.0], [17.0, 11.0], [18.0, 17.0], [19.0, 13.0], [20.0, 20.666666666666668], [21.0, 23.5], [22.0, 35.0], [23.0, 27.25], [26.0, 19.75], [28.0, 34.0], [29.0, 21.5], [30.0, 31.666666666666668], [31.0, 28.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6", "isController": false}, {"data": [[43.824427480916064, 33.82824427480915]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6-Aggregated", "isController": false}, {"data": [[32.0, 7.0], [33.0, 7.0], [34.0, 12.5], [35.0, 6.75], [37.0, 7.0], [38.0, 6.75], [39.0, 7.0], [40.0, 7.0], [41.0, 7.333333333333333], [42.0, 7.0], [43.0, 8.0], [44.0, 6.75], [45.0, 7.25], [46.0, 8.5], [47.0, 8.0], [48.0, 7.5], [49.0, 6.0], [50.0, 7.195530726256981], [5.0, 7.0], [6.0, 7.0], [10.0, 7.0], [11.0, 8.5], [13.0, 8.0], [14.0, 8.25], [15.0, 7.0], [16.0, 7.0], [17.0, 7.0], [18.0, 10.0], [19.0, 7.0], [20.0, 7.0], [21.0, 7.0], [22.0, 9.0], [23.0, 6.75], [26.0, 7.5], [28.0, 7.0], [29.0, 7.0], [30.0, 6.666666666666667], [31.0, 9.8]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1", "isController": false}, {"data": [[43.824427480916064, 7.301526717557257]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1-Aggregated", "isController": false}, {"data": [[50.0, 12.92]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet", "isController": false}, {"data": [[50.0, 12.92]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet-Aggregated", "isController": false}, {"data": [[32.0, 8.0], [33.0, 7.0], [34.0, 10.5], [35.0, 8.5], [37.0, 7.0], [38.0, 8.0], [39.0, 13.0], [40.0, 16.0], [41.0, 7.666666666666667], [42.0, 10.5], [43.0, 7.0], [44.0, 6.5], [45.0, 8.5], [46.0, 16.5], [47.0, 12.5], [48.0, 8.0], [49.0, 6.0], [50.0, 7.620111731843575], [5.0, 7.0], [6.0, 7.0], [10.0, 10.0], [11.0, 7.0], [13.0, 10.0], [14.0, 8.5], [15.0, 7.0], [16.0, 7.0], [17.0, 13.0], [18.0, 7.0], [19.0, 7.0], [20.0, 6.666666666666667], [21.0, 6.5], [22.0, 7.0], [23.0, 7.0], [26.0, 7.5], [28.0, 9.0], [29.0, 7.0], [30.0, 10.0], [31.0, 7.4]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0", "isController": false}, {"data": [[43.824427480916064, 7.858778625954203]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0-Aggregated", "isController": false}, {"data": [[32.0, 31.666666666666668], [33.0, 58.0], [34.0, 56.0], [35.0, 26.5], [37.0, 53.0], [38.0, 43.25], [39.0, 43.0], [40.0, 44.0], [41.0, 33.0], [42.0, 36.0], [43.0, 39.0], [44.0, 44.5], [45.0, 26.5], [46.0, 39.5], [47.0, 44.5], [48.0, 43.5], [49.0, 40.0], [50.0, 50.39664804469271], [5.0, 26.0], [6.0, 31.0], [10.0, 29.0], [11.0, 26.5], [13.0, 26.0], [14.0, 32.25], [15.0, 25.0], [16.0, 27.0], [17.0, 25.0], [18.0, 26.0], [19.0, 27.0], [20.0, 26.0], [21.0, 34.5], [22.0, 33.0], [23.0, 43.75], [26.0, 40.0], [28.0, 41.0], [29.0, 26.5], [30.0, 48.0], [31.0, 39.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3", "isController": false}, {"data": [[43.824427480916064, 46.14122137404578]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3-Aggregated", "isController": false}, {"data": [[32.0, 8.0], [33.0, 8.0], [34.0, 11.5], [35.0, 7.25], [37.0, 7.5], [38.0, 7.0], [39.0, 8.0], [40.0, 7.0], [41.0, 7.666666666666667], [42.0, 7.5], [43.0, 11.0], [44.0, 9.25], [45.0, 7.5], [46.0, 7.5], [47.0, 10.5], [48.0, 8.0], [49.0, 26.0], [50.0, 9.15642458100559], [5.0, 8.0], [6.0, 7.0], [10.0, 7.0], [11.0, 7.5], [13.0, 7.0], [14.0, 7.75], [15.0, 7.0], [16.0, 7.0], [17.0, 6.0], [18.0, 13.0], [19.0, 7.0], [20.0, 7.333333333333333], [21.0, 7.5], [22.0, 6.0], [23.0, 7.5], [26.0, 7.75], [28.0, 8.0], [29.0, 12.0], [30.0, 8.666666666666666], [31.0, 8.2]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2", "isController": false}, {"data": [[43.824427480916064, 8.870229007633586]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2-Aggregated", "isController": false}, {"data": [[50.0, 15.555555555555555]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message", "isController": false}, {"data": [[50.0, 15.555555555555555]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message-Aggregated", "isController": false}, {"data": [[50.0, 99.34883720930232]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64", "isController": false}, {"data": [[50.0, 99.34883720930232]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-Aggregated", "isController": false}, {"data": [[32.0, 76.0], [33.0, 96.0], [34.0, 105.0], [35.0, 149.0], [37.0, 96.0], [38.0, 95.0], [39.0, 92.0], [40.0, 85.5], [41.0, 114.0], [43.0, 82.5], [44.0, 96.0], [45.0, 87.0], [46.0, 175.0], [47.0, 72.0], [3.0, 194.5], [49.0, 94.0], [50.0, 93.33333333333331], [4.0, 72.0], [6.0, 88.0], [7.0, 102.0], [8.0, 79.0], [9.0, 125.0], [10.0, 105.5], [11.0, 200.0], [13.0, 246.0], [15.0, 174.5], [17.0, 106.0], [18.0, 78.0], [19.0, 103.0], [20.0, 80.5], [22.0, 91.0], [23.0, 75.0], [26.0, 78.5], [28.0, 77.0], [29.0, 90.0], [31.0, 101.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home", "isController": false}, {"data": [[29.70175438596491, 107.45614035087716]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-Aggregated", "isController": false}, {"data": [[50.0, 741.4999999999999]], "isOverall": false, "label": "uczen", "isController": true}, {"data": [[50.0, 741.4999999999999]], "isOverall": false, "label": "uczen-Aggregated", "isController": true}, {"data": [[50.0, 10.3125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0", "isController": false}, {"data": [[50.0, 10.3125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0-Aggregated", "isController": false}, {"data": [[50.0, 6.843749999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1", "isController": false}, {"data": [[50.0, 6.843749999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1-Aggregated", "isController": false}, {"data": [[50.0, 1162.74]], "isOverall": false, "label": "teacher", "isController": true}, {"data": [[50.0, 1162.74]], "isOverall": false, "label": "teacher-Aggregated", "isController": true}, {"data": [[50.0, 102.6341463414634]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession", "isController": false}, {"data": [[50.0, 102.6341463414634]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-Aggregated", "isController": false}, {"data": [[50.0, 7.749999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2", "isController": false}, {"data": [[50.0, 7.749999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2-Aggregated", "isController": false}, {"data": [[50.0, 67.12500000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist", "isController": false}, {"data": [[50.0, 67.12500000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-Aggregated", "isController": false}, {"data": [[50.0, 32.53125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7", "isController": false}, {"data": [[50.0, 32.53125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7-Aggregated", "isController": false}, {"data": [[50.0, 42.84375000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3", "isController": false}, {"data": [[50.0, 42.84375000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3-Aggregated", "isController": false}, {"data": [[50.0, 26.09375]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4", "isController": false}, {"data": [[50.0, 26.09375]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4-Aggregated", "isController": false}, {"data": [[50.0, 27.999999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5", "isController": false}, {"data": [[50.0, 27.999999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5-Aggregated", "isController": false}, {"data": [[50.0, 31.03125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6", "isController": false}, {"data": [[50.0, 31.03125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6-Aggregated", "isController": false}, {"data": [[50.0, 8.754999999999994]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0", "isController": false}, {"data": [[50.0, 8.754999999999994]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0-Aggregated", "isController": false}, {"data": [[50.0, 8.026315789473687]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2", "isController": false}, {"data": [[50.0, 8.026315789473687]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2-Aggregated", "isController": false}, {"data": [[50.0, 39.883720930232556]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5", "isController": false}, {"data": [[50.0, 39.883720930232556]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5-Aggregated", "isController": false}, {"data": [[50.0, 7.145]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1", "isController": false}, {"data": [[50.0, 7.145]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1-Aggregated", "isController": false}, {"data": [[50.0, 47.82456140350876]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3", "isController": false}, {"data": [[50.0, 47.82456140350876]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3-Aggregated", "isController": false}, {"data": [[50.0, 37.65116279069767]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6", "isController": false}, {"data": [[50.0, 37.65116279069767]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6-Aggregated", "isController": false}, {"data": [[50.0, 47.21929824561404]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4", "isController": false}, {"data": [[50.0, 47.21929824561404]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4-Aggregated", "isController": false}, {"data": [[50.0, 44.74418604651163]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7", "isController": false}, {"data": [[50.0, 44.74418604651163]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7-Aggregated", "isController": false}, {"data": [[50.0, 53.23684210526316]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5", "isController": false}, {"data": [[50.0, 53.23684210526316]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5-Aggregated", "isController": false}, {"data": [[50.0, 65.61499999999998]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4", "isController": false}, {"data": [[50.0, 65.61499999999998]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4-Aggregated", "isController": false}, {"data": [[50.0, 6.930232558139535]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1", "isController": false}, {"data": [[50.0, 6.930232558139535]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1-Aggregated", "isController": false}, {"data": [[50.0, 50.285]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5", "isController": false}, {"data": [[50.0, 50.285]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5-Aggregated", "isController": false}, {"data": [[50.0, 8.255813953488374]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2", "isController": false}, {"data": [[50.0, 8.255813953488374]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2-Aggregated", "isController": false}, {"data": [[50.0, 8.53]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2", "isController": false}, {"data": [[50.0, 8.53]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2-Aggregated", "isController": false}, {"data": [[50.0, 11.710526315789474]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0", "isController": false}, {"data": [[50.0, 11.710526315789474]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0-Aggregated", "isController": false}, {"data": [[50.0, 56.604651162790695]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3", "isController": false}, {"data": [[50.0, 56.604651162790695]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3-Aggregated", "isController": false}, {"data": [[50.0, 50.30000000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3", "isController": false}, {"data": [[50.0, 50.30000000000002]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3-Aggregated", "isController": false}, {"data": [[50.0, 7.245614035087719]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1", "isController": false}, {"data": [[50.0, 7.245614035087719]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1-Aggregated", "isController": false}, {"data": [[50.0, 60.116279069767465]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4", "isController": false}, {"data": [[50.0, 60.116279069767465]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4-Aggregated", "isController": false}, {"data": [[50.0, 10.279069767441861]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0", "isController": false}, {"data": [[50.0, 10.279069767441861]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0-Aggregated", "isController": false}, {"data": [[50.0, 113.97916666666663]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error", "isController": false}, {"data": [[50.0, 113.97916666666663]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-Aggregated", "isController": false}, {"data": [[50.0, 37.910000000000004]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6", "isController": false}, {"data": [[50.0, 37.910000000000004]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6-Aggregated", "isController": false}, {"data": [[50.0, 48.06000000000003]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7", "isController": false}, {"data": [[50.0, 48.06000000000003]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7-Aggregated", "isController": false}, {"data": [[50.0, 34.28070175438596]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6", "isController": false}, {"data": [[50.0, 34.28070175438596]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6-Aggregated", "isController": false}, {"data": [[50.0, 41.798245614035096]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7", "isController": false}, {"data": [[50.0, 41.798245614035096]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 50.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 7345.933333333333, "minX": 1.5883377E12, "maxY": 524134.11666666664, "series": [{"data": [[1.58833794E12, 50694.96666666667], [1.58833776E12, 64885.816666666666], [1.58833782E12, 101859.21666666666], [1.5883377E12, 524134.11666666664], [1.58833788E12, 158918.53333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.58833794E12, 7345.933333333333], [1.58833776E12, 40853.96666666667], [1.58833782E12, 64871.8], [1.5883377E12, 32403.016666666666], [1.58833788E12, 81163.98333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58833794E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.5883377E12, "maxY": 1892.1799999999998, "series": [{"data": [[1.58833776E12, 71.66666666666669], [1.58833782E12, 53.54]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher", "isController": false}, {"data": [[1.58833794E12, 89.375], [1.58833788E12, 102.0714285714286]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet", "isController": false}, {"data": [[1.58833782E12, 12.339622641509433], [1.58833788E12, 12.499999999999998]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass", "isController": false}, {"data": [[1.58833794E12, 78.16666666666666], [1.58833776E12, 65.85925925925926], [1.5883377E12, 76.46984126984133], [1.58833788E12, 40.583333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass", "isController": false}, {"data": [[1.58833782E12, 84.82857142857142], [1.58833788E12, 106.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 314.49999999999994]], "isOverall": false, "label": "reset", "isController": true}, {"data": [[1.58833782E12, 6.685714285714285], [1.58833788E12, 6.733333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0", "isController": false}, {"data": [[1.58833782E12, 40.55555555555556], [1.58833788E12, 39.03468208092486]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7", "isController": false}, {"data": [[1.58833782E12, 8.228571428571431], [1.58833788E12, 7.933333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2", "isController": false}, {"data": [[1.58833782E12, 34.555555555555564], [1.58833788E12, 32.01156069364162]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6", "isController": false}, {"data": [[1.58833782E12, 7.0285714285714285], [1.58833788E12, 7.2]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1", "isController": false}, {"data": [[1.58833782E12, 78.58518518518525], [1.58833788E12, 89.56969696969693]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60", "isController": false}, {"data": [[1.58833782E12, 32.592592592592595], [1.58833788E12, 43.26589595375724]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5", "isController": false}, {"data": [[1.58833782E12, 46.685714285714276], [1.58833788E12, 56.93333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4", "isController": false}, {"data": [[1.58833782E12, 49.74074074074073], [1.58833788E12, 41.40462427745665]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4", "isController": false}, {"data": [[1.58833782E12, 53.94285714285715], [1.58833788E12, 51.133333333333326]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3", "isController": false}, {"data": [[1.58833782E12, 47.37037037037038], [1.58833788E12, 44.45664739884392]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3", "isController": false}, {"data": [[1.58833782E12, 37.371428571428574], [1.58833788E12, 36.13333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6", "isController": false}, {"data": [[1.58833782E12, 8.148148148148147], [1.58833788E12, 7.867052023121388]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2", "isController": false}, {"data": [[1.58833782E12, 41.51428571428571], [1.58833788E12, 40.73333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5", "isController": false}, {"data": [[1.58833782E12, 7.037037037037038], [1.58833788E12, 7.023121387283239]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1", "isController": false}, {"data": [[1.58833794E12, 30.25], [1.5883377E12, 73.4], [1.58833788E12, 31.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4", "isController": false}, {"data": [[1.58833782E12, 9.85185185185185], [1.58833788E12, 7.936416184971104]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0", "isController": false}, {"data": [[1.58833794E12, 66.0], [1.5883377E12, 70.39999999999998], [1.58833788E12, 27.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5", "isController": false}, {"data": [[1.58833782E12, 46.25714285714285], [1.58833788E12, 65.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7", "isController": false}, {"data": [[1.58833794E12, 22.75], [1.5883377E12, 49.32], [1.58833788E12, 24.666666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6", "isController": false}, {"data": [[1.58833794E12, 17.0], [1.5883377E12, 70.06000000000002], [1.58833788E12, 19.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7", "isController": false}, {"data": [[1.58833794E12, 6.5], [1.5883377E12, 7.340000000000001], [1.58833788E12, 6.333333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0", "isController": false}, {"data": [[1.58833794E12, 7.0], [1.5883377E12, 7.699999999999999], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1", "isController": false}, {"data": [[1.58833794E12, 17.75], [1.5883377E12, 11.419999999999998], [1.58833788E12, 15.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2", "isController": false}, {"data": [[1.58833794E12, 28.25], [1.5883377E12, 68.76000000000002], [1.58833788E12, 30.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3", "isController": false}, {"data": [[1.58833794E12, 56.0], [1.58833788E12, 37.666666666666664]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5", "isController": false}, {"data": [[1.58833794E12, 42.75], [1.58833788E12, 38.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6", "isController": false}, {"data": [[1.58833794E12, 39.0], [1.58833788E12, 36.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3", "isController": false}, {"data": [[1.58833794E12, 45.5], [1.58833788E12, 34.666666666666664]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4", "isController": false}, {"data": [[1.58833794E12, 8.75], [1.58833788E12, 7.666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1", "isController": false}, {"data": [[1.58833794E12, 68.5], [1.58833788E12, 53.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2", "isController": false}, {"data": [[1.58833794E12, 330.0], [1.58833788E12, 240.66666666666666]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0", "isController": false}, {"data": [[1.58833794E12, 48.37500000000001], [1.58833788E12, 57.24999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3", "isController": false}, {"data": [[1.58833794E12, 44.0], [1.58833788E12, 49.379310344827594]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4", "isController": false}, {"data": [[1.58833794E12, 78.6], [1.58833788E12, 47.61111111111111]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7", "isController": false}, {"data": [[1.58833794E12, 6.857142857142857], [1.58833788E12, 6.965517241379311]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1", "isController": false}, {"data": [[1.58833794E12, 9.142857142857142], [1.58833788E12, 7.96551724137931]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2", "isController": false}, {"data": [[1.58833794E12, 83.8], [1.58833788E12, 58.49999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5", "isController": false}, {"data": [[1.58833794E12, 63.57142857142858], [1.58833788E12, 57.379310344827594]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7", "isController": false}, {"data": [[1.58833794E12, 40.8], [1.58833788E12, 40.444444444444436]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6", "isController": false}, {"data": [[1.58833776E12, 7.745098039215687], [1.58833782E12, 7.076923076923078], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0", "isController": false}, {"data": [[1.58833794E12, 51.4], [1.58833788E12, 52.94444444444444]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3", "isController": false}, {"data": [[1.58833794E12, 39.285714285714285], [1.58833788E12, 39.72413793103449]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5", "isController": false}, {"data": [[1.58833776E12, 6.999999999999999], [1.58833782E12, 7.056410256410255], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1", "isController": false}, {"data": [[1.58833794E12, 53.6], [1.58833788E12, 49.750000000000014]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4", "isController": false}, {"data": [[1.58833794E12, 42.00000000000001], [1.58833788E12, 38.58620689655172]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6", "isController": false}, {"data": [[1.58833776E12, 7.764705882352941], [1.58833782E12, 7.989743589743588], [1.58833788E12, 8.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2", "isController": false}, {"data": [[1.58833794E12, 7.0], [1.58833788E12, 7.111111111111111]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1", "isController": false}, {"data": [[1.58833776E12, 35.37254901960785], [1.58833782E12, 48.66153846153847], [1.58833788E12, 64.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3", "isController": false}, {"data": [[1.58833794E12, 8.8], [1.58833788E12, 8.472222222222221]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2", "isController": false}, {"data": [[1.58833776E12, 33.07843137254902], [1.58833782E12, 47.405128205128214], [1.58833788E12, 41.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4", "isController": false}, {"data": [[1.58833776E12, 43.27450980392157], [1.58833782E12, 49.969230769230755], [1.58833788E12, 42.5]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5", "isController": false}, {"data": [[1.58833794E12, 7.2], [1.58833788E12, 6.861111111111112]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0", "isController": false}, {"data": [[1.58833776E12, 24.64705882352941], [1.58833782E12, 35.743589743589745], [1.58833788E12, 43.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6", "isController": false}, {"data": [[1.58833776E12, 33.7843137254902], [1.58833782E12, 42.4923076923077], [1.58833788E12, 89.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7", "isController": false}, {"data": [[1.58833794E12, 13.714285714285715], [1.58833788E12, 13.27586206896552]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0", "isController": false}, {"data": [[1.58833776E12, 69.98571428571427], [1.58833782E12, 55.69892473118282], [1.58833788E12, 70.125]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil", "isController": false}, {"data": [[1.58833782E12, 85.66666666666664], [1.58833788E12, 83.6531791907515]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60", "isController": false}, {"data": [[1.58833782E12, 30.91111111111111], [1.58833788E12, 32.290909090909096]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6", "isController": false}, {"data": [[1.58833782E12, 37.66666666666668], [1.58833788E12, 37.90303030303032]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5", "isController": false}, {"data": [[1.58833782E12, 34.0], [1.58833788E12, 51.00606060606059]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7", "isController": false}, {"data": [[1.5883377E12, 1892.1799999999998]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.58833794E12, 408.25], [1.58833788E12, 294.3333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset", "isController": false}, {"data": [[1.58833794E12, 12.363636363636363], [1.58833782E12, 14.416666666666668], [1.5883377E12, 18.880000000000006], [1.58833788E12, 14.959595959595957]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/", "isController": false}, {"data": [[1.58833794E12, 71.83333333333334], [1.58833782E12, 89.74418604651163], [1.58833788E12, 114.2923076923077]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout", "isController": false}, {"data": [[1.58833794E12, 42.666666666666664], [1.58833788E12, 39.42222222222224]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5", "isController": false}, {"data": [[1.58833794E12, 45.0], [1.58833788E12, 43.73333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6", "isController": false}, {"data": [[1.58833782E12, 7.955882352941178], [1.58833788E12, 7.798780487804876]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0", "isController": false}, {"data": [[1.58833794E12, 124.66666666666666], [1.58833788E12, 78.84444444444446]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3", "isController": false}, {"data": [[1.58833794E12, 38.666666666666664], [1.58833788E12, 55.13333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4", "isController": false}, {"data": [[1.58833782E12, 7.77037037037037], [1.58833788E12, 7.781818181818182]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2", "isController": false}, {"data": [[1.58833794E12, 8.666666666666666], [1.58833788E12, 8.066666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1", "isController": false}, {"data": [[1.58833782E12, 7.140740740740743], [1.58833788E12, 7.036363636363636]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1", "isController": false}, {"data": [[1.58833794E12, 68.66666666666667], [1.58833788E12, 55.42222222222222]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2", "isController": false}, {"data": [[1.58833782E12, 38.0074074074074], [1.58833788E12, 40.545454545454554]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4", "isController": false}, {"data": [[1.58833782E12, 42.614814814814814], [1.58833788E12, 44.199999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3", "isController": false}, {"data": [[1.58833794E12, 7.0], [1.58833788E12, 7.244444444444445]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0", "isController": false}, {"data": [[1.58833794E12, 60.6], [1.58833776E12, 75.38235294117649], [1.5883377E12, 56.68131868131871], [1.58833788E12, 24.714285714285715]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5", "isController": false}, {"data": [[1.58833794E12, 28.8], [1.58833776E12, 47.64705882352939], [1.5883377E12, 50.63736263736268], [1.58833788E12, 27.285714285714285]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4", "isController": false}, {"data": [[1.58833794E12, 32.4], [1.58833776E12, 53.720588235294116], [1.5883377E12, 47.30769230769232], [1.58833788E12, 26.571428571428573]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7", "isController": false}, {"data": [[1.58833794E12, 33.6], [1.58833776E12, 40.867647058823536], [1.5883377E12, 30.950549450549456], [1.58833788E12, 40.42857142857142]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6", "isController": false}, {"data": [[1.58833794E12, 6.8], [1.58833776E12, 7.235294117647058], [1.5883377E12, 7.357142857142859], [1.58833788E12, 6.857142857142857]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1", "isController": false}, {"data": [[1.58833782E12, 13.4], [1.58833788E12, 12.866666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet", "isController": false}, {"data": [[1.58833794E12, 9.8], [1.58833776E12, 7.352941176470587], [1.5883377E12, 8.010989010989015], [1.58833788E12, 7.428571428571428]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0", "isController": false}, {"data": [[1.58833794E12, 43.4], [1.58833776E12, 54.7794117647059], [1.5883377E12, 43.335164835164825], [1.58833788E12, 37.142857142857146]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3", "isController": false}, {"data": [[1.58833794E12, 7.4], [1.58833776E12, 10.323529411764707], [1.5883377E12, 8.41758241758242], [1.58833788E12, 7.571428571428571]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2", "isController": false}, {"data": [[1.58833794E12, 16.0], [1.58833788E12, 15.333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message", "isController": false}, {"data": [[1.58833794E12, 81.14285714285714], [1.58833788E12, 108.13793103448276]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64", "isController": false}, {"data": [[1.58833794E12, 87.75], [1.5883377E12, 112.75999999999999], [1.58833788E12, 45.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home", "isController": false}, {"data": [[1.58833782E12, 656.0], [1.58833788E12, 746.5294117647059]], "isOverall": false, "label": "uczen", "isController": true}, {"data": [[1.58833794E12, 11.454545454545455], [1.58833788E12, 9.714285714285714]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0", "isController": false}, {"data": [[1.58833794E12, 6.909090909090909], [1.58833788E12, 6.809523809523809]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1", "isController": false}, {"data": [[1.58833782E12, 1159.4761904761904], [1.58833788E12, 1179.875]], "isOverall": false, "label": "teacher", "isController": true}, {"data": [[1.58833794E12, 152.8], [1.58833788E12, 95.66666666666664]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession", "isController": false}, {"data": [[1.58833794E12, 8.181818181818182], [1.58833788E12, 7.523809523809524]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2", "isController": false}, {"data": [[1.58833794E12, 77.09090909090911], [1.58833788E12, 61.90476190476192]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist", "isController": false}, {"data": [[1.58833794E12, 40.72727272727273], [1.58833788E12, 28.238095238095237]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7", "isController": false}, {"data": [[1.58833794E12, 50.81818181818182], [1.58833788E12, 38.66666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3", "isController": false}, {"data": [[1.58833794E12, 31.545454545454547], [1.58833788E12, 23.238095238095237]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4", "isController": false}, {"data": [[1.58833794E12, 30.545454545454547], [1.58833788E12, 26.666666666666664]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5", "isController": false}, {"data": [[1.58833794E12, 35.18181818181818], [1.58833788E12, 28.857142857142858]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6", "isController": false}, {"data": [[1.58833776E12, 9.034285714285708], [1.58833782E12, 6.800000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0", "isController": false}, {"data": [[1.58833794E12, 8.166666666666668], [1.58833782E12, 8.209302325581397], [1.58833788E12, 7.892307692307693]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2", "isController": false}, {"data": [[1.58833794E12, 34.785714285714285], [1.58833788E12, 42.3448275862069]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5", "isController": false}, {"data": [[1.58833776E12, 7.119999999999999], [1.58833782E12, 7.3199999999999985]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1", "isController": false}, {"data": [[1.58833794E12, 39.666666666666664], [1.58833782E12, 48.325581395348834], [1.58833788E12, 48.24615384615385]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3", "isController": false}, {"data": [[1.58833794E12, 38.214285714285715], [1.58833788E12, 37.37931034482758]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6", "isController": false}, {"data": [[1.58833794E12, 35.166666666666664], [1.58833782E12, 47.1860465116279], [1.58833788E12, 48.353846153846156]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4", "isController": false}, {"data": [[1.58833794E12, 44.35714285714286], [1.58833788E12, 44.93103448275862]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7", "isController": false}, {"data": [[1.58833794E12, 30.500000000000004], [1.58833782E12, 41.348837209302324], [1.58833788E12, 63.199999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5", "isController": false}, {"data": [[1.58833776E12, 66.48571428571425], [1.58833782E12, 59.52]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4", "isController": false}, {"data": [[1.58833794E12, 7.214285714285716], [1.58833788E12, 6.793103448275862]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1", "isController": false}, {"data": [[1.58833776E12, 50.63999999999998], [1.58833782E12, 47.8]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5", "isController": false}, {"data": [[1.58833794E12, 8.428571428571427], [1.58833788E12, 8.172413793103448]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2", "isController": false}, {"data": [[1.58833776E12, 8.531428571428574], [1.58833782E12, 8.520000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2", "isController": false}, {"data": [[1.58833794E12, 11.5], [1.58833782E12, 11.837209302325581], [1.58833788E12, 11.646153846153847]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0", "isController": false}, {"data": [[1.58833794E12, 53.50000000000001], [1.58833788E12, 58.103448275862064]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3", "isController": false}, {"data": [[1.58833776E12, 49.95428571428572], [1.58833782E12, 52.72]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3", "isController": false}, {"data": [[1.58833794E12, 7.333333333333334], [1.58833782E12, 7.232558139534882], [1.58833788E12, 7.246153846153845]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1", "isController": false}, {"data": [[1.58833794E12, 41.57142857142858], [1.58833788E12, 69.06896551724141]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4", "isController": false}, {"data": [[1.58833794E12, 9.857142857142858], [1.58833788E12, 10.482758620689655]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0", "isController": false}, {"data": [[1.58833794E12, 154.0], [1.58833788E12, 111.31111111111107]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error", "isController": false}, {"data": [[1.58833776E12, 37.70285714285715], [1.58833782E12, 39.36]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6", "isController": false}, {"data": [[1.58833776E12, 47.70857142857144], [1.58833782E12, 50.519999999999996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7", "isController": false}, {"data": [[1.58833794E12, 31.666666666666668], [1.58833782E12, 34.30232558139534], [1.58833788E12, 34.5076923076923]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6", "isController": false}, {"data": [[1.58833794E12, 44.166666666666664], [1.58833782E12, 38.74418604651162], [1.58833788E12, 43.600000000000016]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58833794E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.5883377E12, "maxY": 328.25, "series": [{"data": [[1.58833776E12, 11.556666666666667], [1.58833782E12, 10.82]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher", "isController": false}, {"data": [[1.58833794E12, 13.625], [1.58833788E12, 13.285714285714288]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet", "isController": false}, {"data": [[1.58833782E12, 12.235849056603769], [1.58833788E12, 12.444444444444441]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass", "isController": false}, {"data": [[1.58833794E12, 10.5], [1.58833776E12, 11.133333333333335], [1.5883377E12, 10.917460317460323], [1.58833788E12, 9.333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass", "isController": false}, {"data": [[1.58833782E12, 6.685714285714285], [1.58833788E12, 6.733333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 254.25]], "isOverall": false, "label": "reset", "isController": true}, {"data": [[1.58833782E12, 6.685714285714285], [1.58833788E12, 6.733333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6", "isController": false}, {"data": [[1.58833782E12, 6.885714285714285], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1", "isController": false}, {"data": [[1.58833782E12, 7.948148148148149], [1.58833788E12, 7.793939393939396]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4", "isController": false}, {"data": [[1.58833782E12, 53.828571428571436], [1.58833788E12, 51.06666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3", "isController": false}, {"data": [[1.58833782E12, 47.18518518518518], [1.58833788E12, 44.364161849710996]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5", "isController": false}, {"data": [[1.58833782E12, 6.962962962962963], [1.58833788E12, 6.919075144508672]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1", "isController": false}, {"data": [[1.58833794E12, 13.5], [1.5883377E12, 54.48000000000001], [1.58833788E12, 9.333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4", "isController": false}, {"data": [[1.58833782E12, 9.85185185185185], [1.58833788E12, 7.936416184971104]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0", "isController": false}, {"data": [[1.58833794E12, 54.99999999999999], [1.5883377E12, 58.459999999999994], [1.58833788E12, 12.666666666666666]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7", "isController": false}, {"data": [[1.58833794E12, 21.0], [1.5883377E12, 47.6], [1.58833788E12, 22.666666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6", "isController": false}, {"data": [[1.58833794E12, 12.5], [1.5883377E12, 67.13999999999999], [1.58833788E12, 16.333333333333332]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7", "isController": false}, {"data": [[1.58833794E12, 6.5], [1.5883377E12, 7.340000000000001], [1.58833788E12, 6.333333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0", "isController": false}, {"data": [[1.58833794E12, 7.0], [1.5883377E12, 7.58], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1", "isController": false}, {"data": [[1.58833794E12, 17.75], [1.5883377E12, 11.379999999999997], [1.58833788E12, 15.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2", "isController": false}, {"data": [[1.58833794E12, 28.0], [1.5883377E12, 68.5], [1.58833788E12, 29.666666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1", "isController": false}, {"data": [[1.58833794E12, 68.25], [1.58833788E12, 53.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2", "isController": false}, {"data": [[1.58833794E12, 328.25], [1.58833788E12, 240.33333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0", "isController": false}, {"data": [[1.58833794E12, 48.37500000000001], [1.58833788E12, 57.17857142857142]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7", "isController": false}, {"data": [[1.58833794E12, 6.857142857142857], [1.58833788E12, 6.931034482758621]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6", "isController": false}, {"data": [[1.58833776E12, 7.745098039215687], [1.58833782E12, 7.076923076923078], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0", "isController": false}, {"data": [[1.58833794E12, 51.4], [1.58833788E12, 52.888888888888886]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5", "isController": false}, {"data": [[1.58833776E12, 6.960784313725491], [1.58833782E12, 6.958974358974359], [1.58833788E12, 7.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2", "isController": false}, {"data": [[1.58833794E12, 6.6], [1.58833788E12, 7.055555555555557]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1", "isController": false}, {"data": [[1.58833776E12, 35.333333333333336], [1.58833782E12, 48.615384615384606], [1.58833788E12, 64.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5", "isController": false}, {"data": [[1.58833794E12, 7.2], [1.58833788E12, 6.861111111111112]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7", "isController": false}, {"data": [[1.58833794E12, 13.714285714285715], [1.58833788E12, 13.27586206896552]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0", "isController": false}, {"data": [[1.58833776E12, 9.65714285714286], [1.58833782E12, 10.962365591397843], [1.58833788E12, 11.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil", "isController": false}, {"data": [[1.58833782E12, 9.85185185185185], [1.58833788E12, 7.936416184971104]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7", "isController": false}, {"data": [[1.5883377E12, 313.84000000000003]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.58833794E12, 328.25], [1.58833788E12, 240.33333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset", "isController": false}, {"data": [[1.58833794E12, 12.272727272727272], [1.58833782E12, 14.333333333333332], [1.5883377E12, 18.7], [1.58833788E12, 14.848484848484846]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/", "isController": false}, {"data": [[1.58833794E12, 11.5], [1.58833782E12, 11.837209302325581], [1.58833788E12, 11.646153846153847]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6", "isController": false}, {"data": [[1.58833782E12, 7.9411764705882355], [1.58833788E12, 7.798780487804876]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1", "isController": false}, {"data": [[1.58833782E12, 7.044444444444447], [1.58833788E12, 6.927272727272729]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1", "isController": false}, {"data": [[1.58833794E12, 68.66666666666667], [1.58833788E12, 55.42222222222222]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4", "isController": false}, {"data": [[1.58833782E12, 42.49629629629628], [1.58833788E12, 44.12121212121211]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3", "isController": false}, {"data": [[1.58833794E12, 7.0], [1.58833788E12, 7.155555555555555]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6", "isController": false}, {"data": [[1.58833794E12, 6.8], [1.58833776E12, 7.117647058823529], [1.5883377E12, 7.258241758241757], [1.58833788E12, 6.571428571428571]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1", "isController": false}, {"data": [[1.58833782E12, 12.933333333333332], [1.58833788E12, 12.807407407407405]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet", "isController": false}, {"data": [[1.58833794E12, 9.8], [1.58833776E12, 7.352941176470587], [1.5883377E12, 8.010989010989015], [1.58833788E12, 7.428571428571428]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0", "isController": false}, {"data": [[1.58833794E12, 43.4], [1.58833776E12, 54.69117647058821], [1.5883377E12, 43.225274725274716], [1.58833788E12, 36.857142857142854]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2", "isController": false}, {"data": [[1.58833794E12, 15.833333333333334], [1.58833788E12, 15.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message", "isController": false}, {"data": [[1.58833794E12, 9.857142857142858], [1.58833788E12, 10.482758620689655]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64", "isController": false}, {"data": [[1.58833794E12, 6.5], [1.5883377E12, 7.340000000000001], [1.58833788E12, 6.333333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home", "isController": false}, {"data": [[1.58833782E12, 103.0], [1.58833788E12, 110.52941176470587]], "isOverall": false, "label": "uczen", "isController": true}, {"data": [[1.58833794E12, 11.454545454545455], [1.58833788E12, 9.714285714285714]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0", "isController": false}, {"data": [[1.58833794E12, 6.909090909090909], [1.58833788E12, 6.809523809523809]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1", "isController": false}, {"data": [[1.58833782E12, 213.4523809523809], [1.58833788E12, 211.125]], "isOverall": false, "label": "teacher", "isController": true}, {"data": [[1.58833794E12, 7.2], [1.58833788E12, 6.861111111111112]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2", "isController": false}, {"data": [[1.58833794E12, 11.454545454545455], [1.58833788E12, 9.714285714285714]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7", "isController": false}, {"data": [[1.58833794E12, 50.81818181818182], [1.58833788E12, 38.57142857142857]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6", "isController": false}, {"data": [[1.58833776E12, 9.034285714285708], [1.58833782E12, 6.800000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5", "isController": false}, {"data": [[1.58833776E12, 7.040000000000001], [1.58833782E12, 7.159999999999999]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1", "isController": false}, {"data": [[1.58833794E12, 39.666666666666664], [1.58833782E12, 48.279069767441854], [1.58833788E12, 48.10769230769232]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4", "isController": false}, {"data": [[1.58833794E12, 7.142857142857142], [1.58833788E12, 6.724137931034483]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2", "isController": false}, {"data": [[1.58833794E12, 11.5], [1.58833782E12, 11.837209302325581], [1.58833788E12, 11.646153846153847]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0", "isController": false}, {"data": [[1.58833794E12, 52.85714285714286], [1.58833788E12, 58.068965517241395]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3", "isController": false}, {"data": [[1.58833776E12, 49.85714285714283], [1.58833782E12, 52.64000000000001]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3", "isController": false}, {"data": [[1.58833794E12, 7.333333333333334], [1.58833782E12, 7.162790697674418], [1.58833788E12, 7.123076923076923]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4", "isController": false}, {"data": [[1.58833794E12, 9.857142857142858], [1.58833788E12, 10.482758620689655]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0", "isController": false}, {"data": [[1.58833794E12, 7.0], [1.58833788E12, 7.155555555555555]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58833794E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.5883377E12, "maxY": 83.26, "series": [{"data": [[1.58833776E12, 3.4633333333333347], [1.58833782E12, 3.02]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher", "isController": false}, {"data": [[1.58833794E12, 6.375], [1.58833788E12, 6.214285714285713]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet", "isController": false}, {"data": [[1.58833782E12, 3.556603773584904], [1.58833788E12, 3.583333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass", "isController": false}, {"data": [[1.58833794E12, 3.5], [1.58833776E12, 2.6740740740740736], [1.5883377E12, 2.412698412698414], [1.58833788E12, 2.0833333333333335]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 5.375]], "isOverall": false, "label": "reset", "isController": true}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0", "isController": false}, {"data": [[1.58833782E12, 25.4074074074074], [1.58833788E12, 23.456647398843938]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2", "isController": false}, {"data": [[1.58833782E12, 18.370370370370374], [1.58833788E12, 16.618497109826595]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1", "isController": false}, {"data": [[1.58833782E12, 1.1407407407407413], [1.58833788E12, 0.9636363636363637]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60", "isController": false}, {"data": [[1.58833782E12, 25.0], [1.58833788E12, 24.670520231213874]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5", "isController": false}, {"data": [[1.58833782E12, 30.314285714285713], [1.58833788E12, 29.46666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4", "isController": false}, {"data": [[1.58833782E12, 24.888888888888886], [1.58833788E12, 24.878612716763]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4", "isController": false}, {"data": [[1.58833782E12, 26.228571428571428], [1.58833788E12, 24.8]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3", "isController": false}, {"data": [[1.58833782E12, 20.7037037037037], [1.58833788E12, 17.942196531791907]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3", "isController": false}, {"data": [[1.58833782E12, 21.857142857142865], [1.58833788E12, 21.333333333333332]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.03468208092485551]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2", "isController": false}, {"data": [[1.58833782E12, 30.142857142857142], [1.58833788E12, 29.06666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5", "isController": false}, {"data": [[1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 37.879999999999995], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4", "isController": false}, {"data": [[1.58833782E12, 2.962962962962963], [1.58833788E12, 1.1213872832369942]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 38.13999999999999], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5", "isController": false}, {"data": [[1.58833782E12, 30.057142857142853], [1.58833788E12, 30.666666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 26.819999999999993], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 41.04000000000001], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 37.28], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3", "isController": false}, {"data": [[1.58833794E12, 26.75], [1.58833788E12, 24.666666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5", "isController": false}, {"data": [[1.58833794E12, 33.0], [1.58833788E12, 29.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6", "isController": false}, {"data": [[1.58833794E12, 32.25], [1.58833788E12, 30.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3", "isController": false}, {"data": [[1.58833794E12, 33.0], [1.58833788E12, 28.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1", "isController": false}, {"data": [[1.58833794E12, 42.0], [1.58833788E12, 27.666666666666664]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2", "isController": false}, {"data": [[1.58833794E12, 6.0], [1.58833788E12, 6.333333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0", "isController": false}, {"data": [[1.58833794E12, 22.375], [1.58833788E12, 30.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3", "isController": false}, {"data": [[1.58833794E12, 32.285714285714285], [1.58833788E12, 33.79310344827586]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4", "isController": false}, {"data": [[1.58833794E12, 38.2], [1.58833788E12, 34.58333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2", "isController": false}, {"data": [[1.58833794E12, 35.2], [1.58833788E12, 34.083333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5", "isController": false}, {"data": [[1.58833794E12, 32.142857142857146], [1.58833788E12, 33.827586206896555]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7", "isController": false}, {"data": [[1.58833794E12, 23.2], [1.58833788E12, 25.5]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6", "isController": false}, {"data": [[1.58833776E12, 0.7450980392156863], [1.58833782E12, 0.12820512820512825], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0", "isController": false}, {"data": [[1.58833794E12, 25.0], [1.58833788E12, 26.333333333333336]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3", "isController": false}, {"data": [[1.58833794E12, 32.0], [1.58833788E12, 32.310344827586206]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1", "isController": false}, {"data": [[1.58833794E12, 33.8], [1.58833788E12, 34.27777777777777]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4", "isController": false}, {"data": [[1.58833794E12, 25.714285714285715], [1.58833788E12, 24.06896551724138]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.03076923076923081], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1", "isController": false}, {"data": [[1.58833776E12, 8.980392156862742], [1.58833782E12, 22.153846153846153], [1.58833788E12, 38.5]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2", "isController": false}, {"data": [[1.58833776E12, 11.588235294117647], [1.58833782E12, 27.502564102564104], [1.58833788E12, 34.5]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4", "isController": false}, {"data": [[1.58833776E12, 11.686274509803923], [1.58833782E12, 27.88205128205128], [1.58833788E12, 35.5]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0", "isController": false}, {"data": [[1.58833776E12, 8.784313725490197], [1.58833782E12, 19.897435897435898], [1.58833788E12, 28.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6", "isController": false}, {"data": [[1.58833776E12, 12.431372549019608], [1.58833782E12, 27.87692307692307], [1.58833788E12, 35.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7", "isController": false}, {"data": [[1.58833794E12, 6.428571428571429], [1.58833788E12, 6.206896551724136]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0", "isController": false}, {"data": [[1.58833776E12, 2.257142857142857], [1.58833782E12, 2.8844086021505397], [1.58833788E12, 3.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil", "isController": false}, {"data": [[1.58833782E12, 2.962962962962963], [1.58833788E12, 1.1213872832369942]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60", "isController": false}, {"data": [[1.58833782E12, 15.059259259259262], [1.58833788E12, 15.53333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6", "isController": false}, {"data": [[1.58833782E12, 19.792592592592595], [1.58833788E12, 23.72121212121213]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5", "isController": false}, {"data": [[1.58833782E12, 19.9111111111111], [1.58833788E12, 21.812121212121212]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7", "isController": false}, {"data": [[1.5883377E12, 83.26]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.58833794E12, 6.0], [1.58833788E12, 6.333333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset", "isController": false}, {"data": [[1.58833794E12, 4.090909090909091], [1.58833782E12, 5.444444444444444], [1.5883377E12, 6.600000000000001], [1.58833788E12, 5.9898989898989905]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/", "isController": false}, {"data": [[1.58833794E12, 4.5], [1.58833782E12, 5.232558139534883], [1.58833788E12, 4.938461538461539]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout", "isController": false}, {"data": [[1.58833794E12, 26.666666666666668], [1.58833788E12, 23.31111111111111]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5", "isController": false}, {"data": [[1.58833794E12, 35.666666666666664], [1.58833788E12, 31.86666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6", "isController": false}, {"data": [[1.58833782E12, 1.1323529411764712], [1.58833788E12, 0.9695121951219515]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0", "isController": false}, {"data": [[1.58833794E12, 37.333333333333336], [1.58833788E12, 31.577777777777772]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3", "isController": false}, {"data": [[1.58833794E12, 31.666666666666668], [1.58833788E12, 34.48888888888887]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4", "isController": false}, {"data": [[1.58833782E12, 0.044444444444444474], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1", "isController": false}, {"data": [[1.58833782E12, 0.044444444444444474], [1.58833788E12, 0.03636363636363638]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1", "isController": false}, {"data": [[1.58833794E12, 42.0], [1.58833788E12, 28.288888888888884]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2", "isController": false}, {"data": [[1.58833782E12, 19.74074074074074], [1.58833788E12, 21.309090909090905]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4", "isController": false}, {"data": [[1.58833782E12, 15.992592592592592], [1.58833788E12, 17.575757575757578]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0", "isController": false}, {"data": [[1.58833794E12, 18.4], [1.58833776E12, 31.13235294117648], [1.5883377E12, 20.0989010989011], [1.58833788E12, 17.571428571428573]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5", "isController": false}, {"data": [[1.58833794E12, 20.0], [1.58833776E12, 30.147058823529406], [1.5883377E12, 20.30769230769231], [1.58833788E12, 18.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4", "isController": false}, {"data": [[1.58833794E12, 18.4], [1.58833776E12, 32.83823529411766], [1.5883377E12, 19.972527472527464], [1.58833788E12, 18.571428571428573]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7", "isController": false}, {"data": [[1.58833794E12, 15.0], [1.58833776E12, 22.249999999999993], [1.5883377E12, 14.450549450549453], [1.58833788E12, 24.571428571428573]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1", "isController": false}, {"data": [[1.58833782E12, 3.8666666666666667], [1.58833788E12, 3.992592592592592]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet", "isController": false}, {"data": [[1.58833794E12, 3.0], [1.58833776E12, 0.0], [1.5883377E12, 0.3351648351648355], [1.58833788E12, 0.8571428571428572]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0", "isController": false}, {"data": [[1.58833794E12, 17.2], [1.58833776E12, 28.05882352941177], [1.5883377E12, 16.10989010989012], [1.58833788E12, 10.285714285714286]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833776E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2", "isController": false}, {"data": [[1.58833794E12, 6.333333333333334], [1.58833788E12, 6.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message", "isController": false}, {"data": [[1.58833794E12, 2.571428571428571], [1.58833788E12, 3.586206896551725]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.5883377E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home", "isController": false}, {"data": [[1.58833782E12, 31.0], [1.58833788E12, 37.470588235294116]], "isOverall": false, "label": "uczen", "isController": true}, {"data": [[1.58833794E12, 4.545454545454546], [1.58833788E12, 3.0476190476190474]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1", "isController": false}, {"data": [[1.58833782E12, 52.02380952380954], [1.58833788E12, 52.25000000000001]], "isOverall": false, "label": "teacher", "isController": true}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2", "isController": false}, {"data": [[1.58833794E12, 4.545454545454546], [1.58833788E12, 3.0476190476190474]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist", "isController": false}, {"data": [[1.58833794E12, 22.727272727272727], [1.58833788E12, 16.761904761904763]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7", "isController": false}, {"data": [[1.58833794E12, 23.818181818181817], [1.58833788E12, 12.428571428571427]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3", "isController": false}, {"data": [[1.58833794E12, 23.27272727272727], [1.58833788E12, 16.428571428571427]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4", "isController": false}, {"data": [[1.58833794E12, 22.909090909090914], [1.58833788E12, 16.428571428571427]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5", "isController": false}, {"data": [[1.58833794E12, 18.454545454545457], [1.58833788E12, 12.666666666666668]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6", "isController": false}, {"data": [[1.58833776E12, 1.902857142857143], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.13953488372093023], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2", "isController": false}, {"data": [[1.58833794E12, 27.714285714285715], [1.58833788E12, 31.724137931034484]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1", "isController": false}, {"data": [[1.58833794E12, 12.5], [1.58833782E12, 21.441860465116285], [1.58833788E12, 21.984615384615385]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3", "isController": false}, {"data": [[1.58833794E12, 21.5], [1.58833788E12, 23.24137931034483]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6", "isController": false}, {"data": [[1.58833794E12, 23.833333333333336], [1.58833782E12, 26.41860465116279], [1.58833788E12, 26.338461538461548]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4", "isController": false}, {"data": [[1.58833794E12, 29.07142857142857], [1.58833788E12, 33.44827586206897]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7", "isController": false}, {"data": [[1.58833794E12, 22.333333333333336], [1.58833782E12, 25.302325581395348], [1.58833788E12, 26.353846153846163]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5", "isController": false}, {"data": [[1.58833776E12, 30.554285714285715], [1.58833782E12, 32.480000000000004]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1", "isController": false}, {"data": [[1.58833776E12, 30.674285714285702], [1.58833782E12, 30.879999999999992]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2", "isController": false}, {"data": [[1.58833776E12, 0.0], [1.58833782E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2", "isController": false}, {"data": [[1.58833794E12, 4.5], [1.58833782E12, 5.232558139534883], [1.58833788E12, 4.938461538461539]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0", "isController": false}, {"data": [[1.58833794E12, 25.64285714285714], [1.58833788E12, 32.0344827586207]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3", "isController": false}, {"data": [[1.58833776E12, 23.302857142857135], [1.58833782E12, 26.360000000000003]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833782E12, 0.0], [1.58833788E12, 0.09230769230769234]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1", "isController": false}, {"data": [[1.58833794E12, 28.071428571428573], [1.58833788E12, 31.82758620689655]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4", "isController": false}, {"data": [[1.58833794E12, 2.571428571428571], [1.58833788E12, 3.586206896551725]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0", "isController": false}, {"data": [[1.58833794E12, 0.0], [1.58833788E12, 0.0]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error", "isController": false}, {"data": [[1.58833776E12, 22.182857142857152], [1.58833782E12, 23.680000000000003]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6", "isController": false}, {"data": [[1.58833776E12, 31.88000000000001], [1.58833782E12, 32.24]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7", "isController": false}, {"data": [[1.58833794E12, 15.166666666666666], [1.58833782E12, 18.790697674418603], [1.58833788E12, 19.15384615384616]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6", "isController": false}, {"data": [[1.58833794E12, 23.5], [1.58833782E12, 26.534883720930235], [1.58833788E12, 27.892307692307693]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58833794E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 6.0, "minX": 1.5883377E12, "maxY": 3071.0, "series": [{"data": [[1.58833794E12, 462.0], [1.58833776E12, 3071.0], [1.58833782E12, 818.0], [1.5883377E12, 2902.0], [1.58833788E12, 810.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.58833794E12, 6.0], [1.58833776E12, 6.0], [1.58833782E12, 6.0], [1.5883377E12, 6.0], [1.58833788E12, 6.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.58833794E12, 77.0], [1.58833776E12, 74.0], [1.58833782E12, 70.0], [1.5883377E12, 75.0], [1.58833788E12, 72.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.58833794E12, 347.0], [1.58833776E12, 246.300000000002], [1.58833782E12, 209.73999999999978], [1.5883377E12, 388.1100000000001], [1.58833788E12, 258.84999999999945]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.58833794E12, 112.0], [1.58833776E12, 102.0], [1.58833782E12, 90.0], [1.5883377E12, 101.0], [1.58833788E12, 94.75]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58833794E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 9.0, "minX": 2.0, "maxY": 52.0, "series": [{"data": [[2.0, 10.5], [9.0, 34.0], [10.0, 37.0], [13.0, 36.0], [17.0, 52.0], [18.0, 36.0], [20.0, 36.5], [21.0, 36.0], [24.0, 37.0], [25.0, 38.5], [27.0, 38.0], [28.0, 37.0], [29.0, 38.0], [30.0, 38.0], [31.0, 36.0], [32.0, 35.5], [34.0, 41.0], [37.0, 12.5], [36.0, 33.0], [39.0, 38.0], [41.0, 35.5], [42.0, 28.0], [43.0, 28.0], [45.0, 36.0], [44.0, 33.0], [47.0, 35.0], [49.0, 38.0], [48.0, 34.0], [51.0, 14.5], [50.0, 35.0], [52.0, 36.0], [53.0, 34.0], [54.0, 36.0], [55.0, 37.0], [57.0, 36.0], [56.0, 37.0], [58.0, 34.0], [59.0, 10.5], [60.0, 36.0], [61.0, 39.0], [62.0, 41.0], [66.0, 38.5], [67.0, 37.0], [65.0, 33.0], [64.0, 35.0], [68.0, 37.5], [70.0, 37.0], [72.0, 36.0], [73.0, 36.0], [74.0, 39.0], [75.0, 36.0], [78.0, 37.0], [76.0, 36.0], [79.0, 32.0], [83.0, 34.0], [82.0, 39.0], [81.0, 38.5], [86.0, 16.0], [84.0, 36.5], [87.0, 37.0], [85.0, 37.0], [89.0, 34.5], [90.0, 29.0], [91.0, 39.0], [94.0, 38.0], [92.0, 31.5], [95.0, 36.0], [97.0, 30.5], [98.0, 40.0], [99.0, 27.0], [100.0, 37.0], [102.0, 36.0], [101.0, 35.0], [107.0, 17.0], [104.0, 36.0], [106.0, 37.0], [110.0, 37.0], [108.0, 36.0], [112.0, 37.0], [118.0, 33.0], [123.0, 34.0], [120.0, 38.0], [121.0, 38.0], [124.0, 33.0], [125.0, 34.0], [127.0, 13.0], [126.0, 32.0], [128.0, 36.0], [129.0, 34.0], [133.0, 16.0], [141.0, 27.0], [142.0, 29.0], [137.0, 36.0], [143.0, 16.0], [140.0, 37.5], [139.0, 31.0], [151.0, 17.0], [145.0, 34.0], [146.0, 36.0], [159.0, 34.0], [152.0, 36.0], [166.0, 27.5], [163.0, 36.0], [167.0, 21.0], [169.0, 13.0], [172.0, 32.0], [182.0, 26.0], [179.0, 26.0], [206.0, 34.0], [225.0, 27.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 15.5], [10.0, 15.0], [13.0, 15.5], [17.0, 15.0], [20.0, 15.0], [21.0, 15.0], [24.0, 14.0], [25.0, 16.0], [28.0, 15.0], [29.0, 16.5], [30.0, 15.0], [31.0, 16.0], [32.0, 16.0], [34.0, 15.5], [37.0, 12.0], [36.0, 15.0], [39.0, 16.0], [41.0, 15.0], [42.0, 15.0], [43.0, 15.0], [45.0, 15.0], [44.0, 15.0], [47.0, 16.0], [49.0, 15.0], [48.0, 15.0], [51.0, 15.0], [50.0, 16.0], [52.0, 15.5], [53.0, 15.0], [54.0, 15.0], [55.0, 15.0], [57.0, 15.0], [56.0, 15.5], [58.0, 15.0], [59.0, 15.0], [60.0, 15.0], [61.0, 16.0], [62.0, 15.0], [66.0, 15.5], [67.0, 15.0], [65.0, 15.0], [64.0, 14.0], [68.0, 15.0], [70.0, 15.0], [72.0, 15.0], [73.0, 15.0], [74.0, 15.0], [75.0, 14.0], [78.0, 15.0], [76.0, 15.0], [79.0, 15.0], [83.0, 15.0], [82.0, 15.0], [81.0, 14.0], [86.0, 15.0], [84.0, 15.0], [87.0, 15.0], [85.0, 14.0], [89.0, 15.0], [90.0, 14.5], [91.0, 15.0], [94.0, 15.0], [92.0, 15.0], [95.0, 15.0], [97.0, 14.0], [98.0, 15.0], [99.0, 12.0], [100.0, 14.0], [102.0, 15.5], [101.0, 15.0], [107.0, 17.0], [104.0, 14.0], [106.0, 15.0], [110.0, 15.0], [108.0, 15.0], [112.0, 16.0], [118.0, 14.0], [123.0, 15.0], [120.0, 14.0], [121.0, 15.0], [124.0, 15.0], [125.0, 15.0], [127.0, 9.0], [126.0, 14.0], [128.0, 16.0], [129.0, 15.0], [133.0, 15.0], [141.0, 15.0], [142.0, 15.0], [137.0, 15.0], [143.0, 14.0], [140.0, 15.0], [139.0, 15.0], [151.0, 16.0], [145.0, 14.0], [146.0, 14.0], [159.0, 15.0], [152.0, 14.5], [166.0, 14.5], [163.0, 15.0], [167.0, 14.0], [169.0, 15.0], [172.0, 15.0], [182.0, 14.0], [179.0, 9.0], [206.0, 15.0], [225.0, 15.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 225.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 17.0, "series": [{"data": [[2.0, 10.5], [9.0, 0.0], [10.0, 0.0], [13.0, 3.0], [17.0, 0.0], [18.0, 0.0], [20.0, 0.0], [21.0, 0.0], [24.0, 7.0], [25.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0], [31.0, 0.0], [32.0, 0.0], [34.0, 0.0], [37.0, 0.0], [36.0, 0.0], [39.0, 6.0], [41.0, 0.0], [42.0, 0.0], [43.0, 0.0], [45.0, 0.0], [44.0, 0.0], [47.0, 0.0], [49.0, 0.0], [48.0, 0.0], [51.0, 0.0], [50.0, 0.0], [52.0, 0.0], [53.0, 0.0], [54.0, 0.0], [55.0, 0.0], [57.0, 0.0], [56.0, 0.0], [58.0, 0.0], [59.0, 0.0], [60.0, 0.0], [61.0, 0.0], [62.0, 0.0], [66.0, 0.0], [67.0, 0.0], [65.0, 0.0], [64.0, 0.0], [68.0, 0.0], [70.0, 0.0], [72.0, 0.0], [73.0, 0.0], [74.0, 0.0], [75.0, 0.0], [78.0, 6.0], [76.0, 0.0], [79.0, 0.0], [83.0, 0.0], [82.0, 0.0], [81.0, 0.0], [86.0, 0.0], [84.0, 0.0], [87.0, 0.0], [85.0, 0.0], [89.0, 0.0], [90.0, 0.0], [91.0, 0.0], [94.0, 0.0], [92.0, 0.0], [95.0, 0.0], [97.0, 0.0], [98.0, 0.0], [99.0, 0.0], [100.0, 0.0], [102.0, 0.0], [101.0, 0.0], [107.0, 7.0], [104.0, 0.0], [106.0, 0.0], [110.0, 0.0], [108.0, 0.0], [112.0, 0.0], [118.0, 0.0], [123.0, 3.0], [120.0, 0.0], [121.0, 0.0], [124.0, 7.0], [125.0, 0.0], [127.0, 0.0], [126.0, 0.0], [128.0, 7.0], [129.0, 0.0], [133.0, 0.0], [141.0, 0.0], [142.0, 0.0], [137.0, 0.0], [143.0, 0.0], [140.0, 6.0], [139.0, 0.0], [151.0, 7.0], [145.0, 0.0], [146.0, 0.0], [159.0, 0.0], [152.0, 0.0], [166.0, 0.0], [163.0, 0.0], [167.0, 0.0], [169.0, 7.0], [172.0, 0.0], [182.0, 0.0], [179.0, 0.0], [206.0, 0.0], [225.0, 7.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 15.5], [10.0, 15.0], [13.0, 15.0], [17.0, 15.0], [20.0, 15.0], [21.0, 14.0], [24.0, 14.0], [25.0, 16.0], [28.0, 15.0], [29.0, 16.5], [30.0, 15.0], [31.0, 16.0], [32.0, 16.0], [34.0, 15.5], [37.0, 12.0], [36.0, 15.0], [39.0, 15.5], [41.0, 15.0], [42.0, 15.0], [43.0, 15.0], [45.0, 15.0], [44.0, 15.0], [47.0, 15.0], [49.0, 15.0], [48.0, 15.0], [51.0, 15.0], [50.0, 16.0], [52.0, 15.5], [53.0, 15.0], [54.0, 15.0], [55.0, 15.0], [57.0, 15.0], [56.0, 15.0], [58.0, 15.0], [59.0, 15.0], [60.0, 15.0], [61.0, 15.5], [62.0, 15.0], [66.0, 15.5], [67.0, 15.0], [65.0, 15.0], [64.0, 14.0], [68.0, 15.0], [70.0, 15.0], [72.0, 15.0], [73.0, 15.0], [74.0, 15.0], [75.0, 14.0], [78.0, 15.0], [76.0, 15.0], [79.0, 15.0], [83.0, 15.0], [82.0, 15.0], [81.0, 14.0], [86.0, 15.0], [84.0, 15.0], [87.0, 15.0], [85.0, 14.0], [89.0, 15.0], [90.0, 14.5], [91.0, 15.0], [94.0, 15.0], [92.0, 15.0], [95.0, 15.0], [97.0, 14.0], [98.0, 15.0], [99.0, 12.0], [100.0, 14.0], [102.0, 15.0], [101.0, 15.0], [107.0, 17.0], [104.0, 14.0], [106.0, 15.0], [110.0, 15.0], [108.0, 14.5], [112.0, 15.0], [118.0, 14.0], [123.0, 15.0], [120.0, 14.0], [121.0, 15.0], [124.0, 15.0], [125.0, 14.0], [127.0, 9.0], [126.0, 14.0], [128.0, 16.0], [129.0, 15.0], [133.0, 15.0], [141.0, 15.0], [142.0, 15.0], [137.0, 15.0], [143.0, 14.0], [140.0, 14.5], [139.0, 15.0], [151.0, 15.0], [145.0, 14.0], [146.0, 14.0], [159.0, 15.0], [152.0, 14.0], [166.0, 14.5], [163.0, 15.0], [167.0, 14.0], [169.0, 15.0], [172.0, 15.0], [182.0, 14.0], [179.0, 9.0], [206.0, 15.0], [225.0, 15.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 225.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 9.033333333333333, "minX": 1.5883377E12, "maxY": 95.05, "series": [{"data": [[1.58833794E12, 9.033333333333333], [1.58833776E12, 47.61666666666667], [1.58833782E12, 75.03333333333333], [1.5883377E12, 37.85], [1.58833788E12, 95.05]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58833794E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.3, "minX": 1.5883377E12, "maxY": 49.333333333333336, "series": [{"data": [[1.58833794E12, 3.316666666666667], [1.58833776E12, 14.7], [1.58833782E12, 23.0], [1.5883377E12, 15.766666666666667], [1.58833788E12, 29.966666666666665]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.58833794E12, 0.8666666666666667], [1.58833776E12, 4.9], [1.58833782E12, 7.683333333333334], [1.5883377E12, 3.8666666666666667], [1.58833788E12, 9.1]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.58833794E12, 0.3], [1.58833776E12, 3.5166666666666666], [1.58833782E12, 5.983333333333333], [1.5883377E12, 3.05], [1.58833788E12, 6.65]], "isOverall": false, "label": "403", "isController": false}, {"data": [[1.58833794E12, 4.583333333333333], [1.58833776E12, 24.5], [1.58833782E12, 38.333333333333336], [1.5883377E12, 15.166666666666666], [1.58833788E12, 49.333333333333336]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58833794E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.5883377E12, "maxY": 3.25, "series": [{"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-1-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-7-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-7-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-2-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-4-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-0-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-0-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-4-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833782E12, 0.6], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 1.65]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/-failure", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-6-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-3-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-6-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-2-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-3-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-4-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-6-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-3-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-7-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-5-success", "isController": false}, {"data": [[1.58833794E12, 0.13333333333333333], [1.58833788E12, 0.4666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-3-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-3-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-6-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-3-success", "isController": false}, {"data": [[1.58833782E12, 2.2666666666666666], [1.58833788E12, 2.7333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-0-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-0-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-5-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-1-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-4-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-6-success", "isController": false}, {"data": [[1.5883377E12, 0.8333333333333334]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-1-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-7-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-6-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-0-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-5-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-1-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-5-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-5-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-5-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-1-success", "isController": false}, {"data": [[1.58833776E12, 2.0833333333333335], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-failure", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-4-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-2-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-3-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-7-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-0-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-2-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-2-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-0-success", "isController": false}, {"data": [[1.58833776E12, 0.31666666666666665], [1.58833782E12, 2.95], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-failure", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-2-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-7-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-4-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-0-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-6-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-0-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-4-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-1-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-7-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-5-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-2-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-5-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-4-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-2-success", "isController": false}, {"data": [[1.58833782E12, 0.25], [1.58833788E12, 2.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet-failure", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-6-success", "isController": false}, {"data": [[1.58833782E12, 1.7666666666666666], [1.58833788E12, 2.4]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass-failure", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-6-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-0-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-4-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-1-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-6-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-1-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-3-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-1-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-1-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-6-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-4-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-1-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-5-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-5-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-2-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-1-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-3-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833788E12, 0.2]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message-failure", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-5-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-6-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-5-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-2-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-7-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-1-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-3-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-3-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-7-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-7-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-2-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-7-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-success", "isController": false}, {"data": [[1.58833782E12, 0.016666666666666666], [1.58833788E12, 0.2833333333333333]], "isOverall": false, "label": "uczen-failure", "isController": true}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-7-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-0-success", "isController": false}, {"data": [[1.58833782E12, 2.25], [1.58833788E12, 2.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/showclass\/60-4-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-0-success", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-1-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-2-success", "isController": false}, {"data": [[1.58833794E12, 0.05], [1.58833788E12, 0.75]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/?error-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-4-success", "isController": false}, {"data": [[1.58833794E12, 0.13333333333333333], [1.58833788E12, 0.4666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-4-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-5-success", "isController": false}, {"data": [[1.58833794E12, 0.11666666666666667], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/timesheet-0-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-2-success", "isController": false}, {"data": [[1.58833776E12, 2.9166666666666665], [1.58833782E12, 0.4166666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addteacher-4-success", "isController": false}, {"data": [[1.58833794E12, 0.23333333333333334], [1.58833788E12, 0.48333333333333334]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/message\/64-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.5883377E12, 0.8333333333333334], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/home-3-success", "isController": false}, {"data": [[1.58833782E12, 0.7], [1.58833788E12, 0.13333333333333333]], "isOverall": false, "label": "teacher-failure", "isController": true}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-success", "isController": false}, {"data": [[1.58833794E12, 0.016666666666666666], [1.58833776E12, 1.1166666666666667], [1.5883377E12, 2.216666666666667], [1.58833788E12, 0.08333333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-failure", "isController": false}, {"data": [[1.58833794E12, 0.18333333333333332], [1.58833788E12, 0.35]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/teacherlist-5-success", "isController": false}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833788E12, 0.6]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/pupil\/setsession-6-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833788E12, 0.13333333333333333]], "isOverall": false, "label": "reset-success", "isController": true}, {"data": [[1.58833794E12, 0.08333333333333333], [1.58833776E12, 1.1333333333333333], [1.5883377E12, 3.033333333333333], [1.58833788E12, 0.11666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addclass-2-success", "isController": false}, {"data": [[1.58833794E12, 0.06666666666666667], [1.58833788E12, 0.05]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/reset-success", "isController": false}, {"data": [[1.58833794E12, 0.1], [1.58833782E12, 0.7166666666666667], [1.58833788E12, 1.0833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/logout-3-success", "isController": false}, {"data": [[1.58833776E12, 0.85], [1.58833782E12, 3.25], [1.58833788E12, 0.06666666666666667]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/director\/addpupil-6-success", "isController": false}, {"data": [[1.58833782E12, 0.5833333333333334], [1.58833788E12, 0.25]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/setsession-0-success", "isController": false}, {"data": [[1.58833782E12, 0.45], [1.58833788E12, 2.8833333333333333]], "isOverall": false, "label": "http:\/\/80.211.245.217:8085\/teacher\/timesheet\/64\/60-3-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58833794E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.3, "minX": 1.5883377E12, "maxY": 88.53333333333333, "series": [{"data": [[1.58833794E12, 8.866666666666667], [1.58833776E12, 44.1], [1.58833782E12, 69.01666666666667], [1.5883377E12, 34.8], [1.58833788E12, 88.53333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.58833794E12, 0.3], [1.58833776E12, 3.5166666666666666], [1.58833782E12, 6.7], [1.5883377E12, 3.8833333333333333], [1.58833788E12, 7.066666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58833794E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
