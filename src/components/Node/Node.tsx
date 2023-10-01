import React, { useEffect, useState } from "react";
import "./node.css";
const Node = (props: {
	node: MazeNode;
	width: number;
	height: number;
	numRows: number;
	numColumns: number;
	onMouseDown: Function;
	onMouseUp: Function;
}) => {
	const [nodeWidth, setNodeWidth] = useState(0);
	const [nodeHeight, setNodeHeight] = useState(0);
	const extraClass = props.node.isStart
		? "border border-primary node-start"
		: props.node.isFinish
		? "border border-primary node-finish"
		: props.node.isWall
		? "border border-primaryAlternate bg-primaryAlternate"
		: props.node.isShortest
		? "border border-primary node-shortest-path"
		: props.node.isVisited
		? "border border-primary node-visited"
		: "border border-primary";
	useEffect(() => {
		setNodeWidth(props.width / props.numColumns);
		if (props.width > 1000) {
			setNodeHeight(Math.floor((props.height - 70) / props.numRows));
		} else if (props.width > 500) {
			setNodeHeight(Math.floor((props.height - 60) / props.numRows));
		} else {
			setNodeHeight(Math.floor((props.height - 50) / props.numRows));
		}
	}, [props.width, props.height]);

	return (
		<td
			id={`node-${props.node.row}-${props.node.col}`}
			className={`${extraClass}`}
			style={{
				width: `${nodeWidth}px`,
				height: `${nodeHeight}px`,
			}}
			onMouseDown={() => props.onMouseDown(props.node)}
			onMouseUp={() => props.onMouseUp()}
		></td>
	);
};

export default Node;
