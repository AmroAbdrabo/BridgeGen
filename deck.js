//DesignModeler JScript, version: Ansys DesignModeler 2023 R1 (Nov 23 2022, 17:11:50; 23,2022,327,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\amroa\AEC\script_satrude5.js
//         On: 02/03/24, 15:18:43
//Using:
//  agb ... pointer to batch interface


//Note:
// You may be able to re-use below JScript function via cut-and-paste;
// however, you may have to re-name the function identifier.
//

function planeSketchesOnly (p)
{

//Plane
p.Plane  = agb.GetActivePlane();
p.Origin = p.Plane.GetOrigin();
p.XAxis  = p.Plane.GetXAxis();
p.YAxis  = p.Plane.GetYAxis();

//Sketch
p.Sk2 = p.Plane.NewSketch();
p.Sk2.Name = "Sketch2";

//Edges
with (p.Sk2)
{
  p.Ln5 = Line(0.00000000, 0.8*d32, 0.00000000, -0.8*d32);
  p.Ln5 = Line(0.00000000, -0.8*d32, 0.00000000 + 1, 0.8*d32);

  p.Ln7 = Line(0.00000000 + 1, -10.00000000, 0.00000000 + 1, 10.00000000); // base of the deck (d3) 10 should be replaced by d3/2
  p.Ln8 = Line(0.00000000 + 1, 10.00000000, 5.00000000 + 1, 10.00000000); // lower side of the deck (d4). 5 should be replaced by d4
  p.Ln9 = Line(5.00000000 + 1, 10.00000000, 5.00000000 + 1, 20.00000000);  // side underbelly of deck. 20 should be replaced by d1/2
  p.Ln10 = Line(5.00000000 + 1, 20.00000000, 10.00000000 + 1, 20.00000000); // d5. 10 should be replaced by 5 + d5 or d4 + d5
  p.Ln11 = Line(10.00000000 + 1, 20.00000000, 10.00000000 + 1, -20.00000000); // 20 should be replaced by d1/2. 10 should be replaced by d4 + d5
  p.Ln12 = Line(10.00000000 + 1, -20.00000000, 5.00000000 + 1, -20.00000000); // 20 should be replaced by d1/2 and 10 should be replaced by d4+d5 and 5 by d4 
  p.Ln13 = Line(5.00000000 + 1, -20.00000000, 5.00000000 + 1, -10.00000000); // second y-coord should be d3/2 and 5 should be replaced by d4
  p.Ln14 = Line(5.00000000 + 1, -10.00000000, 0.00000000 + 1, -10.00000000); // 
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Constraints
  HorizontalCon(p.Ln8);
  HorizontalCon(p.Ln10);
  HorizontalCon(p.Ln12);
  HorizontalCon(p.Ln14);
  VerticalCon(p.Ln7);
  VerticalCon(p.Ln9);
  VerticalCon(p.Ln11);
  VerticalCon(p.Ln13);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());
var ext1 = agb.Extrude(agc.Add, ps1.Sk2, agc.DirNormal, agc.ExtentFixed, 35.0, agc.ExtentFixed, 0.0, agc.No, 0.0, 0.0);

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
