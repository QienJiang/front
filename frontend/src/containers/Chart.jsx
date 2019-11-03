import React from "react";
import axios from "axios";
import { async } from "q";
var Chart = require("chart.js");

class StatusChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  reload = async event => {
    const node = this.node;

    let myChart = new Chart(node, {
      type: "bar",
      data: {
        labels: ["Refuse", "Approve", "Submit"],
        datasets: [
          {
            label: "# of Likes",
            data: [0, 0, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ]
          }
        ]
      }
    });
    axios
      .post("http://localhost:8080/loan/chartstatus")
      .then(res => {
        let temp = res.data;

        let myChart = new Chart(node, {
          type: "bar",
          data: {
            labels: ["Refuse", "Approve", "Submit"],
            datasets: [
              {
                label: "Status",
                data: res.data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)"
                ]
              }
            ]
          }
        });

        console.log("status", res.data);
      })

      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.reload();
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default StatusChart;
