class Node {
	constructor(value, next = null) {
	    this.next = next;
	    this.value = value;
	}
}

class List {
    constructor(value) {
        this.root = new Node(value)
        this._length = 1;
    }

    add(value, i = 0) {
        if(i > this.lenth) {
            return false;
        }
        let node = new Node(value),
        currentNode = this.root;
        
        if(i === 0) {
            while (currentNode.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = node;
            this._length++;
        } else {
            let prev = this.searchNodeAt(i+1);
   
            let temp = prev.next;
            prev.next = node;
            node.next = temp;
        }
        

        return true;
    }

    searchNodeAt(position) {
        var currentNode = this.root,
            length = this._length,
            count = 1;

        if (length === 0 || position < 1 || position > length) {
           return false;
        }

        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    };

    remove(position) {
        var currentNode = this.root,
            length = this._length,
            count = 0,
            beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;
        
        if(!position) {
            position = this._length;
        }

        if (position < 0 || position > length) {
            return false;
        }

        if (position === 0) {
            this.root = currentNode.next;
            deletedNode = currentNode;
            currentNode = null;
            this._length--;

            return deletedNode;
        }


        while (count < position) {
            beforeNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            count++;
        }

        beforeNodeToDelete.next = nodeToDelete.next;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this._length--;

        return deletedNode;
    };

    print() {
        let currentNode = this.root;
        while(currentNode.next){
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
        if(currentNode.next === null){
            console.log(currentNode.value);
        }
    }

}

let list = new List(9);
console.log(list);
list.add(10);
console.log(list);
list.add(10);
console.log(list);
list.add(15, 1);
console.log(list);
list.remove(1)
list.print();