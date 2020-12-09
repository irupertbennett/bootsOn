import React, { PureComponent } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class DrawGraph extends PureComponent {
  render() {
      var { data, type, bkgColor, color, width, height, interval, varFromState } = this.props
      if(data){      
      if(type === "LINE"){
        return (
          <LineChart width={width} height={height} data={data}>
            <XAxis dataKey="type" interval={interval} angle={0} dx={95} />
            <YAxis dataKey="consumption" />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={bkgColor} />
            <Line type="monotone" dataKey="consumption" stroke={color} yAxisId={0} />
          </LineChart>
        );
      } else if(type === "BAR"){
        return (
            <BarChart width={650} height={250} data={data} key={varFromState}>
            <XAxis dataKey="item" />
            <YAxis dataKey={varFromState} />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={"#f5f5f5"} />
            <Bar dataKey="quantity" fill="#31A3DD" />
        </BarChart>
        );
      } else if(type === "AREA"){
        return (
          <AreaChart width={width} height={height} data={data}>
            <XAxis dataKey="type" interval={interval} angle={0} dx={0} />
            <YAxis dataKey="consumption" />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={bkgColor} />
            <Area type="monotone" dataKey="consumption" fill={color} yAxisId={0} />
          </AreaChart>
        );
      } else if(type === "SCATTER"){
        return (
          <ScatterChart width={width} height={height} data={data}>
            <XAxis dataKey="type" interval={interval} angle={0} dx={95} />
            <YAxis dataKey="consumption" />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={bkgColor} />
            <Scatter type="monotone" dataKey="consumption" fill={color} yAxisId={0} />
          </ScatterChart>
        );
      }
    }
  }
}