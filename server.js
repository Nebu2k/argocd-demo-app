const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// API endpoints
app.get('/api/info', (req, res) => {
  res.json({
    app: 'ArgoCD Demo App Test Dienstag',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname(),
    message: 'Hello from ArgoCD GitOps! 🚀'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ArgoCD Demo App Test - Multiplatform </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0; 
                padding: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .container {
                text-align: center;
                background: rgba(255,255,255,0.1);
                padding: 40px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                max-width: 600px;
            }
            h1 { margin-bottom: 20px; font-size: 2.5em; }
            .info-box {
                background: rgba(255,255,255,0.2);
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: left;
            }
            .btn {
                background: #4CAF50;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                margin: 10px;
                text-decoration: none;
                display: inline-block;
            }
            .btn:hover { background: #45a049; }
            #info { margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 ArgoCD Demo App</h1>
            <p><strong>GitOps in Action!</strong></p>
            <p>Diese App wird automatisch von ArgoCD synchronisiert, wenn Sie Änderungen in Git pushen.</p>
            
            <div class="info-box">
                <strong>Version:</strong> ${process.env.APP_VERSION || '1.0.0'}<br>
                <strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}<br>
                <strong>Hostname:</strong> ${require('os').hostname()}<br>
                <strong>Zeit:</strong> ${new Date().toLocaleString('de-DE')}
            </div>
            
            <button class="btn" onclick="loadInfo()">📊 App Info laden</button>
            <a href="/health" class="btn">💚 Health Check</a>
            
            <div id="info"></div>
        </div>
        
        <script>
            function loadInfo() {
                fetch('/api/info')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('info').innerHTML = 
                            '<div class="info-box"><pre>' + JSON.stringify(data, null, 2) + '</pre></div>';
                    });
            }
        </script>
    </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 ArgoCD Demo App running on port ${port}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔢 Version: ${process.env.APP_VERSION || '1.0.0'}`);
});
