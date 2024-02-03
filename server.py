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
            margin-top: 6%;
        }
        h1 {
            margin-top: 4%;
            font-size: 50px;
            font-family: "Open Sans";
        }
        input[type="text"] {
            color: black;
        }
        </style>
    </head>
        <body>
            <h1> Box Girder Bridge Generator</h1>
            <img src="/static/bg3.png" alt="Tree Image">
            <p>Enter the dimensions of the bridge and download the file:</p>
            <form onsubmit="return downloadFile()">
                <input type="text" name="user_text" placeholder="Your text here" />
                <button type="submit">Create and Download File</button>
            </form>
        </body>
    </html>
'''

@app.route('/', methods=['GET'])
def index():
    return HTML_TEMPLATE

@app.route('/create-file', methods=['POST'])
def create_file():
    user_text = request.form['user_text']
    # Create the file and append the user-provided text
    with open('hello.txt', 'w') as f:
        f.write(f'Hello, world! {user_text}')
    
    # Redirect to the download route
    return '''
        <html>
            <head>
                <style>
                    body {
                        background-color: black;
                        color: white;
                        font-family: Arial, sans-serif;
                    }
                    input[type="text"] {
                        color: black;
                    }
                </style>
            </head>
            <body>
                <p>File created successfully! Click the button to download:</p>
                <form action="/download">
                    <input type="submit" value="Download">
                </form>
            </body>
        </html>
    '''

@app.route('/download')
def download_file():
    path = "hello.txt"
    return send_file(path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)