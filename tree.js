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
        if (key < currentNode.value) {
            currentNode.left = this.insert(key, currentNode.left);
        } else if (key > currentNode.value) {
            currentNode.right = this.insert(key, currentNode.right);
        }
        // Return the unchanged node pointer
        return currentNode;
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }
    
    _deleteNode(currentNode, value) {
        // If the tree is empty, return null
        if (!currentNode) {
          return null;
        }
    
        // If the value to delete is less than the current node's value,
        // then search in the left subtree
        if (value < currentNode.value) {
          currentNode.left = this._deleteNode(currentNode.left, value);
          return currentNode;
        }
    
        // If the value to delete is greater than the current node's value,
        // then search in the right subtree
        if (value > currentNode.value) {
          currentNode.right = this._deleteNode(currentNode.right, value);
          return currentNode;
        }
    
        // If the value to delete is equal to the current node's value,
        // then this is the node to delete
        if (value === currentNode.value) {
          // Case 1: The node has no children
          if (!currentNode.left && !currentNode.right) {
            return null;
          }
    
          // Case 2: The node has one child
          if (!currentNode.left) {
            return currentNode.right;
          }
          if (!currentNode.right) {
            return currentNode.left;
          }
    
          // Case 3: The node has two children
          const smallestNode = this._findSmallestNode(currentNode.right);
          currentNode.value = smallestNode.value;
          currentNode.right = this._deleteNode(currentNode.right, smallestNode.value);
          return currentNode;
        }
    
        return currentNode;
    }
    
    _findSmallestNode(node) {
        let currentNode = node;
        while (currentNode.left) {
          currentNode = currentNode.left;
        }
        return currentNode;
    }
    

    // deleteKey(key, currentNode = this.root) {
    //     // Base case: if tree is empty
    //     if (currentNode == null) return currentNode;

    //     // Recur down tree
    //     if (key < currentNode) {
    //         currentNode.left = this.deleteKey(key, currentNode.left);
    //     } else if (key > currentNode) {
    //         currentNode.right = this.deleteKey(key, currentNode.right);
    //     }
    //     // If key is same as root, this is node to be deleted
    //     else {
    //         // Node with only one child or none
    //         if (currentNode.left == null) {
    //             return currentNode.right;
    //         }
    //         else if (currentNode.right == null) {
    //             return currentNode.left;
    //         }

    //         // Node with two children: Get the inorder successor (Smallest in right subtree)
    //         currentNode.value = this.minValue(currentNode.right);

    //         // Delete the inorder successor
    //         currentNode.right= this.deleteKey(key, currentNode.right);


    //     }
    // };

    minValue(root) {
        let minv = root.value;
        while (root.left != null) {
            minv = root.left.value;
            root = root.left;
        }
        return minv;
    }

    prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
    
}


let array = [23,12,6,34,126,4,27,45,4,134]

// const sorted = [...new Set(array)].sort((a,b) => a - b);
// console.log(sorted)

const myTree = new Tree(array)

myTree.delete(6)
myTree.prettyPrint();