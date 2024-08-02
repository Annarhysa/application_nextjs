from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request
            data = request.get_json(force=True)
            if not data:
                return jsonify({"is_success": False, "error": "No JSON data provided"}), 400

            # Combine user_id and dob
            user_id = data.get("user_id")
            dob = data.get("dob")
            combined_user_id = f"{user_id}_{dob}"

            # Process the data array
            data_array = data.get("data", [])
            numbers = [str(x) for x in data_array if isinstance(x, int)]
            alphabets = [x for x in data_array if isinstance(x, str) and x.isalpha()]
            highest_alphabet = [max(alphabets, key=lambda s: s.upper(), default="")]

            # Prepare the response
            response = {
                "is_success": True,
                "user_id": combined_user_id,
                "email": data.get("email"),
                "roll_number": data.get("roll_number"),
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_alphabet": highest_alphabet
            }

            return jsonify(response), 200

        except Exception as e:
            return jsonify({"is_success": False, "error": str(e)}), 400

    # Handle GET request if needed
    return "This is a GET request", 200


if __name__ == '__main__':
    app.run(debug=True)
