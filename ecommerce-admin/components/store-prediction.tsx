"use client";

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getGraphRevenue } from '@/actions/get-graph-revenue';
import React, { useState, useMemo } from 'react'
import {
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";
import { JsonArray } from '@prisma/client/runtime/library';

interface StorePredictionProps {
    storeId: string;
    revenueInfo: Array<any>;
}

const StorePrediction: React.FC<StorePredictionProps> = ({ storeId, revenueInfo }) => {
    const [isPredictions, setIsPredictions] = useState(false);

    const monthToIndex: { [key: string]: number } = {
        'Jan': 0,
        'Feb': 1,
        'Mar': 2,
        'Apr': 3,
        'May': 4,
        'Jun': 5,
        'Jul': 6,
        'Aug': 7,
        'Sep': 8,
        'Oct': 9,
        'Nov': 10,
        'Dec': 11
    };

    let kpiData: Array<[number, number]> = [];

    revenueInfo.map(item => {
        kpiData.push([monthToIndex[item.name], item.total]);
    });

    const formattedData = useMemo(() => {
        if (!kpiData) return [];

        const regressionLine = regression.linear(kpiData);

        return revenueInfo.map(({ name, total }, i: number) => {
            return {
                name: name,
                "Actual Revenue": total,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1],
            };
        });
    }, [kpiData]);


    return (
        <div className="w-full h-full p-4">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Revenues and Predictions" description="Charted revenue and predicted revenue." />
                <Button
                    onClick={() => setIsPredictions(!isPredictions)}
                >Show predicted revenue for next year</Button>
                <Separator />
                <ResponsiveContainer width="100%" height={800}>
                    <LineChart
                        data={formattedData}
                        margin={{
                            top: 20,
                            right: 75,
                            left: 20,
                            bottom: 80,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#ffffff"
                        />
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
                            <Label value="Month" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis
                            domain={[12000, 26000]}
                            axisLine={{ strokeWidth: "0" }}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `Rs.${v}`}
                        >
                            <Label
                                value="Revenue in Rs."
                                angle={-90}
                                offset={-5}
                                position="insideLeft"
                            />
                        </YAxis>
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Line
                            type="monotone"
                            dataKey="Actual Revenue"
                            stroke="#000000"
                            strokeWidth={0}
                            dot={{ strokeWidth: 5 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Regression Line"
                            stroke="#8884d8"
                            dot={false}
                        />
                        {isPredictions && (
                            <Line
                                strokeDasharray="5 5"
                                dataKey="Predicted Revenue"
                                stroke="#000000"
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div >
    )
}

export default StorePrediction;