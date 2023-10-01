export { };
declare global {
	type MazeSize = {
		rows: number;
		columns: number;
	};
	type StartFinishNode = {
		start: MazeNode;
		finish: MazeNode;
	};
	type MazeNode = {
		row: number;
		col: number;
		isStart?: boolean;
		isFinish?: boolean;
		isVisited?: boolean;
		isWall?: boolean;
		previousNode?: MazeNode | null | undefined;
	};
}
