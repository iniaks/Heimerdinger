function traverser(tree, visitor) {

	// 遍历array, 并对数组内存储的节点使用遍历节点方法
	function traverseArray(array, parent) {
		array.forEach(function(child) {
			traverseNode(child, parent)
		})
	}

	// 遍历节点的方法
	function traverseNode(node, parent) {

	}
}