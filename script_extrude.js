// Bridge parameters
var bridgeLength = 100.0; // Length of the bridge deck
var bridgeWidth = 10.0;  // Width of the bridge deck
var bridgeHeight = 1.0;  // Thickness of the bridge deck

// Support parameters
var supportWidth = 5.0;  // Width of the supports
var supportHeight = 10.0; // Height of the supports

// Define the first corner of the bridge deck
var point1 = {x: 0, y: 0, z: 0}; // You may need to adjust this based on the coordinate system of your model

// Define the opposite corner of the bridge deck
var point2 = {
    x: point1.x + bridgeLength,
    y: point1.y + bridgeWidth,
    z: point1.z + bridgeHeight
}; // Adjust bridgeLength, bridgeWidth, and bridgeHeight accordingly

// Create the bridge deck as a box
var deck = agb.Box(point1, point2);
agb.Regen(); // Regenerate the geometry to apply the changes


// Create first support
var support1 = agb.Block(0, (bridgeWidth - supportWidth) / 2, -supportHeight, supportWidth, supportWidth, supportHeight);
support1.Name = "Support1";
agb.Regen(); // Regenerate the geometry

// Create second support
var support2 = agb.Block(bridgeLength - supportWidth, (bridgeWidth - supportWidth) / 2, -supportHeight, supportWidth, supportWidth, supportHeight);
support2.Name = "Support2";
agb.Regen(); // Regenerate the geometry
