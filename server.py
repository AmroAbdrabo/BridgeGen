from flask import Flask, request, send_file, render_template_string

app = Flask(__name__)

# HTML template with a form
HTML_TEMPLATE = '''
<html>
<head>
    <link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center; /* Center align the content */
        }
        img {
            max-width: 70%;
            height: auto;
            display: block; /* This will make it easier to center */
            margin: 0 auto; /* Center the image */
            margin-top: 1%;
        }
        h1 {
            margin-top: 2%;
            font-size: 50px;
            font-family: "Open Sans";
        }
        input[type="text"] {
            color: black;
        }
        .container {
            display: flex; /* Use Flexbox to layout children horizontally */
            align-items: center; /* Align items vertically in the center */
            gap: 20px; /* Space between each child element */
            margin: auto; /* Center the container */
            max-width: 80%; /* Maximum width of the container */
            flex-wrap: wrap; /* Allow items to wrap in smaller screens */
            justify-content: center; /* Center items when wrapped */
            margin-bottom: 50px;
        }
        .formst {
            display: flex;
            flex-direction: column; /* Stack input fields vertically */
            gap: 10px; /* Space between input fields */
        }
        button {
            height: fit-content; /* Adjust height to content */
            align-self: center; /* Center align the button if needed */
        }
    </style>
    <script>
        function createAndDownloadFile() {
            const d1 = document.getElementById('d1').value;
            const d2 = document.getElementById('d2').value;
            const d3 = document.getElementById('d3').value;
            const d4 = document.getElementById('d4').value;
            const d5 = document.getElementById('d5').value;
            const d6 = document.getElementById('d6').value;
            fetch('/create-and-download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({d1: d1, d2: d2, d3: d3, d4: d4, d5: d5, d6: d6}),
            })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'parametrized_deck.js';
                document.body.appendChild(a); // Append the anchor to body
                a.click(); // Simulate click to download file
                document.body.removeChild(a); // Clean up
                window.URL.revokeObjectURL(url); // Free up resources
            })
            .catch(error => console.error('Error:', error));
            return false; // Prevent the default form submission
        }
        function createAndDownloadFile2() {
            const d1 = document.getElementById('d1').value;
            const d2 = document.getElementById('d2').value;
            const d3 = document.getElementById('d3').value;
            const d4 = document.getElementById('d4').value;
            const d5 = document.getElementById('d5').value;
            const d6 = document.getElementById('d6').value;
            fetch('/create-and-download-base', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({d1: d1, d2: d2, d3: d3, d4: d4, d5: d5, d6: d6}),
            })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'parametrized_base.js';
                document.body.appendChild(a); // Append the anchor to body
                a.click(); // Simulate click to download file
                document.body.removeChild(a); // Clean up
                window.URL.revokeObjectURL(url); // Free up resources
            })
            .catch(error => console.error('Error:', error));
            return false; // Prevent the default form submission
        }
    </script>
</head>
<body>
    <h1> Box Girder Bridge Generator</h1>   
    <img src="/static/bg4.png" alt="Tree Image">
    <p>Enter dimensions:</p>
    <div class="container">
        <div class="formst">
            <input type="text" id="d1" placeholder="Enter d1 (meters)">
            <input type="text" id="d2" placeholder="Enter d2">
            <input type="text" id="d3" placeholder="Enter d3">
        </div>
        <div class="formst">
            <input type="text" id="d4" placeholder="Enter d4">
            <input type="text" id="d5" placeholder="Enter d5">
            <input type="text" id="d6" placeholder="Enter d6">
        </div>
        <div class= "formst">
        <button onclick="createAndDownloadFile()"> Download Deck File </button>
        <button onclick="createAndDownloadFile2()"> Download Base File </button>
        </div>
    </div>
</body>
</html>
'''

@app.route('/', methods=['GET'])
def index():
    return HTML_TEMPLATE

deck_params = '''
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
  p.Ln5 = Line(0.00000000, -0.8*d32, 0.00000000, 0.8*d32);
  p.Ln6 = Line(0.00000000, 0.8*d32, 0.00000000 + 1, d32);

  //p.Ln7 = Line(0.00000000 + 1, -d32, 0.00000000 + 1, d32); // base of the deck (d3) 10 should be replaced by d3/2
  p.Ln8 = Line(0.00000000 + 1, d32, d4 + 1, d32); // lower side of the deck (d4). 5 should be replaced by d4
  p.Ln9 = Line(d4 + 1, d32, d2 - d5 + 1, d12);  // side underbelly of deck. 20 should be replaced by d1/2
  p.Ln10 = Line(d2 - d5 + 1, d12, d2 + 1, d12); // d5. 10 should be replaced by 5 + d5 or d4 + d5
  p.Ln11 = Line(d2 + 1, d12, d2 + 1, -d12); // 20 should be replaced by d1/2. 10 should be replaced by d4 + d5
  p.Ln12 = Line(d2 + 1, -d12, d2 - d5 + 1, -d12); // 20 should be replaced by d1/2 and 10 should be replaced by d4+d5 and 5 by d4 
  p.Ln13 = Line(d2 - d5 + 1, -d12, d4 + 1, -d32); // second y-coord should be d3/2 and 5 should be replaced by d4
  p.Ln14 = Line(d4 + 1, -d32, 0.00000000 + 1, -d32); // 
  p.Ln4 = Line(0.00000000 + 1, -d32, 0.00000000, -0.8*d32); // 
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
var ext1 = agb.Extrude(agc.Add, ps1.Sk2, agc.DirNormal, agc.ExtentFixed, d6, agc.ExtentFixed, 0.0, agc.No, 0.0, 0.0);

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
'''

