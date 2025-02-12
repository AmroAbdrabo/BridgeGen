
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
  p.Ln15 = Line(-0.8*20.0, 0.00000000, 0.8*20.0, 0.00000000);
  p.Ln16 = Line(0.8*20.0, 0.00000000, 0.8*20.0, 2.00000000);
  p.Ln17 = Line(0.8*20.0, 2.00000000, -0.8*20.0, 2.00000000);
  p.Ln18 = Line(-0.8*20.0, 2.00000000, -0.8*20.0, 0.00000000);

  p.Ln19 = Line(0.8*20.0, 50.0, -0.8*20.0, 50.0);
  p.Ln20 = Line(-0.8*20.0, 50.0, -0.8*20.0, 50.0 + 2);
  p.Ln21 = Line(-0.8*20.0, 50.0 + 2, 0.8*20.0, 50.0 + 2);
  p.Ln22 = Line(0.8*20.0, 50.0 + 2, 0.8*20.0, 50.0);

  p.Ln39 = Line(0.8*20.0, 2*50.0, -0.8*20.0, 2*50.0);
  p.Ln40 = Line(-0.8*20.0, 2*50.0, -0.8*20.0, 2*50.0 + 2);
  p.Ln41 = Line(-0.8*20.0, 2*50.0 + 2, 0.8*20.0, 2*50.0 + 2);
  p.Ln42 = Line( 0.8*20.0, 2*50.0 + 2,  0.8*20.0, 2*50.0);

  p.Ln43 = Line(0.8*20.0, 3*50.0, -0.8*20.0, 3*50.0);
  p.Ln44 = Line(-0.8*20.0, 3*50.0, -0.8*20.0, 3*50.0 + 2);
  p.Ln45 = Line(-0.8*20.0, 3*50.0 + 2, 0.8*20.0, 3*50.0 + 2);
  p.Ln46 = Line( 0.8*20.0, 3*50.0 + 2,  0.8*20.0, 3*50.0);

  p.Ln47 = Line(0.8*20.0,  4*50.0 - 2, -0.8*20.0, 4*50.0 - 2);
  p.Ln48 = Line(-0.8*20.0, 4*50.0 - 2, -0.8*20.0, 4*50.0);
  p.Ln49 = Line(-0.8*20.0, 4*50.0, 0.8*20.0, 4*50.0);
  p.Ln50 = Line( 0.8*20.0, 4*50.0,  0.8*20.0, 4*50.0 - 2);

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
var ext2 = agb.Extrude(agc.Add, psbases.Sk2, agc.DirReversed, agc.ExtentFixed, 15.0, agc.ExtentFixed, 0.0, agc.No, 0.0, 0.0);


//Finish
agb.Regen(); //To insure model validity
//End DM JScript
