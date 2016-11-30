function transformer(AST) {
	// 我们将要在旧AST的基础上创建一个新的AST
	var newAST = {
		type: 'Program',
		body: []
	}

	AST._context = newAST.body

	traverser(ast, {
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

			node._reference = expression.arguments

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