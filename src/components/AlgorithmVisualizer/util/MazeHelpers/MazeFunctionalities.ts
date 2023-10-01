export const getInitialGrid = (
	mazeSize: MazeSize,
	startFinishNode: StartFinishNode
): Array<Array<MazeNode>> => {
	let grid = [];
	for (let row = 0; row < mazeSize.rows; row++) {
		let currentRow = [];
		for (let col = 0; col < mazeSize.columns; col++) {
			currentRow.push(
				createNode({ row: row, col: col }, startFinishNode)
			);
		}
		grid.push(currentRow);
	}
	return grid;
};
export const clearGrid = (
	initialGrid: Array<Array<MazeNode>>,
	mazeSize: MazeSize,
	startFinishNode: StartFinishNode
): Array<Array<MazeNode>> => {
	for (let row = 0; row < initialGrid.length; row++) {
		for (let col = 0; col < initialGrid[0].length; col++) {
			if (
				!(
					(row === startFinishNode.start.row &&
						col === startFinishNode.start.col) ||
					(row === startFinishNode.finish.row &&
						col === startFinishNode.finish.col)
				)
			) {
				const mazeNode = document.getElementById(`node-${row}-${col}`);
				if (mazeNode?.className) {
					mazeNode.className = "border border-primary";
				}
			}
		}
	}
	return getInitialGrid(mazeSize, startFinishNode);
};
export const getNewGridWithWalls = (
	initialGrid: Array<Array<MazeNode>>,
	node: MazeNode
): Array<Array<MazeNode>> => {
	let newGrid = initialGrid.slice();
	let newNode = {
		...node,
		isWall: !node.isWall,
	};
	newGrid[node.row][node.col] = newNode;
	return newGrid;
};
export const getNewGridWithMaze = (
	initialGrid: Array<Array<MazeNode>>,
	walls: number[][]
): Array<Array<MazeNode>> => {
	let newGrid = initialGrid.slice();
	for (let wall of walls) {
		let node = initialGrid[wall[0]][wall[1]];
		let newNode = {
			...node,
			isWall: true,
		};
		newGrid[wall[0]][wall[1]] = newNode;
	}
	return newGrid;
};
const createNode = (node: MazeNode, startFinishNode: StartFinishNode) => {
	return {
		row: node.row,
		col: node.col,
		isStart:
			node.row === startFinishNode.start.row &&
			node.col === startFinishNode.start.col,
		isFinish:
			node.row === startFinishNode.finish.row &&
			node.col === startFinishNode.finish.col,
		isVisited: false,
		isShortest: false,
		isWall: false,
		previousNode: null,
	};
};
