import React, { useEffect, useState } from "react";
import NavBar from "../Navigation/NavBar";
// Maze Helpers
import {
	clearGrid,
	clearPath,
	getInitialGrid,
	getNewGridWithMaze,
	getNewGridWithWalls,
} from "./util/MazeHelpers/MazeFunctionalities";
import {
	calculateMazeSize,
	getStartFinishNode,
} from "./util/MazeHelpers/MazeLayout";
import {
	breadthFirstSearch,
	getNodesInShortestPathOrderBFS,
} from "./util/PathFinderAlgorithms/BreadthFirstSearch";

// Maze Algorithms
import Node from "../Node/Node";
import { randomMaze } from "./util/MazeAlgorithms/RandomMaze";

const mazeSize = calculateMazeSize(window.innerWidth, window.innerHeight);
const startFinishNode = getStartFinishNode(mazeSize);
const AlgorithmVisualizer = () => {
	const [visualized, setVisualized] = useState(false);
	const [loading, setLoading] = useState(false);
	const [mouseIsPressed, setMouseIsPressed] = useState(false);
	const [clickType, setClickType] = useState("wall");
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [mazeSpeed, setMazeSpeed] = useState(10);
	// Handle Maze Creation
	const [grid, setGrid] = useState(getInitialGrid(mazeSize, startFinishNode));
	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		});
	}, [width, height]);
	// Adding Custom Walls Handler
	const handleMouseDown = (node: MazeNode) => {
		if (loading) return;
		if (clickType === "start") {
			node.isStart = true;
			node.isWall = false;
			grid[startFinishNode.start.row][startFinishNode.start.col] = {
				...startFinishNode.start,
				isStart: false,
			};
			startFinishNode.start = node;
			if (visualized) {
				setGrid(clearPath(grid));
			}
			setClickType("wall");
		} else if (clickType === "goal") {
			node.isFinish = true;
			node.isWall = false;
			grid[startFinishNode.finish.row][startFinishNode.finish.col] = {
				...startFinishNode.finish,
				isFinish: false,
			};
			startFinishNode.finish = node;
			if (visualized) {
				setGrid(clearPath(grid));
			}
			setClickType("wall");
		} else {
			setGrid(getNewGridWithWalls(grid, node));
		}
		setMouseIsPressed(true);
	};
	// Maze Speed
	const adjustMazeSpeed = (speed: number) => {
		if (loading) return;
		setMazeSpeed(speed);
	};
	// Maze Functions
	const clearBoard = () => {
		if (loading) {
			return;
		}
		setGrid(clearGrid(grid, mazeSize, startFinishNode));
		setLoading(false);
	};
	const generateRandomMaze = () => {
		if (loading) {
			return;
		}
		setLoading(true);
		setTimeout(() => {
			const walls = randomMaze(
				clearGrid(grid, mazeSize, startFinishNode),
				startFinishNode
			);
			animateMaze(walls);
		}, mazeSpeed);
	};
	const animateMaze = (walls: number[][]) => {
		for (let i = 0; i <= walls.length; i++) {
			if (i === walls.length) {
				setTimeout(() => {
					setLoading(false);
					setGrid(getNewGridWithMaze(grid, walls));
				}, i * mazeSpeed);
				return;
			}
			let wall = walls[i];
			let node: MazeNode = grid[wall[0]][wall[1]];
			setTimeout(() => {
				const mazeNode = document.getElementById(
					`node-${node.row}-${node.col}`
				);
				if (mazeNode?.className) {
					mazeNode.className =
						"border border-primary node-wall-animated";
				}
			}, i * mazeSpeed);
		}
	};
	const visualizeBFS = () => {
		if (loading) {
			return;
		}
		if (visualized) {
			setGrid(clearPath(grid));
		}
		setLoading(true);
		setTimeout(() => {
			animateAlgorithm(
				breadthFirstSearch(grid, {
					start: grid[startFinishNode.start.row][
						startFinishNode.start.col
					],
					finish: grid[startFinishNode.finish.row][
						startFinishNode.finish.col
					],
				}),
				getNodesInShortestPathOrderBFS(
					grid[startFinishNode.finish.row][startFinishNode.finish.col]
				)
			);
		}, mazeSpeed);
	};
	const animateAlgorithm = (
		visitedNodesInOrder: MazeNode[],
		nodesInShortestPathOrder: MazeNode[]
	) => {
		let newGrid = grid.slice();
		for (let row of newGrid) {
			for (let node of row) {
				let newNode = {
					...node,
					isVisited: false,
				};
				newGrid[node.row][node.col] = newNode;
			}
		}
		setGrid(newGrid);
		for (let i = 1; i <= visitedNodesInOrder.length; i++) {
			let node = visitedNodesInOrder[i];
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					animateShortestPath(nodesInShortestPathOrder);
				}, i * mazeSpeed);
				return;
			}
			setTimeout(() => {
				//visited node
				const mazeNode = document.getElementById(
					`node-${node.row}-${node.col}`
				);
				if (mazeNode?.className) {
					mazeNode.className = "border border-primary node-visited";
				}
			}, i * mazeSpeed);
		}
	};
	const animateShortestPath = (nodesInShortestPathOrder: MazeNode[]) => {
		if (nodesInShortestPathOrder.length === 1) {
			setLoading(false);
			setVisualized(true);
		}
		for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
			let node = nodesInShortestPathOrder[i];
			setTimeout(() => {
				//shortest path node
				const mazeNode = document.getElementById(
					`node-${node.row}-${node.col}`
				);
				if (mazeNode?.className) {
					mazeNode.className =
						"border border-primary node-shortest-path";
				}
			}, i * (3 * mazeSpeed));
			setLoading(false);
			setVisualized(true);
		}
	};

	return (
		<>
			<NavBar
				clearBoard={clearBoard}
				generateRandomMaze={generateRandomMaze}
				visualizeBFS={visualizeBFS}
				setMazeSpeed={adjustMazeSpeed}
				loading={loading}
			/>
			<div className="flex gap-3 m-5 justify-center flex-wrap">
				<button
					className="flex gap-1 items-center disabled:cursor-not-allowed"
					onClick={() => setClickType("start")}
					disabled={loading}
				>
					<div className="border border-primary node-start w-5 h-5" />
					Start
				</button>
				<button
					className="flex gap-1 items-center disabled:cursor-not-allowed"
					onClick={() => setClickType("goal")}
					disabled={loading}
				>
					<div className="border border-primary node-finish w-5 h-5" />
					Goal
				</button>
				<div className="flex gap-1 items-center">
					<div className="border border-primary w-5 h-5" />
					Unvisited Node
				</div>
				<div className="flex gap-1 items-center">
					<div className="border border-primaryAlternate bg-primaryAlternate w-5 h-5" />
					Wall
				</div>
				<div className="flex gap-1 items-center">
					<div className="border border-primary bg-[#1ea5b9bf] w-5 h-5" />
					Visited Node
				</div>
				<div className="flex gap-1 items-center">
					<div className="border border-primary bg-[#ff00ffbf] w-5 h-5" />
					Shortest Path Node
				</div>
			</div>
			<table className="w-100 m-5">
				<tbody>
					{grid.map((row, rowId) => {
						return (
							<tr key={"row_" + rowId}>
								{row.map((node, nodeId) => {
									return (
										<Node
											key={"node_" + nodeId}
											node={node}
											width={width}
											height={height}
											numRows={mazeSize.rows}
											numColumns={mazeSize.columns}
											onMouseDown={(node: MazeNode) =>
												handleMouseDown(node)
											}
											onMouseUp={() =>
												setMouseIsPressed(false)
											}
										/>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default AlgorithmVisualizer;
