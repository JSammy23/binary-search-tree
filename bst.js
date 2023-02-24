class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

function sortedArrayToBST(arr, start, end) {
    /* Base Case */
    if ( start > end) {
        return null;
    }
    // Get the middle element & make it root
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    // Recursivley construct left subtree
    node.left = sortedArrayToBST(arr, start, mid - 1);

    // Recursivly construct right subtree
    node.right = sortedArrayToBST(arr, mid + 1, end);

    return node;
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};