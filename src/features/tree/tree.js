const Tree = (root) => {
  const id = root.id;
  if(!root) throw new Error('Please provide an ID attribute for tree')
  const LOCALSTORAGE_KEY = 'SINAM_TREE_' + id
  const allNodes = root.querySelectorAll('.tree__node')
  const nodesWithSubtree = [...allNodes].filter((node) => node.querySelector('.tree__subtree'))
  let openedNodes = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || []
  
  const openNode = (node, nodeId) => {
    node.classList.add('tree__node_open')
    if (!openedNodes.includes(nodeId)) openedNodes.push(nodeId)
  }
  
  const closeNode = (node, nodeId) => {
    node.classList.remove('tree__node_open')
    openedNodes = openedNodes.filter((id) => id !== nodeId)
  }

  const toggleNode = (node, nodeId) => {
    const opened = node.classList.contains('tree__node_open')
    opened ? closeNode(node, nodeId) : openNode(node, nodeId)
  }

  nodesWithSubtree.forEach((node, index) => {
    if (openedNodes.includes(index)) openNode(node, index)
    node.querySelector('.tree__collapse').addEventListener('click', () => {
      toggleNode(node, index)
    })
  })

  window.addEventListener('beforeunload', () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(openedNodes))
  })
}
//Tree(document.querySelector('.tree'))
document.querySelectorAll('.tree').forEach(Tree)