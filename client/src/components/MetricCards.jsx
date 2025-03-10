import React, { Fragment } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const MetricCards = (props) => {
  const metrics = [
    { label: 'Total Tickets', value: props.totalTickets, color: 'blue' },
    { label: 'Open Tickets', value: props.openTickets, color: 'yellow' },
    { label: 'Resolved Tickets', value: props.resolvedTickets, color: 'purple' },
  ];

  return (
    <Fragment>
      <div className="metric-cards">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`metric-card metric-${metric.color}`}
          >
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
        <div className="metric-chart">
          <PieChart
              colors={['rgba(245, 159, 11, 0.49)', 'rgba(139, 92, 246, 0.61)']}
              series={[
                {
                  data: [
                    { id: 1, value: props.openTickets, label: 'Open' },
                    { id: 2, value: props.resolvedTickets, label: 'Resolved' },
                  ],
                },
              ]}
              width={290}
              height={150}
            />
          </div>
        </div>
    </Fragment>
  );
}

export default MetricCards;
