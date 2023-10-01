import React, { useEffect, useState } from "react";
const NavBar = (props: {
	clearBoard: Function;
	generateRandomMaze: Function;
	visualizeBFS: Function;
	setMazeSpeed: Function;
	loading: boolean;
}) => {
	const [algorithm, setAlgorithm] = useState("BFS");
	const [maze, setMaze] = useState("Random");

	useEffect(() => {
		props.generateRandomMaze();
	}, []);
	return (
		<div className="flex gap-3 flex-wrap bg-primaryAlternate p-5 text-primary">
			<select
				className="bg-secondaryAlternate text-sm rounded p-2.5 disabled:cursor-not-allowed"
				defaultValue={algorithm}
				disabled={props.loading}
			>
				<option value="BFS">Breadth First Search</option>
			</select>
			<select
				className="bg-secondaryAlternate text-sm rounded p-2.5 disabled:cursor-not-allowed"
				defaultValue={maze}
				disabled={props.loading}
			>
				<option value="Random">Random Maze</option>
			</select>
			<button
				className="bg-secondaryAlternate shadow-primary hover:shadow-md hover:text-secondary text-white py-2 px-4 rounded disabled:cursor-not-allowed"
				onClick={() => props.generateRandomMaze()}
				disabled={props.loading}
			>
				Regenerate Maze
			</button>
			<button
				className="bg-secondaryAlternate shadow-primary hover:shadow-md hover:text-secondary text-white py-2 px-4 rounded disabled:cursor-not-allowed"
				onClick={() => props.visualizeBFS()}
				disabled={props.loading}
			>
				Visualize
			</button>
			<button
				className="bg-secondaryAlternate shadow-primary hover:shadow-md hover:text-secondary text-white py-2 px-4 rounded disabled:cursor-not-allowed"
				onClick={() => props.clearBoard()}
				disabled={props.loading}
			>
				Clear Board
			</button>
			<select
				className="bg-secondaryAlternate text-sm rounded p-2.5 disabled:cursor-not-allowed"
				defaultValue={10}
				disabled={props.loading}
				onChange={(event) =>
					props.setMazeSpeed(parseInt(event.target.value))
				}
			>
				<option value="10">Fast</option>
				<option value="50">Medium</option>
				<option value="100">Slow</option>
			</select>
		</div>
	);
};

export default NavBar;
