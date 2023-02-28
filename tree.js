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

    // Delete Value
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

    find(value) {
        let currentNode =  this.root;

        while (currentNode) {
            if (value === currentNode.value) {
                return currentNode;
            }
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return null;
    }

    levelOrder(callback = null) {
        const result = [];
        const queue = [];
    
        if (this.root) {
          queue.push(this.root);
        }
    
        while (queue.length > 0) {
          const node = queue.shift();
          result.push(node.value);
    
          if (callback) {
            callback(node);
          }
    
          if (node.left) {
            queue.push(node.left);
          }
          if (node.right) {
            queue.push(node.right);
          }
        }
    
        return result;
    }

    height(node) {
        if (node === null) {
          return -1;
        }
    
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth(node) {
        let current = this.root;
        let depth = 0;
    
        while (current !== null) {
          if (node.value === current.value) {
            return depth;
          } else if (node.value < current.value) {
            current = current.left;
          } else {
            current = current.right;
          }
    
          depth++;
        }
    
        return -1;
    }

    isBalanced(node = this.root) {
        if (node === null) {
          return true;
        }
    
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)) {
          return true;
        }
    
        return false;
    }

    inorder(fn = (node) => console.log(node.value)) {
        const result = [];
    
        const traverse = (node) => {
          if (node === null) {
            return;
          }
    
          traverse(node.left);
          fn(node);
          result.push(node.value);
          traverse(node.right);
        };
    
        traverse(this.root);
    
        return result;
    }
    
    preorder(fn = (node) => console.log(node.value)) {
        const result = [];
    
        const traverse = (node) => {
          if (node === null) {
            return;
          }
    
          fn(node);
          result.push(node.value);
          traverse(node.left);
          traverse(node.right);
        };
    
        traverse(this.root);
    
        return result;
    }
    
    postorder(fn = (node) => console.log(node.value)) {
        const result = [];
    
        const traverse = (node) => {
          if (node === null) {
            return;
          }
    
          traverse(node.left);
          traverse(node.right);
          fn(node);
          result.push(node.value);
        };
    
        traverse(this.root);
    
        return result;
    }
    
    rebalance(traversal = 'inorder') {
        // Traverse the tree in the specified order and collect the node values
        const arr = [];
        switch (traversal) {
          case 'inorder':
            this.inorder((node) => arr.push(node.value));
            break;
          case 'preorder':
            this.preorder((node) => arr.push(node.value));
            break;
          case 'postorder':
            this.postorder((node) => arr.push(node.value));
            break;
          default:
            throw new Error(`Invalid traversal method: ${traversal}`);
        }

        this.root = this.buildTree(arr);
    
        // Rebuild the tree with the collected node values
        // const newTree = new Tree();
        // const rebuild = (values, start, end) => {
        //   if (start > end) return null;
        //   const mid = Math.floor((start + end) / 2);
        //   const node = new Node(values[mid]);
        //   node.left = rebuild(values, start, mid - 1);
        //   node.right = rebuild(values, mid + 1, end);
        //   return node;
        // };
        // newTree.root = rebuild(arr, 0, arr.length - 1);
    
        // Return the new balanced tree
        // return newTree;
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
myTree.insert(200)
myTree.insert(300)
myTree.insert(400)
myTree.insert(500)
myTree.prettyPrint();
console.log(myTree.isBalanced())
myTree.rebalance()
myTree.prettyPrint()
console.log(myTree.isBalanced())