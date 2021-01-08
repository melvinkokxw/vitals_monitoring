fetch("http://127.0.0.1:5000/api?patient_id=1")
    .then(response => response.json())
    .then(data => {
        var trace1 = {
            x: data["timestamp"],
            y: data["hr"],
            mode: "scatter",
            line: {
                color: "#80CAF6",
            }
        }

        var trace2 = {
            x: data["timestamp"],
            y: data["temp"],
            xaxis: "x2",
            yaxis: "y2",
            mode: "scatter",
            line: { color: "#DF56F1" }
        };

        var layout = {
            xaxis: {
                domain: [0, 1],
                showticklabels: false
            },
            yaxis: { domain: [0.6, 1] },
            xaxis2: {
                anchor: "y2",
                domain: [0, 1]
            },
            yaxis2: {
                anchor: "x2",
                domain: [0, 0.4]
            },
        }

        var data_update = [trace1, trace2];

        Plotly.newPlot("chart", data_update, layout);

        if (++cnt === 100) clearInterval(interval);
    });



var cnt = 0;

var interval = setInterval(function () {

    fetch("http://127.0.0.1:5000/api")
        .then(response => response.json())
        .then(data => {
            var trace1 = {
                x: data["timestamp"],
                y: data["hr"],
                mode: "scatter",
                line: {
                    color: "#80CAF6",
                }
            }

            var trace2 = {
                x: data["timestamp"],
                y: data["temp"],
                xaxis: "x2",
                yaxis: "y2",
                mode: "scatter",
                line: { color: "#DF56F1" }
            };

            var data_update = [trace1, trace2];

            Plotly.update("chart", data_update)

            if (++cnt === 100) clearInterval(interval);
        });
}, 1000); 