base_params = '''
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
  p.Ln15 = Line(-0.8*d32, 0.00000000, 0.8*d32, 0.00000000);
  p.Ln16 = Line(0.8*d32, 0.00000000, 0.8*d32, 2.00000000);
  p.Ln17 = Line(0.8*d32, 2.00000000, -0.8*d32, 2.00000000);
  p.Ln18 = Line(-0.8*d32, 2.00000000, -0.8*d32, 0.00000000);

  p.Ln19 = Line(0.8*d32, d64, -0.8*d32, d64);
  p.Ln20 = Line(-0.8*d32, d64, -0.8*d32, d64 + 2);
  p.Ln21 = Line(-0.8*d32, d64 + 2, 0.8*d32, d64 + 2);
  p.Ln22 = Line(0.8*d32, d64 + 2, 0.8*d32, d64);

  p.Ln39 = Line(0.8*d32, 2*d64, -0.8*d32, 2*d64);
  p.Ln40 = Line(-0.8*d32, 2*d64, -0.8*d32, 2*d64 + 2);
  p.Ln41 = Line(-0.8*d32, 2*d64 + 2, 0.8*d32, 2*d64 + 2);
  p.Ln42 = Line( 0.8*d32, 2*d64 + 2,  0.8*d32, 2*d64);

  p.Ln43 = Line(0.8*d32, 3*d64, -0.8*d32, 3*d64);
  p.Ln44 = Line(-0.8*d32, 3*d64, -0.8*d32, 3*d64 + 2);
  p.Ln45 = Line(-0.8*d32, 3*d64 + 2, 0.8*d32, 3*d64 + 2);
  p.Ln46 = Line( 0.8*d32, 3*d64 + 2,  0.8*d32, 3*d64);

  p.Ln47 = Line(0.8*d32,  4*d64 - 2, -0.8*d32, 4*d64 - 2);
  p.Ln48 = Line(-0.8*d32, 4*d64 - 2, -0.8*d32, 4*d64);
  p.Ln49 = Line(-0.8*d32, 4*d64, 0.8*d32, 4*d64);
  p.Ln50 = Line( 0.8*d32, 4*d64,  0.8*d32, 4*d64 - 2);

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
'''


@app.route('/create-and-download', methods=['POST'])
def create_and_download():
    data = request.get_json()  # Get data sent via AJAX
    
    d1 = float(data['d1'])
    d2 = float(data['d2'])
    d3 = float(data['d3'])
    d4 = float(data['d4'])
    d5 = float(data['d5'])
    d6 = float(data['d6'])

    d12 = str(d1/2)
    d32 = str(d3/2)
    d1 = str(d1)
    d2 = str(d2)
    d3 = str(d3)
    d4 = str(d4)
    d5 = str(d5)
    d6 = str(d6)

    txt = deck_params.replace("d12",d12)
    txt = txt.replace("d32", d32)
    txt = txt.replace("d1", d1)
    txt = txt.replace("d2", d2)
    txt = txt.replace("d3", d3)
    txt = txt.replace("d4", d4)
    txt = txt.replace("d5", d5)
    txt = txt.replace("d6", d6)

    with open('hello.js', 'w') as f:
        f.write(f'{txt}')
    
    return send_file('hello.js', as_attachment=True, download_name='hello.js')


@app.route('/create-and-download-base', methods=['POST'])
def create_and_download_base():
    data = request.get_json()  # Get data sent via AJAX
    
    d1 = float(data['d1'])
    d2 = float(data['d2'])
    d3 = float(data['d3'])
    d4 = float(data['d4'])
    d5 = float(data['d5'])
    d6 = float(data['d6'])

    d64= str(d6/4)
    d32 = str(d3/2)
    d1 = str(d1)
    d2 = str(d2)
    d3 = str(d3)
    d4 = str(d4)
    d5 = str(d5)
    d6 = str(d6)

    txt = base_params.replace("d32",d32)
    txt = txt.replace("d64", d64)

    with open('hellob.js', 'w') as f:
        f.write(f'{txt}')
    
    return send_file('hellob.js', as_attachment=True, download_name='hellob.js')

if __name__ == '__main__':
    app.run(debug=True)