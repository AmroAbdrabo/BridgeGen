// Two slashes indicate a comment

// Reading of point sequence data
var PF1 = agb.FPoint(agc.FPointConstruction, agc.FPointCoordinateFile);
PF1.Name = "TablePoints"; //Change feature name
PF1.CoordinateFile = "C:\\Users\\amroa\\Desktop\\pointdesc.txt";
agb.Regen(); //Run Generate

// Create line body (LinesFromPoints)
var LF1 = agb.LinePt();
LF1.AddSegment(PF1.GetPoint(1, 1), PF1.GetPoint(1, 2)); // Connect ID1 of Group 1 and ID2 of Group 1
LF1.AddSegment(PF1.GetPoint(1, 2), PF1.GetPoint(1, 3));
LF1.AddSegment(PF1.GetPoint(1, 3), PF1.GetPoint(1, 4), 1); // When connecting, set the edge ID of that edge to No. 1
LF1.AddSegment(PF1.GetPoint(1, 4), PF1.GetPoint(1, 1));
agb.Regen();

// Create line body 2
var LF2 = agb.LinePt();
LF2.AddSegment(PF1.GetPoint(1, 3), PF1.GetPoint(2, 1), 2);
LF2.AddSegment(PF1.GetPoint(2, 1), PF1.GetPoint(2, 2), 3);
LF2.AddSegment(PF1.GetPoint(2, 2), PF1.GetPoint(1, 4), 4);
agb.Regen();

// Create a surface body 1
var i;
var edge;
var edgeNum = LF1.GetNumEdges(); // Get number of edges from first line body
if(edgeNum > 0)
{
    agb.ClearSelections();
    for(i = 1; i < edgeNum+1; i++)
    {
        edge = LF1.GetEdge(i);
        agb.AddSelect(agc.TypeEdge3d, edge); // Select Edge
    }
    var surf1 = agb.SurfFromLines();
    agb.Regen();
}


// Create surface body 2 
agb.ClearSelections(); 
agb.AddSelectEdgeID(1); // Select edge with edge ID = 1 
agb.AddSelectEdgeID(2); 
agb.AddSelectEdgeID(3); 
agb.AddSelectEdgeID(4); 
var surf2 = agb.SurfFromLines(); 
agb.Regen();