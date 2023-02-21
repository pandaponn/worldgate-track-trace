from flask import Flask, jsonify, request
import requests
import json
from flask_sqlalchemy import SQLAlchemy
from invokes import invoke_http
from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = getenv('SQLALCHEMY_DATABASE_URI', None)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Service Classes
IMPORT_URL = "http://core_import:5003"
IMPORT_CONT_URL = "http://core_import_cont:5004"

EXPORT_URL = "http://core_export:5006"
EXPORT_CONT_URL = "http://core_export_cont:5007"


@app.route("/getExportContainerNum", methods=['POST'])
def getExportContainerNum():

    data = request.get_json()
    wguser_id = data['wguser_id']

    data = {
                "wguser_id" : wguser_id
            }

    export_ref_num_response = invoke_http(EXPORT_URL + "/export/export_ref_n/wguser_id", method="POST", json=data)
    export_ref_num_dumped = json.dumps(export_ref_num_response)
    export_ref_num_loads = json.loads(export_ref_num_dumped)
    retrieved_output_from_export = export_ref_num_loads['data']['output']

    for a_record in retrieved_output_from_export:
        single_export_ref_num = a_record['export_ref_n']

        data = {
                    "export_ref_n" : single_export_ref_num
                }

        container_num_response = invoke_http(EXPORT_CONT_URL + "/export_cont/container_num", method="POST", json=data)
        container_num_response_dumped = json.dumps(container_num_response)
        container_num_response_loads = json.loads(container_num_response_dumped)
        retrieved_list_containerNum_output = container_num_response_loads['data']['container_nums']

        if retrieved_list_containerNum_output:
            retrieved_tuple_containerNum_output = tuple(retrieved_list_containerNum_output)
            a_record["container_numbers"] = retrieved_tuple_containerNum_output
            a_record["type"] = "Export"

    return retrieved_output_from_export



@app.route("/getImportContainerNum", methods=['POST'])
def getImportContainerNum():

    data = request.get_json()
    wguser_id = data['wguser_id']

    data = {
                "wguser_id" : wguser_id
            }

    import_ref_num_response = invoke_http(IMPORT_URL + "/import/import_ref_n/wguser_id", method="POST", json=data)
    import_ref_num_dumped = json.dumps(import_ref_num_response)
    import_ref_num_response_loads = json.loads(import_ref_num_dumped)
    retrieved_output_from_import = import_ref_num_response_loads['data']['output']

    for a_record in retrieved_output_from_import:
        single_import_ref_num = a_record['import_ref_n']

        data = {
                    "import_ref_n" : single_import_ref_num
                }

        container_num_response = invoke_http(IMPORT_CONT_URL + "/import_cont/container_num", method="POST", json=data)
        container_num_response_dumped = json.dumps(container_num_response)
        container_num_response_loads = json.loads(container_num_response_dumped)
        retrieved_list_containerNum_output = container_num_response_loads['data']['container_nums']

        if retrieved_list_containerNum_output:
            retrieved_tuple_containerNum_output = tuple(retrieved_list_containerNum_output)
            a_record["container_numbers"] = retrieved_tuple_containerNum_output
            a_record["type"] = "Import"

    return retrieved_output_from_import

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5010, debug=True)
    # app.run(host='0.0.0.0', debug=True)



# ExportContainerNum API Endpoint

# http://127.0.0.1:5010/getExportContainerNum

# ExportContainerNum Sample JSON request

# {
#     "wguser_id" : "bk666dcoeZTH3dxZCuu4FR"
# }

# ExportContainerNum Sample JSON Response

# [
#     {
#         "container_numbers": [
#             "HLXU5027876",
#             "HLXU2139717",
#             "HLCU4187010",
#             "HLCU2231582",
#             "HLCU2258177",
#             "HLXU3075047",
#             "HLCU2100704"
#         ],
#         "delivery_date": "Tue, 01 Jun 2021 00:00:00 GMT",
#         "destination_port": "KARACHI",
#         "export_ref_n": 17612
#     },
#     {
#         "container_numbers": [
#             "GESU4205066",
#             "HDMU6127648",
#             "TGHU7584650"
#         ],
#         "delivery_date": "Sat, 07 Nov 2020 00:00:00 GMT",
#         "destination_port": "MUMBAI,INDIA",
#         "export_ref_n": 17625
#     },
#     {
#         "container_numbers": [
#             "COPU5223250",
#             "COPU4226315"
#         ],
#         "delivery_date": "Tue, 05 Sep 2017 00:00:00 GMT",
#         "destination_port": "CHITTAGONG",
#         "export_ref_n": 17595
#     },
#     {
#         "container_numbers": [
#             "DNAU2559042",
#             "DNAU2514140",
#             "DNAU2517113",
#             "DNAU2334827",
#             "DNAU2404837",
#             "DNAU2528566"
#         ],
#         "delivery_date": "Sat, 27 May 2017 00:00:00 GMT",
#         "destination_port": "HAMBURG",
#         "export_ref_n": 17648
#     },
#     {
#         "container_numbers": [
#             "COKU0020043",
#             "XTRU2060428",
#             "UXXU2229503"
#         ],
#         "delivery_date": "Sat, 12 Jun 2010 00:00:00 GMT",
#         "destination_port": "CHIASSO CY",
#         "export_ref_n": 17581
#     },
#     {
#         "container_numbers": [
#             "EMCU 3424530",
#             "IPXU 3371140",
#             "FSCU 7532318",
#             "FSCU 7840795"
#         ],
#         "delivery_date": "Thu, 19 Nov 2009 00:00:00 GMT",
#         "destination_port": "BANGKOK PORT, *",
#         "export_ref_n": 17633
#     },
#     {
#         "container_numbers": [
#             "REGU4985177",
#             "REGU4995920",
#             "REGU4991740",
#             "REGU4205368",
#             "TEXU7407574",
#             "CRXU4483116",
#             "TEXU7099492",
#             "REGU4982408"
#         ],
#         "delivery_date": "Fri, 23 Sep 2005 00:00:00 GMT",
#         "destination_port": "CHIASSO CY",
#         "export_ref_n": 17587
#     },
#     {
#         "container_numbers": [
#             "YMLU 4947640",
#             "YMLU 4494327",
#             "YMLU 4933266"
#         ],
#         "delivery_date": "Sat, 08 May 1999 00:00:00 GMT",
#         "destination_port": "NHAVA SHEVA",
#         "export_ref_n": 17549
#     },
#     {
#         "container_numbers": [
#             "CLHU3395117",
#             "ZCSU8202585",
#             "GLDU7038020"
#         ],
#         "delivery_date": "Mon, 22 Sep 1997 00:00:00 GMT",
#         "destination_port": "NHAVA SHEVA",
#         "export_ref_n": 17609
#     }
# ]
