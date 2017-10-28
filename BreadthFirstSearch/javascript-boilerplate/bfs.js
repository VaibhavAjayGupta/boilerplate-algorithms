'use strict'

var currentGraph;

//  constructor for class vertex
function Vertex(name) {
    this.color = "white"; // white -> not added to explore, gray -> added to explore, black -> totally explored 
    this.adjList = [];
    this.name = name;
    this.distance=""; // distance from source
}


// function(Constructor) to create a graph with n vertices no vertex is connected to other : This is a adjacency lsit representation
function Graph(vertexNames) {
    this.numVertices = vertexNames.length; // number of vertices in a graph
    this.vertices = []; // hashmap of list of adjacent vertices to a particular vertex

    for (let i = 0; i < vertexNames.length; i++) {
        this.vertices[vertexNames[i]] = new Vertex(vertexNames[i]);
    }

}

//  class to store bfs result
function BfsDetail(name,distance){
    this.name=name;
    this.distance=distance;
}


// UI function to initialize a graph
function createGraphUI() {
    var vertexNames = document.getElementById("numV").value.split(",");
    currentGraph = new Graph(vertexNames);
    showGraph();
}

// UI function to insert an edge between vertices
function addEdgeUI() {

    var vertices = document.getElementById("edgeV").value.split(",");
    addEdge(vertices[0], vertices[1]);
    document.getElementById("edgeV").value = "";
    showGraph();
}

// function to add an edge between vertices v1 and v2
function addEdge(v1, v2) {

    // add an edge from v1 to v2 and also from v2 to v1 as this is a undirected graph
    if (currentGraph.vertices[v1] == undefined || currentGraph.vertices[v2] == undefined) {
        alert("One or more entered vertex not present");
    } else {
        if (currentGraph.vertices[v1].adjList.indexOf(v2) < 0) {
            currentGraph.vertices[v1].adjList.push(v2);
            currentGraph.vertices[v2].adjList.push(v1);
        }
    }

}


// function to show graph
function showGraph() {

    let result = "<br/><br/>"
    for (let counter in currentGraph.vertices) {
        result = result + "Adjacency List of vertex " + currentGraph.vertices[counter].name + "<br/>";
        for (let edge of currentGraph.vertices[counter].adjList) {
            result = result + edge + "   ";
        }
        result = result + "<br/><br/>";
    }

    document.getElementById("graphRep").innerHTML = result;
}

// function to create a default graph
function createDefaultGraph(){
    currentGraph = new Graph(['a','c','d','e']);
    addEdge('a','c');
    addEdge('c','d');
    addEdge('d','e');
    addEdge('e','a');
    showGraph();
}

// function to input bfsSource
function doBfsUI(){
    let bfsSource = document.getElementById("bfsSource").value;
    doBfs(bfsSource);
}

//  Function to start BFS
function doBfs(source) {

    let bfsResult = []; // list representing the order in which the vertices are explored in the graph
    let toExplore = []; // FIFO queue of vertices remaining to explore
    let level = 0; // Distance from source
    if (currentGraph.numVertices > 0) {
          toExplore.push(currentGraph.vertices[source]);
          currentGraph.vertices[source].color="gray"; // gray -> added to explore
          currentGraph.vertices[source].distance=level;
          level++;
            while(toExplore.length>0){
                let vertexToExplore = toExplore.shift(); // FIFO queue vertex added first will be explored first
                for(let adjCounter in  vertexToExplore.adjList){
                    if(currentGraph.vertices[vertexToExplore.adjList[adjCounter]].color ==="white"){
                        toExplore.push(currentGraph.vertices[vertexToExplore.adjList[adjCounter]]);
                        currentGraph.vertices[vertexToExplore.adjList[adjCounter]].color ="gray"; // gray -> added to 
                        currentGraph.vertices[vertexToExplore.adjList[adjCounter]].distance=level; 
                    }
                }
                vertexToExplore.color="black";
                let bfsDetail = new BfsDetail(vertexToExplore.name,vertexToExplore.distance);
                bfsResult.push(bfsDetail);
                level++;
            }

        
    }
    displayBfsResult(bfsResult);
}

// function to display the result of bfs
function displayBfsResult(bfsResult){
    let result = "";
    for(let value of bfsResult){
        result = result + "Vertex "+value.name+" explored, Distance from source is "+value.distance+"<br/>";
    }

    document.getElementById("bfsRes").innerHTML=result;
}