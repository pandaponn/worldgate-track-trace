from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = getenv('SQLALCHEMY_DATABASE_URI', None)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Import(db.Model):
    __tablename__ = "import"
    
    import_ref_n = db.Column(db.Integer, primary_key=True, nullable=False)
    cust_id = db.Column(db.String, nullable=False)
    hbl_n = db.Column(db.String, nullable=False)

    def __init__(self, import_ref_n, cust_id, hbl_n):
        self.import_ref_n = import_ref_n
        self.cust_id = cust_id
        self.hbl_n = hbl_n

    def json(self):
        return {
            "import_ref_n": self.import_ref_n,
            "cust_id": self.cust_id,
            "hbl_n": self.hbl_n
        }

# Retrieve IMPORT_REF_N by House B/L
@app.route("/import/import_ref_n", methods=['POST'])
def get_import_ref_n():
    data = request.get_json()
    house_bl = data["house_bl"]
    import_ref_n = Import.query.filter_by(hbl_n=house_bl).first().import_ref_n
    
    if import_ref_n:
        return jsonify(
                {
                "code": 200,
                "data": {
                    "import_ref_n": import_ref_n
                    }
                }
            ), 200

    return jsonify(
        {
            "code": 500,
            "message": "Failed to retrieve import_ref_n"
        }
    ), 500

if __name__ == "__main__":
    app.run(port=8085, debug=True)