import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ReLineChart(props) {

    return (
        <div className='container-fluid'>
            <div className='row p-4 text-center'>
            <p className="fs-5">{props.description}</p>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                width={500}
                height={300}
                data={props.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={props.XAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={props.lineName1} stroke={props.lineColor} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}