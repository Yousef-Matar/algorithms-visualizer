export const calculateMazeSize = (width: number, height: number): MazeSize => {
	let numColumns;
	if (width > 1500) {
		numColumns = Math.floor(width / 25);
	} else if (width > 1250) {
		numColumns = Math.floor(width / 22.5);
	} else if (width > 1000) {
		numColumns = Math.floor(width / 20);
	} else if (width > 750) {
		numColumns = Math.floor(width / 17.5);
	} else if (width > 500) {
		numColumns = Math.floor(width / 15);
	} else if (width > 250) {
		numColumns = Math.floor(width / 12.5);
	} else {
		numColumns = Math.floor(width / 10);
	}
	let cellWidth = Math.floor(width / numColumns);
	let numRows = Math.floor(height / cellWidth);

	return {
		rows: Math.min(numRows, 50),
		columns: Math.min(numColumns, 100),
	};
};
export const getStartFinishNode = (mazeSize: MazeSize): StartFinishNode => {
	let startNodeRow = 0;
	let startNodeCol = 0;
	let finishNodeRow = 0;
	let finishNodeCol = 0;
	while (startNodeRow === finishNodeRow && startNodeCol === finishNodeCol) {
		startNodeRow = Math.floor(Math.random() * (mazeSize.rows - 0) + 0);
		finishNodeRow = Math.floor(Math.random() * (mazeSize.rows - 0) + 0);
		startNodeCol = Math.floor(Math.random() * (mazeSize.columns - 0) + 0);
		finishNodeCol = Math.floor(Math.random() * (mazeSize.columns - 0) + 0);
	}
	return {
		start: { row: startNodeRow, col: startNodeCol },
		finish: { row: finishNodeRow, col: finishNodeCol },
	};
};
