export const randomMaze = (
	grid: Array<Array<MazeNode>>,
	startFinishNode: StartFinishNode
) => {
	let walls = [];
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			if (
				(row === startFinishNode.start.row &&
					col === startFinishNode.start.col) ||
				(row === startFinishNode.finish.row &&
					col === startFinishNode.finish.col)
			)
				continue;
			if (Math.random() < 0.33) {
				walls.push([row, col]);
			}
		}
	}
	walls.sort(() => Math.random() - 0.5);
	return walls;
};
