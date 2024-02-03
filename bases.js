//DesignModeler JScript, version: Ansys DesignModeler 2023 R1 (Nov 23 2022, 17:11:50; 23,2022,327,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\amroa\AEC\bases.js
//         On: 02/03/24, 16:17:45
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
p.Sk2.Name = "Sketch3";

//Edges
with (p.Sk2)
{
  p.Ln15 = Line(-10.00000000, 0.00000000, 10.00000000, 0.00000000);
  p.Ln16 = Line(10.00000000, 0.00000000, 10.00000000, 6.00000000);
  p.Ln17 = Line(10.00000000, 6.00000000, -10.00000000, 6.00000000);
  p.Ln18 = Line(-10.00000000, 6.00000000, -10.00000000, 0.00000000);

  p.Ln19 = Line(10.00000000, 14.00000000, -10.00000000, 14.00000000);
  p.Ln20 = Line(-10.00000000, 14.00000000, -10.00000000, 20.00000000);
  p.Ln21 = Line(-10.00000000, 20.00000000, 10.00000000, 20.00000000);
  p.Ln22 = Line(10.00000000, 20.00000000, 10.00000000, 14.00000000);

  p.Ln39 = Line(10.00000000, 28.00000000, -10.00000000, 28.00000000);
  p.Ln40 = Line(-10.00000000, 28.00000000, -10.00000000, 34.00000000);
  p.Ln41 = Line(-10.00000000, 34.00000000, 10.00000000, 34.00000000);
  p.Ln42 = Line(10.00000000, 34.00000000, 10.00000000, 28.00000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Constraints
  HorizontalCon(p.Ln15);
  HorizontalCon(p.Ln17);
  HorizontalCon(p.Ln19);
  HorizontalCon(p.Ln21);
  HorizontalCon(p.Ln39);
  HorizontalCon(p.Ln41);
  VerticalCon(p.Ln16);
  VerticalCon(p.Ln18);
  VerticalCon(p.Ln20);
  VerticalCon(p.Ln22);
  VerticalCon(p.Ln40);
  VerticalCon(p.Ln42);


}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly



//Call Plane JScript function
var psbases = planeSketchesOnly (new Object());
var ext2 = agb.Extrude(agc.Add, psbases.Sk2, agc.DirReversed, agc.ExtentFixed, 20.0, agc.ExtentFixed, 0.0, agc.No, 0.0, 0.0);


//Finish
agb.Regen(); //To insure model validity
//End DM JScript
