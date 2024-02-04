
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
  p.Ln5 = Line(0.00000000, -0.8*10.0, 0.00000000, 0.8*10.0);
  p.Ln6 = Line(0.00000000, 0.8*10.0, 0.00000000 + 1, 10.0);

  //p.Ln7 = Line(0.00000000 + 1, -10.0, 0.00000000 + 1, 10.0); // base of the deck (20.0) 10 should be replaced by 20.0/2
  p.Ln8 = Line(0.00000000 + 1, 10.0, 5.0 + 1, 10.0); // lower side of the deck (5.0). 5 should be replaced by 5.0
  p.Ln9 = Line(5.0 + 1, 10.0, 10.0 - 4.0 + 1, 20.0);  // side underbelly of deck. 20 should be replaced by 40.0/2
  p.Ln10 = Line(10.0 - 4.0 + 1, 20.0, 10.0 + 1, 20.0); // 4.0. 10 should be replaced by 5 + 4.0 or 5.0 + 4.0
  p.Ln11 = Line(10.0 + 1, 20.0, 10.0 + 1, -20.0); // 20 should be replaced by 40.0/2. 10 should be replaced by 5.0 + 4.0
  p.Ln12 = Line(10.0 + 1, -20.0, 10.0 - 4.0 + 1, -20.0); // 20 should be replaced by 40.0/2 and 10 should be replaced by 5.0+4.0 and 5 by 5.0 
  p.Ln13 = Line(10.0 - 4.0 + 1, -20.0, 5.0 + 1, -10.0); // second y-coord should be 20.0/2 and 5 should be replaced by 5.0
  p.Ln14 = Line(5.0 + 1, -10.0, 0.00000000 + 1, -10.0); // 
  p.Ln4 = Line(0.00000000 + 1, -10.0, 0.00000000, -0.8*10.0); // 
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Constraints
  HorizontalCon(p.Ln8);
  HorizontalCon(p.Ln10);
  HorizontalCon(p.Ln12);
  HorizontalCon(p.Ln14);
  //VerticalCon(p.Ln7);
  //VerticalCon(p.Ln9);
  VerticalCon(p.Ln11);
  //VerticalCon(p.Ln13);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());
var ext1 = agb.Extrude(agc.Add, ps1.Sk2, agc.DirNormal, agc.ExtentFixed, 80.0, agc.ExtentFixed, 0.0, agc.No, 0.0, 0.0);

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
