const Node = require('./bst');


class Tree {
    constructor(arr) {
        const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null;
    
        const midpoint = Math.floor(sortedArray.length / 2);
        const newNode = new Node(sortedArray[midpoint]);
        newNode.left = this.buildTree(sortedArray.slice(0, midpoint));
        newNode.right = this.buildTree(sortedArray.slice(midpoint + 1));
        return newNode;
    }

    // Insert New Value
    insert(key, currentNode = this.root) {
        // If tree is empty, return new node
        if (currentNode == null) {
            currentNode = new Node(key);
            return currentNode;
        }
        // Recur down the tree
        if (key < currentNode.data) {
            currentNode.left = this.insert(key, currentNode.left);
        } else if (key > currentNode.data) {
            currentNode.right = this.insert(key, currentNode.right);
        }
        // Return the unchanged node pointer
        return currentNode;
    }

    prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
    
}


let array = [23,12,6,34,126,4,27,45,4,134]

// const sorted = [...new Set(array)].sort((a,b) => a - b);
// console.log(sorted)

const myTree = new Tree(array)
myTree.insert(46)

myTree.prettyPrint();