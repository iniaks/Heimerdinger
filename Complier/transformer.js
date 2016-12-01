function transformer(AST) {
	// 我们将要在旧AST的基础上创建一个新的AST
	var newAST = {
		type: 'Program',
		body: []
	}

	AST._context = newAST.body

	traverser(ast, {
		// 数字节点的父节点一定是方法节点，因此我们要将它们作为父节点的参数插入
		NumberLiteral: function (node, parent) {
			parent._reference.push({
				type: 'NumberLiteral',
				value: node.value
			})
		},
		CallExpression: function (node, parent) {
			var expression = {
				type: 'CallExpression',
				callee: {
					type: 'Identifier',
					name: node.name
				},
				arguments: []
			}

			// 与根节点的_context类似，我们为表达式节点建立参数的映射方便操作

			node._reference = expression.arguments

			// 对于父节点来说，如果执行函数节点的父节点不是函数节点，那么它一定就是顶层的根节点
			// 这时候我们就需要将它们插入根节点的_context中，否则就继续作为arguments插入父节点的_reference中
			// 这里源代码是将两种不同节点的映射都映射为_context，来省去判断，这里我们为了区分两者，故而将根节点以外的参数部分映射为_reference

			if (parent.type !== 'CallExpression') {
				expression = {
					type: 'ExpressionStatement',
					expression: expression
				}
				parent._context.push(expression)
			} else {
				parent._reference.push(expression)
			}			
		}
	})

	return newAST
}