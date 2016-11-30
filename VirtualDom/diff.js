const diffChildren = (old_children, new_children, index, patches) => {
	let left_node = null
	let current_node_index = index

	old_children.forEach((child, i) => {
		let new_child = new_children[i]
		current_node_index = (left_node && left_node.count)
			? current_node_index + left_node.count +1
			: current_node_index + 1

		diffWalk(child, new_child, current_node_index, patches)
		left_node = child
	})
}

const diffWalk = (old_node, new_node, index, patches) => {
	patches[index] = [...]

	diffChildren(old_node.children, new_node.children, index, patches)
}


export const diff = (old_tree, new_tree) => {
	let _index = 0
	let patches = {}
	
	diffWalk(old_tree, new_tree, index, patches)
	return patches
}