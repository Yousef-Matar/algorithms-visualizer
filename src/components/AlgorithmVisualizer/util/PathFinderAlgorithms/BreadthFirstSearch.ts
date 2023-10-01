export const breadthFirstSearch = (
	initialGrid: Array<Array<MazeNode>>,
	startFinishNode: StartFinishNode
) => {
	let unvisitedNodes = [];
	let visitedNodesInOrder = [];
	unvisitedNodes.push(startFinishNode.start);
	while (unvisitedNodes.length !== 0) {
		let closestNode = unvisitedNodes.shift();
		if (closestNode !== undefined) {
			if (closestNode.isWall) continue;
			if (closestNode === startFinishNode.finish)
				return visitedNodesInOrder;
			visitedNodesInOrder.push(closestNode);
			closestNode.isVisited = true;
			let unvisitedNeighbors = getUnvisitedNeighbors(
				closestNode,
				initialGrid
			);
			for (let unvisitedNeighbor of unvisitedNeighbors) {
				unvisitedNeighbor.previousNode = closestNode;
				if (
					neighborNotInUnvisitedNodes(
						unvisitedNeighbor,
						unvisitedNodes
					)
				) {
					unvisitedNodes.push(unvisitedNeighbor);
				}
			}
		}
	}
	return visitedNodesInOrder;
};
export const getNodesInShortestPathOrderBFS = (finishNode: any) => {
	let nodesInShortestPathOrder = [];
	let currentNode = finishNode;
	while (currentNode !== null && currentNode !== undefined) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}
	return nodesInShortestPathOrder;
};
const getUnvisitedNeighbors = (
	node: MazeNode,
	initialGrid: Array<Array<MazeNode>>
) => {
	let Neighbors = [];
	let { row, col } = node;
	if (row !== 0) Neighbors.push(initialGrid[row - 1][col]);
	if (col !== initialGrid[0].length - 1)
		Neighbors.push(initialGrid[row][col + 1]);
	if (row !== initialGrid.length - 1)
		Neighbors.push(initialGrid[row + 1][col]);
	if (col !== 0) Neighbors.push(initialGrid[row][col - 1]);
	return Neighbors.filter((neighbor) => !neighbor.isVisited);
};

const neighborNotInUnvisitedNodes = (
	neighbor: MazeNode,
	unvisitedNodes: MazeNode[]
) => {
	for (let node of unvisitedNodes) {
		if (node.row === neighbor.row && node.col === neighbor.col) {
			return false;
		}
	}
	return true;
};
