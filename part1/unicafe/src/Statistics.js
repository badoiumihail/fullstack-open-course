import React from "react";
import StatisticsLine from "./StatisticsLine";

export default function Statistics({ title, stats }) {
    let feedbackGiven = false;

    for (const stat in stats) {
        if (
            (stat === "good" || stat === "bad" || stat === "neutral") &&
            stats[stat]
        )
            feedbackGiven = true;
    }

    if (!feedbackGiven) {
        return (
            <>
                <h2>{title}</h2>
                <p>No feedback given yet</p>
            </>
        );
    }

    const statsList = [];

    for (const stat in stats) {
        statsList.push(<StatisticsLine key={stat} stat={stat} stats={stats} />);
    }

    return (
        <>
            <h2>{title}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>{statsList}</tbody>
            </table>
        </>
    );
}
