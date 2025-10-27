import os
import json
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/", methods=['GET'])
def hello():
    """
    A simple "Hello World" endpoint that also shows some
    Cloud Run environment variables.
    """
    service = os.environ.get("K_SERVICE", "Unknown service")
    revision = os.environ.get("K_REVISION", "Unknown revision")
    return f"Hello from Cloud Run! Service: {service}, Revision: {revision}"


@app.route("/inventory", methods=['GET'])
def get_inventory():
    """
    Reads and returns the inventory data from inventory.json.
    """
    try:
        with open('inventory.json', 'r') as f:
            inventory_data = json.load(f)
        return jsonify(inventory_data)
    except FileNotFoundError:
        return jsonify({"error": "Inventory data not found."}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse inventory data."}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
