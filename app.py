from flask import Flask, render_template, request, jsonify
from data import CONSOLES

app = Flask(__name__)

@app.route("/")
def index():
    console_names = list(CONSOLES.keys())
    return render_template("index.html", consoles=console_names)

@app.route("/get_models", methods=["POST"])
def get_models():
    console = request.json.get("console")

    if console not in CONSOLES:
        return jsonify({"models": []})

    models = list(CONSOLES[console].keys())
    return jsonify({"models": models})

@app.route("/get_hacks", methods=["POST"])
def get_hacks():
    console = request.json.get("console")
    model = request.json.get("model")

    if console not in CONSOLES:
        return jsonify({"hacks": []})

    if model not in CONSOLES[console]:
        return jsonify({"hacks": []})

    hacks = CONSOLES[console][model]
    return jsonify({"hacks": hacks})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
