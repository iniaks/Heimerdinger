// 至此我们写完了所有编译器所需要的方法
// 
// 我们的程序管线如下
// 原始代码 => tokenizer => tokens
// tokens => parser => AST
// AST => transformer => newAST
// newAST => generator => 目标代码

function complier(input) {
	var tokens = tokenizer(input)
	var AST = parser(tokens)
	var newAST = transformer(AST)
	var output = codeGenerator(newAST)

	return output
}