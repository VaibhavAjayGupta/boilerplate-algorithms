'use strict'

let currentGraph; // Global current graph
let currentTime=0; // Global current time

//  constructor for class vertex
function Vertex(name) {
    this.color = "white"; // white -> not added to explore, gray -> added to explore, black -> totally explored 
    this.adjList = [];
    this.name = name;
    this.predecessor=null; // predecessor of the current vertex
    this.discovered=null; // timestamp of when the current vertex is dicovered to be explored
    this.finished=null; // timestamp when the exploration of the current vertex is finished
}


// function(Constructor) to create a graph with n vertices no vertex is connected to other : This is a adjacency lsit representation
function Graph(vertexNames) {
    this.numVertices = vertexNames.length; // number of vertices in a graph
    this.vertices = []; // hashmap of list of adjacent vertices to a particular vertex

    for (let i = 0; i < vertexNames.length; i++) {
        this.vertices[vertexNames[i]] = new Vertex(vertexNames[i]);
    }

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

// function to input dfsSource
function doDfsUI(){
    doDfs();
}

//  Function to start DFS
function doDfs() {
    
    currentTime = 0;
    for(let counter in currentGraph.vertices){
        if(currentGraph.vertices[counter].color=='white'){
            dfsVisit(currentGraph.vertices[counter]);
        }
    }
    displayDfsResult();
}


// function for dfs visit
function dfsVisit(v){
    currentTime = currentTime + 1;
    v.discovered = currentTime;
    v.color='gray';
    for(let counter in v.adjList){
        if(currentGraph.vertices[v.adjList[counter]].color=='white'){
            currentGraph.vertices[v.adjList[counter]].predecessor = v.name;
            dfsVisit(currentGraph.vertices[v.adjList[counter]]);
        }
    }
    v.color='black';
    currentTime = currentTime + 1;
    v.finished = currentTime;

}
// function to display the result of bfs
function displayDfsResult(){
    let result = "";
    for(let counter in currentGraph.vertices){
        result = result + "Vertex "+currentGraph.vertices[counter].name+" explored, Predecessor is "+currentGraph.vertices[counter].predecessor+
        ", Discovered Time is "+currentGraph.vertices[counter].discovered+", Finished Time is "+currentGraph.vertices[counter].finished+"<br/>";
    }

    document.getElementById("dfsRes").innerHTML=result;
}