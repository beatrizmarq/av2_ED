class BinaryTree {
    // inicia a raiz como nula   #comentado
    constructor() {
        this.root = null
    }

    //mostra o valor menor da arvore
       
    /* a currente que é um variavel ira receber o valor da variavel root
        se current for igual a null retornara -1 porque nao ira ter valor dentro ou também retorna null
        caso não entra dentro de um laço 
        enquanto o valor da esquerda for != de null current recebera current.left
        quando o valor da esquerda for == a null encerra o while e current tera o valor menor  #comentado
    */
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }

    //mostra o maior valor da arvore
       
     /* 
        A current variavel recebe o valor da varivel root
        Se current for == a null ira retornar -1 porque nao tera valor dentro ou entao retornara null
        caso inverta os papeis entra dentro do laço 
        enquanto o valor da direita for != de null current recebe current.left
        quando o valor da direita for == a null termina o while e current tem o valor maior
    */
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //insere o elemento da arvores
    insert(element) { //recebe uma referencia do no 
        this.root = this.insertNode(this.root, element)
        //retorna uma referencia do no
    }
    
    //IMPLEMENTANDO O INSERT DA ARVORE
    /*recebe uma referencia e insere o no
      Ele analisa se é nulu e insere
      analisa se é maior que a raiz
      Se sim ele insere na direta
      Se nao ele insere a esquerda  #comentado
    */
    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    //a funcao recebe callback
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }
    
    /*analisa se o no e nulo
     *se sim nao returna nada
     *caso contrario manda mostrar em ordem
     *esqueda,conteudo e direita do no    #comentado
    */
    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }
    //recebe o no e o callback 
    /*
        se no for nullo nao retorne nada
        se nao passe o conteudo do no dentro do callback
        e depois exibe a esquerda do no
        e logo em seguida a direita do no  #comentado
    */ 
    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }
    //pos ordem recebe o metodo e a função
       /* 
        se o no for nullo nao retorne nada
        se nao ira passar o conteudo do no dentro do callback
        e depois exibir a esquerda do no
        e logo em seguida a direita do no  #comentado
       */
    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore 
    //  Busca na árvore binária
    //  se é nulo, o elemento não existe
    //  se é igual ao conteúdo, encontrou
    //  se é maior que o conteúdo
    //  busca na direita
    //  busca na esquerda      #comentado

    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na arvore o retorna
       
    //remove e retorna a arvore carregada
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }
    /* 
        Se o valor do no for == ao valor
        entra dentro do 2º if
        Se o lado esquerdo for == ao lado direito retorna null
        Se o lado direito for nulo retorna o lado esquerdo
        Se o lado esquerdo for == a null retorna o lado direito
        E se nao atender nenhum das condições passadas
        O novo no recebera o valor do lado direito
        O current também ira recebe o mesmo valor
        E o valor do lado esquerdo for diferemte de null
        Current recebera o valor do lado esquerdo
        E retornara o novo no
        Se o valor de content nao for igual a value
        E value for > o valor do no entra dentro do if
        E o valor da esquerda e removido
        Caso contrario o valor da direita é tirado
        E entao retornara o no                             #comentado
    */
    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //nao possui filhos - Grau 0
                return null
            } else if (node.right == null) {
                //nao possui filhos na direita, e tem nó na esqueda - º 1
                return node.left
            } else if (node.left == null) {
                //nao possui filhos da esquerda, e tem nó da direita - º 1
                return node.right
            } else {
                // tem os dois ramos - Grau º 2                   #comentado
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }
    //exibe a altura da arvore
    height() {
        return this.heightVisitor(this.root)
    }
    /*recebe um no e sera nulo por padrao
        o no nao sendo null retornara -1
        leftHeight, analisa a altura da esquerda
        rightHeight, analisa a altura da direita
        retorna a variavel de maior valor + 1 que é uma contagem do outro no  #comentado
    */
    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na arvore
       
    //retorna o tamamho a partir da raiz
    size() {

        return this.sizeVisitor(this.root)
    }
    /* 
    se nao existir no  
    retorna 0
    se for o contrario
    retorna o tamanho do no da esquerda, o tamanho do no da direita e o resultado somando 1   #comentado
    */
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}
