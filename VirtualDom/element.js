class Element {
	constructor(tagName, props, children) {
		this.tagName = tagName
		this.props = props
		this.children = children
	},
	render() {
		let el = document.createElement(this.tagName)
		let props = this.props

		for (var propName in props) {
			let propValue = props[propName]
			el.setAttribute(propName, propValue)
		}

		let children = this.children || []

		children.forEach(child => {
			let child_el = (child instanceof Element) ? child.render() : document.createTextNode(child)
			el.appendChild(child_el)
		})
		
		return el
	}
}

module.exports = (tagName, props, children) => {
	return new Element(tagName, props, children)
}