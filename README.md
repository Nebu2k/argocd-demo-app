# ArgoCD Demo App 🚀

Eine einfache Node.js Web-Anwendung zur Demonstration von GitOps mit ArgoCD.

## 📋 Übersicht

Diese App zeigt, wie automatische Deployments mit ArgoCD funktionieren:
- Änderungen in Git werden automatisch von ArgoCD erkannt
- Die App wird automatisch auf dem Kubernetes Cluster deployed
- Rolling Updates ohne Downtime

## 🛠️ Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# App lokal starten
npm run dev

# App in Produktion starten
npm start
```

Die App läuft auf http://localhost:3000

## 🐳 Docker Build

```bash
# Image bauen
docker build -t argocd-demo-app:v1.0.0 .

# Image testen
docker run -p 3000:3000 argocd-demo-app:v1.0.0
```

## 📦 Deployment

### Voraussetzungen
- Docker Hub Account
- Kubernetes Cluster mit ArgoCD
- Domain für Ingress

### Build & Push
```bash
# Image bauen und zu Docker Hub pushen
./build-and-push.sh v1.0.0
```

### ArgoCD Application
```bash
# In ArgoCD eine neue Application erstellen die auf dieses Repository zeigt
# Repository URL: https://github.com/IHR-USERNAME/argocd-demo-app.git
# Path: k8s/
# Destination: demo-app namespace
```

## 🔄 GitOps Workflow

1. **Code ändern** - Modifizieren Sie `server.js` oder andere Dateien
2. **Image bauen** - `./build-and-push.sh v1.1.0`
3. **Deployment updaten** - Image Version in `k8s/deployment.yaml` ändern
4. **Git commit & push** - ArgoCD erkennt Änderungen automatisch
5. **Automatisches Deployment** - ArgoCD synchronisiert den Cluster

## 📊 Features

- 🔍 Health Check Endpoint: `/health`
- 📡 Info API: `/api/info`
- 🎨 Responsive Web UI
- 📈 Resource Monitoring
- 🔄 Rolling Updates
- 🔒 SSL/TLS mit cert-manager

## 🌐 Endpoints

- `/` - Haupt-Web-Interface
- `/health` - Health Check für Kubernetes
- `/api/info` - App Informationen als JSON

## 📝 Konfiguration

### Environment Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server Port (default: 3000)
- `APP_VERSION` - App Version für Display

### Kubernetes Resources
- **Namespace:** demo-app
- **Deployment:** 2 Replicas mit Rolling Update
- **Service:** ClusterIP auf Port 80
- **Ingress:** HTTPS mit cert-manager

## 🔧 Anpassungen

### Domain ändern
Ersetzen Sie `demo.elmstreet79.de` in `k8s/ingress.yaml` mit Ihrer Domain.

### Docker Registry ändern
Ersetzen Sie `speters` in `k8s/deployment.yaml` und `build-and-push.sh` mit Ihrem Username.

### Version Updates
1. Neue Version in `build-and-push.sh` erstellen
2. Image Version in `k8s/deployment.yaml` anpassen
3. Git commit & push - ArgoCD macht den Rest!

## 🚀 Demo Szenarien

### 1. Einfache Änderung
```bash
# Text in server.js ändern
sed -i 's/Hello from ArgoCD GitOps!/Hello from Updated GitOps!/' server.js

# Neue Version erstellen
./build-and-push.sh v1.1.0

# Deployment updaten
sed -i 's|image: speters/argocd-demo-app:.*|image: speters/argocd-demo-app:v1.1.0|' k8s/deployment.yaml

# Committen
git add . && git commit -m "Update message and bump to v1.1.0" && git push
```

### 2. Replica Skalierung
```bash
# Replicas in deployment.yaml ändern
sed -i 's/replicas: 2/replicas: 3/' k8s/deployment.yaml

# Committen
git add . && git commit -m "Scale to 3 replicas" && git push
```

**ArgoCD wird alle Änderungen automatisch erkennen und anwenden! 🎉**
