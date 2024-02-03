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
  p.Ln7 = Line(0.00000000, -10.00000000, 0.00000000, 10.00000000);
  p.Ln8 = Line(0.00000000, 10.00000000, 5.00000000, 10.00000000);
  p.Ln9 = Line(5.00000000, 10.00000000, 5.00000000, 20.00000000);
  p.Ln10 = Line(5.00000000, 20.00000000, 10.00000000, 20.00000000);
  p.Ln11 = Line(10.00000000, 20.00000000, 10.00000000, -20.00000000);
  p.Ln12 = Line(10.00000000, -20.00000000, 5.00000000, -20.00000000);
  p.Ln13 = Line(5.00000000, -20.00000000, 5.00000000, -10.00000000);
  p.Ln14 = Line(5.00000000, -10.00000000, 0.00000000, -10.00000000);
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
  CoincidentCon(p.Ln7.Base, 0.00000000, -10.00000000, 
                p.YAxis, 0.00000000, -10.00000000);
  CoincidentCon(p.Ln7.End, 0.00000000, 10.00000000, 
                p.YAxis, 0.00000000, 10.00000000);
  CoincidentCon(p.Ln8.Base, 0.00000000, 10.00000000, 
                p.Ln7.End, 0.00000000, 10.00000000);
  CoincidentCon(p.Ln9.Base, 5.00000000, 10.00000000, 
                p.Ln8.End, 5.00000000, 10.00000000);
  CoincidentCon(p.Ln10.Base, 5.00000000, 20.00000000, 
                p.Ln9.End, 5.00000000, 20.00000000);
  CoincidentCon(p.Ln11.Base, 10.00000000, 20.00000000, 
                p.Ln10.End, 10.00000000, 20.00000000);
  CoincidentCon(p.Ln12.Base, 10.00000000, -20.00000000, 
                p.Ln11.End, 10.00000000, -20.00000000);
  CoincidentCon(p.Ln13.Base, 5.00000000, -20.00000000, 
                p.Ln12, 5.00000000, -20.00000000);
  CoincidentCon(p.Ln13.Base, 5.00000000, -20.00000000, 
                p.Ln12.End, 5.00000000, -20.00000000);
  CoincidentCon(p.Ln14.Base, 5.00000000, -10.00000000, 
                p.Ln13, 5.00000000, -10.00000000);
  CoincidentCon(p.Ln14.End, 0.00000000, -10.00000000, 
                p.Ln7.Base, 0.00000000, -10.00000000);
  CoincidentCon(p.Ln14.Base, 5.00000000, -10.00000000, 
                p.Ln13.End, 5.00000000, -10.00000000);
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
