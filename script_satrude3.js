//DesignModeler JScript, version: Ansys DesignModeler 2023 R1 (Nov 23 2022, 17:11:50; 23,2022,327,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\amroa\AEC\script_satrude3.js
//         On: 02/03/24, 14:40:23
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
  p.Ln7 = Line(0.00000000, 0.00000000, 10.00000000, 0.00000000);
  p.Ln8 = Line(10.00000000, 0.00000000, 10.00000000, -35.00000000);
  p.Ln9 = Line(10.00000000, -35.00000000, 0.00000000, -35.00000000);
  p.Ln10 = Line(0.00000000, -35.00000000, 0.00000000, 0.00000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Constraints
  HorizontalCon(p.Ln7);
  HorizontalCon(p.Ln9);
  VerticalCon(p.Ln8);
  VerticalCon(p.Ln10);
  CoincidentCon(p.Ln7.End, 10.00000000, 0.00000000, 
                p.Ln8.Base, 10.00000000, 0.00000000);
  CoincidentCon(p.Ln8.End, 10.00000000, -35.00000000, 
                p.Ln9.Base, 10.00000000, -35.00000000);
  CoincidentCon(p.Ln9.End, 0.00000000, -35.00000000, 
                p.Ln10.Base, 0.00000000, -35.00000000);
  CoincidentCon(p.Ln10.End, 0.00000000, 0.00000000, 
                p.Ln7.Base, 0.00000000, 0.00000000);
  CoincidentCon(p.Ln7.Base, 0.00000000, 0.00000000, 
                p.XAxis, 0.00000000, 0.00000000);
  CoincidentCon(p.Ln10, 0.00000000, 0.00000000, 
                p.YAxis, 0.00000000, 0.00000000);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
