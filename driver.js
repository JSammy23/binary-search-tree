const Tree = require('./tree');

const randomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const myTree = new Tree(randomArray(25))

console.log(myTree.isBalanced())
myTree.prettyPrint()
console.log('Level Order Below')
console.log(myTree.levelOrder())

console.log('Pre-Order Below')
myTree.preorder()

console.log('Post Order Below')
myTree.postorder()

console.log('In-Order Below')
myTree.inorder()

myTree.insert(175)
myTree.insert(225)
myTree.insert(332)
myTree.insert(447)
myTree.prettyPrint()
console.log('Is tree balanced? = ' + myTree.isBalanced())

myTree.rebalance()
console.log('Rebalance Tree')
console.log('Is tree balanced? = ' + myTree.isBalanced())

myTree.prettyPrint()


