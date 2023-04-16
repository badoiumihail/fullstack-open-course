import React from "react";

export default function StatisticsLine({ stats, stat }) {
    return (
        <tr>
            <td>{stat}</td>
            <td>{isNaN(stats[stat]) ? "NaN" : stats[stat]}</td>
        </tr>
    );
}
