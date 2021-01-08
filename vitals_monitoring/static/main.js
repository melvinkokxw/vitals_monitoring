var patient_id
var select_element = document.getElementById("select-element")
select_element.addEventListener("change", () => {
    patient_id = select_element.value
});

fetch("http://127.0.0.1:5000/patientlist")
    .then(response => response.json())
    .then(data => {
        var select_element = document.getElementById("select-element")
        data.forEach(function (item, index) {
            var option_element = document.createElement("option")
            option_element.setAttribute("value", parseInt(item))
            option_element.textContent = item
            select_element.appendChild(option_element)
        });
    })
    .then(() => {
        patient_id = select_element.value
    })

fetch("http://127.0.0.1:5000/api?patient_id=" + String(patient_id))
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
            yaxis: {
                domain: [0.6, 1],
                title: {
                    text: "HR",
                }
            },
            xaxis2: {
                anchor: "y2",
                domain: [0, 1]
            },
            yaxis2: {
                anchor: "x2",
                domain: [0, 0.4],
                title: {
                    text: "Temp",
                }
            },
            showlegend: false
        }

        var data_update = [trace1, trace2];

        Plotly.newPlot("chart", data_update, layout);

        if (++cnt === 100) clearInterval(interval);
    });



var cnt = 0;

var interval = setInterval(function () {

    fetch("http://127.0.0.1:5000/api?patient_id=" + String(patient_id))
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
                yaxis: {
                    domain: [0.6, 1],
                    title: {
                        text: "HR",
                    }
                },
                xaxis2: {
                    anchor: "y2",
                    domain: [0, 1]
                },
                yaxis2: {
                    anchor: "x2",
                    domain: [0, 0.4],
                    title: {
                        text: "Temp",
                    }
                },
                showlegend: false
            }

            var data_update = [trace1, trace2];

            Plotly.newPlot("chart", data_update, layout);

            if (++cnt === 100) clearInterval(interval);
        });
}, 1000); 