from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("FINANCIAL_API_KEY")
BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=VKJJxD6xhFjEbAi1sttsUgQbrWZNbxr6"

@app.route('/api/income-statement', methods=['GET'])
def get_income_statement():
    try:
        response = requests.get(f"{BASE_URL}?limit=10&apikey={API_KEY}")
        data = response.json()

        # Filtering logic
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        min_revenue = request.args.get('min_revenue', type=float)
        max_revenue = request.args.get('max_revenue', type=float)
        min_income = request.args.get('min_income', type=float)
        max_income = request.args.get('max_income', type=float)

        filtered_data = []
        for item in data:
            if start_date and item['date'] < start_date:
                continue
            if end_date and item['date'] > end_date:
                continue
            if min_revenue and item['revenue'] < min_revenue:
                continue
            if max_revenue and item['revenue'] > max_revenue:
                continue
            if min_income and item['netIncome'] < min_income:
                continue
            if max_income and item['netIncome'] > max_income:
                continue
            filtered_data.append(item)

        return jsonify(filtered_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)