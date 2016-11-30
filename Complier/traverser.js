function traverser(tree, visitor) {

	// 遍历array, 并对数组内存储的节点使用遍历节点方法
	function traverseArray(array, parent) {
		array.forEach(function(child) {
			traverseNode(child, parent)
		})
	}

	// 遍历节点的方法
	function traverseNode(node, parent) {

		// 首先查看visitor中是否有处理当前节点类型的方法
		var method = visitor[node.type]

		if (method) {
			method(node, parent)
		}

		switch (node.type) {
			case 'Program':
				traverseArray(node.body, node)
				break
			case 'CallExpression':
				traverseArray(node.params, node)
				break
			case 'NumberLiteral':
				break
			default:
				throw new TypeError(node.type)
		}
	}

	traverseNode(AST, null)
}