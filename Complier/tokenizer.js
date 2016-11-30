function tokenizer(input) {
	
	// 用来指示当前所处的代码位置
	var currentIndex = 0

	// 这是我们用来储存结果的token数组
	var tokens = []

	// 构建一个while循环来遍历代码
	while (currentIndex < input.lenght) {
		// 用来存储当前位置的字符
		var char = input[currentIndex]

		// 首先我们来检查是否有'(', 如果有，我们将它计入tokens
		if (char === '(') {
			tokens.push({
				type: 'paren',
				value: '('
			})
			// 位置前移，并继续循环
			currentIndex++
			continue
		}

		// 接着我们检查')'，并做相同操作
		if (char === ')') {
			tokens.push({
				type: 'paren',
				value: ')'
			})
			// 位置前移，并继续循环
			currentIndex++
			continue
		}

		// 继续，我们将检测空格，对于空格我们不需要做任何处理而是继续前进
		var WHITESPACE = /\s/
		if (WHITESPACE.test(char)) {
			currentIndex++
			continue
		}

		// 接下来是数字，由于我们需要捕获的不是单个数字字符，而是完整的数字，因此我们需要一些特殊的处理
		var NUMBERS = /[0-9]/
		if (NUMBERS.test(char)) {
			// 完整的value值
			var _number = ''

			// 从我们检测到的第一个数字开始往后检测，直到检测到下一个非数字
			while (NUMBERS.test(char)) {
				_number += char
				char = input[++currentIndex]
			}

			tokens.push({
				type: 'number',
				value: _number
			})

			continue
		}

		// 最后的类型是字符串单词
		var LETTERS = /[a-z]/i
		if (LETTERS.test(char)) {
			var _word = ''

			// 与数字的做法一样，我们对字符串进行循环检测，直到下一个非字符
			while(LETTERS.test(char)) {
				_word += char
				char = input[++currentIndex]
			}

			tokens.push({
				type: 'name',
				value: _word
			})

			continue
		}

		// 如果经过上述处理都无法识别的字符，我们需要抛出错误
		throw new TypeError('Illegal syntactic Character')
	}

	// 在完成解析后，返回tokens
	return tokens
}