//DesignModeler JScript, version: Ansys DesignModeler 2023 R1 (Nov 23 2022, 17:11:50; 23,2022,327,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\amroa\AEC\script_satrude2.js
//         On: 02/03/24, 13:49:55
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
p.Sk1 = p.Plane.NewSketch();
p.Sk1.Name = "Sketch1";

//Edges
with (p.Sk1)
{
  p.Ln15 = Line(-4.00000000, 4.60000000, 59.00000000, 4.60000000);
  p.Ln16 = Line(59.00000000, 4.60000000, 59.00000000, -4.00000000);
  p.Ln17 = Line(59.00000000, -4.00000000, -4.00000000, -4.00000000);
  p.Ln18 = Line(-4.00000000, -4.00000000, -4.00000000, 4.60000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Constraints
  HorizontalCon(p.Ln15);
  HorizontalCon(p.Ln17);
  VerticalCon(p.Ln16);
  VerticalCon(p.Ln18);
  CoincidentCon(p.Ln15.End, 59.00000000, 4.60000000, 
                p.Ln16.Base, 59.00000000, 4.60000000);
  CoincidentCon(p.Ln16.End, 59.00000000, -4.00000000, 
                p.Ln17.Base, 59.00000000, -4.00000000);
  CoincidentCon(p.Ln17.End, -4.00000000, -4.00000000, 
                p.Ln18.Base, -4.00000000, -4.00000000);
  CoincidentCon(p.Ln18.End, -4.00000000, 4.60000000, 
                p.Ln15.Base, -4.00000000, 4.60000000);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
