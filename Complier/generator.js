function codeGenerator(node) {
	// 根据不同的节点类型，生成不同的节点代码
	switch (node.type) {
		// 顶节点，意味着我们刚刚接手程序，我们将map程序body中的每个节点，在新的一行输出代码
		case 'Program':
			return node.body.map(codeGenerator).join('\n')
		// 对语句加分号结尾
		case 'ExpressionStatement':
			return (codeGenerator(node.expression) + ';')
		// 对函数，我们输出括号并补充参数
		case 'CallExpression':
			return (codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(',') + ')')
		// 数字节点直接返回
		case 'NumberLiteral':
			return node.value
		default:
			throw new TypeError(node.type)
	}
}