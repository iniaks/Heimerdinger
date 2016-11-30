function parser(tokens) {
	
	// 记录位置
	var currentIndex = 0

	// 这里因为节点的嵌套关系，我们需要使用递归还不是循环，因此我们创建一个walk方法
	function walk () {
		// 让我们从tokens的第一个节点开始
		var token = tokens[currentIndex]

		// 我们将会把不同类型的token归入不同的代码路径
		if (token.type === 'number') {
			current++

			return {
				type: 'NumberLitral',
				value: token.value
			}
		}

		// '('代表着接下去直到')'之前的token都是该'CallExpression'节点的参数
		if (token.type == 'paren' && token.value === '(') {
			token = tokens[++currentIndex]

			var node = {
				type: 'CallExpression',
				name: token.value,
				params: []
			}

			token = tokens[++currentIndex]

			// 我们开始循环检测直到遇到')'
			while ((token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')) {
				// 我们直接调用walk来获取节点
				node.params.push(walk())
				token = tokens[current]
			}

			current++

			return node
		}

		throw new TypeError(token.type)
	}

	// 有了walk之后，我们要开始利用它来构建语法树了
	var AST = {
		type: 'Program',
		body: []
	}

	while (currentIndex < tokens.length) {
		AST.body.push(walk())
	}

	return AST
}