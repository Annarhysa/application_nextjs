from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'GET':
        return jsonify({"operation_code": 1}), 200
    elif request.method == 'POST':
        try:
            data = request.json.get('data', [])
            numbers = [item for item in data if item.isdigit()]
            alphabets = [item for item in data if item.isalpha()]
            highest_alphabet = max(alphabets, default='', key=str.upper)

            response = {
                "is_success": True,
                "user_id": "john_doe_17091999",
                "email": "john@xyz.com",
                "roll_number": "ABCD123",
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_alphabet": [highest_alphabet] if highest_alphabet else []
            }
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"is_success": False, "error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
