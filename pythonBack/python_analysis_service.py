# python-service/python_analysis_service.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import ast

app = Flask(__name__)
CORS(app)

def analyze_python_code(code):
    try:
        tree = ast.parse(code)
        
        metrics = {
            'total_lines': len(code.split('\n')),
            'total_functions': sum(1 for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)),
            'total_classes': sum(1 for node in ast.walk(tree) if isinstance(node, ast.ClassDef)),
            'total_imports': sum(1 for node in ast.walk(tree) if isinstance(node, (ast.Import, ast.ImportFrom))),
            'total_variables': sum(1 for node in ast.walk(tree) if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store)),
            'total_loops': sum(1 for node in ast.walk(tree) if isinstance(node, (ast.For, ast.While))),
            'total_conditionals': sum(1 for node in ast.walk(tree) if isinstance(node, ast.If)),
        }
        
        return {'success': True, 'metrics': metrics}
    except SyntaxError as e:
        return {'success': False, 'message': f"Syntax error: {str(e)}"}
    except Exception as e:
        return {'success': False, 'message': f"Error analyzing code: {str(e)}"}

@app.route('/analyze', methods=['POST'])
def analyze():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': "No code provided"}), 400
    
    result = analyze_python_code(code)
    if result['success']:
        return jsonify({'message': "Code analyzed successfully", 'metrics': result['metrics']})
    else:
        return jsonify(result), 500

if __name__ == '__main__':
    app.run(port=3002)