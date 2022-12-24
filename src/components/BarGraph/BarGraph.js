import React from "react";
import { BarChart, XAxis, Bar, YAxis, Tooltip, ResponsiveContainer } from "recharts";


function BarGraph(props) {
    const {data} = props;



    const maxYAxis = function(){
      let highestMax = 0;
      for (let i = 0; i < data.length; i++) {
        let max =(Math.ceil(data[i].avgSec/60));
        if (max > highestMax) {
          highestMax = max;
        }
      }
      console.log(highestMax);
      let answer = Math.floor(highestMax /60) * 60 + 60;
      console.log(answer)
      return (answer);
    }

    

    const CustomTooltip = ({ active, payload, label }) => {

      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="tooltip-label">{label}</p>
            <p className="tooltip-time">{`Average: ${payload[0].payload.avgHourDisplay}`}</p>
            <p>{`Minimum: ${payload[0].payload.minHourDisplay}`}</p>
            <p>{`Maximum: ${payload[0].payload.maxHourDisplay}`}</p>
          </div>
        );
      }
    
      return null;
    };
    
  return (

      <ResponsiveContainer width='90%' height={400}>
        <BarChart data={data}>
          <Bar dataKey="avgMin" fill="#8884d8" />
          <XAxis dataKey="hour"/>
          <YAxis dataKey="avgMin"  tickCount={(maxYAxis() /60 + 1)} domain={[0, maxYAxis()]} />
          <Tooltip content={<CustomTooltip/>}/>
        </BarChart>
      </ResponsiveContainer>


  );
}

export default BarGraph;
