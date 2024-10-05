// vinuBack/index.js
const express = require('express');
const cors = require('cors');
const esprima = require('esprima');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const analyzeCode = (code) => {
    try {
        const ast = esprima.parseScript(code, { tolerant: true, comment: true });
        
        let metrics = {
            totalNodes: 0,
            totalFunctions: 0,
            totalVariables: 0,
            totalLines: code.split('\n').length,
            totalComments: 0,
            totalComplexity: 0,
        };

        const traverse = (node) => {
            if (node) {
                metrics.totalNodes++;
                
                if (node.type === 'FunctionDeclaration') {
                    metrics.totalFunctions++;
                }
                
                if (node.type === 'VariableDeclaration') {
                    metrics.totalVariables += node.declarations.length;
                }

                if (node.type === 'Comment') {
                    metrics.totalComments++;
                }

                if (node.type === 'IfStatement' || node.type === 'ForStatement' || node.type === 'WhileStatement') {
                    metrics.totalComplexity++;
                }
                
                for (let key in node) {
                    if (node[key] && typeof node[key] === 'object') {
                        if (Array.isArray(node[key])) {
                            node[key].forEach(traverse);
                        } else {
                            traverse(node[key]);
                        }
                    }
                }
            }
        };

        traverse(ast);

        return {
            success: true,
            metrics,
        };
    } catch (error) {
        console.error("Error analyzing code:", error);
        return {
            success: false,
            message: "Failed to analyze code",
            details: error.message,
        };
    }
};

app.post('/analyze', (req, res) => {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: "Invalid code input" });
    }

    const analysisResult = analyzeCode(code);

    if (!analysisResult.success) {
        return res.status(500).json(analysisResult);
    }

    return res.json({
        message: "Code analyzed successfully",
        metrics: analysisResult.metrics,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
