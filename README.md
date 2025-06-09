# ArgoCD Demo App 🚀

Eine vollständige Node.js Web-Anwendung zur Demonstration von GitOps mit ArgoCD, inklusive automatisierter CI/CD Pipeline mit GitHub Actions.

## 📋 Übersicht

Diese App demonstriert einen modernen GitOps-Workflow:

- ✅ **Automatische Builds** mit GitHub Actions
- ✅ **Docker Multi-Platform Images** (amd64/arm64)
- ✅ **Zero-Downtime Deployments** mit Kubernetes
- ✅ **Automatische Synchronisation** durch ArgoCD
- ✅ **Security Best Practices** (Non-root Container, Health Checks)
- ✅ **Responsive Web UI** mit Real-time API

## 🛠️ Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/Nebu2k/argocd-demo-app.git
cd argocd-demo-app

# Dependencies installieren
npm install

# App lokal starten (Development Mode)
npm run dev

# App in Produktion starten
npm start
```

Die App läuft auf <http://localhost:3000>

### 🌐 Verfügbare Endpoints

- **`/`** - Responsive Web Interface mit Live-Updates
- **`/health`** - Kubernetes Health Check Endpoint
- **`/api/info`** - System-Informationen (JSON API)

## 🐳 Docker Container

### Lokaler Build & Test

```bash
# Image bauen (Multi-Platform Support)
docker build -t argocd-demo-app:latest .

# Container lokal testen
docker run -p 3000:3000 argocd-demo-app:latest

# Health Check testen
curl http://localhost:3000/health
```

### Container Features

- **Base Image:** Node.js 20 Alpine (optimiert für Größe)
- **Security:** Non-root User (nodejs:1001)
- **Health Checks:** Automatische Gesundheitsprüfung
- **Multi-Platform:** AMD64 + ARM64 Support
- **Production Ready:** Optimiert für Kubernetes

## 🚀 Automatisierte CI/CD Pipeline

### GitHub Actions Workflow

Die Pipeline wird automatisch getriggert bei:

- Push auf `main` Branch
- Änderungen an: `server.js`, `package.json`, `Dockerfile`, `public/**`
- Manueller Trigger über GitHub UI

```bash
# Manuelle Versionierung
gh workflow run "Build and Deploy" -f version=v2.0.0
```

### Pipeline Schritte

1. **Code Checkout** - Repository auschecken
2. **Docker Build** - Multi-Platform Image erstellen
3. **Registry Push** - Upload zu Docker Hub
4. **K8s Update** - Deployment Manifest aktualisieren
5. **Git Commit** - Automatischer Commit der Änderungen
6. **ArgoCD Sync** - Automatische Erkennung & Deployment

## 📦 Kubernetes Deployment

### Voraussetzungen

- Kubernetes Cluster (1.19+)
- ArgoCD installiert
- Ingress Controller (nginx/traefik)
- cert-manager (für SSL)

### Deployment Struktur

k8s/
├── namespace.yaml     # Isolierte demo-app Namespace
├── deployment.yaml    # App Deployment (2 Replicas)
├── service.yaml       # ClusterIP Service
└── ingress.yaml      # TLS Ingress mit cert-manager

### Manuelle Deployment (optional)

```bash
# Namespace erstellen
kubectl apply -f k8s/namespace.yaml

# App deployen
kubectl apply -f k8s/

# Status prüfen
kubectl get pods -n demo-app
kubectl get ingress -n demo-app
```

## ⚙️ ArgoCD Setup

### 1. Application erstellen

```yaml
# Via ArgoCD UI oder YAML:
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: demo-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/Nebu2k/argocd-demo-app.git
    targetRevision: main
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: demo-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

### 2. Via ArgoCD CLI

```bash
argocd app create demo-app \
  --repo https://github.com/Nebu2k/argocd-demo-app.git \
  --path k8s \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace demo-app \
  --sync-policy automated
```

## 🔄 GitOps Workflow in Aktion

### Automatischer Workflow

1. **Code ändern** → `server.js` modifizieren
2. **Git Push** → `git push origin main`
3. **GitHub Action** → Automatischer Build & Push
4. **ArgoCD Sync** → Deployment auf Cluster
5. **Rolling Update** → Zero-Downtime Update

### Beispiel: Version Update

```bash
# 1. Code ändern
echo "console.log('New feature!');" >> server.js

# 2. Commit & Push
git add .
git commit -m "feat: Add new feature"
git push origin main

# 3. GitHub Action läuft automatisch
# 4. ArgoCD erkennt Änderungen automatisch
# 5. Rolling Update ohne Downtime
```

## 📊 Monitoring & Features

### Health Monitoring

```bash
# Kubernetes Health Probes
kubectl describe pod -n demo-app

# Manual Health Check
curl https://demo.elmstreet79.de/health
```

### App Features

- 🔍 **Health Checks** - Kubernetes Liveness/Readiness
- 📡 **API Endpoints** - RESTful JSON API
- 🎨 **Responsive UI** - Mobile-optimierte Web-Oberfläche
- 📈 **Real-time Updates** - Live System-Informationen
- 🔄 **Rolling Updates** - Zero-Downtime Deployments
- 🔒 **SSL/TLS** - Automatische Zertifikate mit cert-manager

### Performance

- **Startup Zeit:** < 5 Sekunden
- **Memory Usage:** ~50MB
- **Image Size:** ~150MB (Alpine-basiert)
- **Response Time:** < 100ms

## 🛡️ Security Features

- **Non-root Container** - Läuft als User `nodejs:1001`
- **Read-only Filesystem** - Minimierte Angriffsfläche
- **Resource Limits** - CPU/Memory Beschränkungen
- **Network Policies** - Isolierte Namespace-Kommunikation
- **TLS Encryption** - Automatische SSL-Zertifikate

## 🔧 Konfiguration

### Environment Variables

```bash
NODE_ENV=production     # Produktions-Modus
PORT=3000              # Server Port
APP_VERSION=auto       # Automatische Versionierung
```

### Docker Build Args

```bash
docker build \
  --build-arg NODE_ENV=production \
  --build-arg APP_VERSION=v2.0.0 \
  -t argocd-demo-app:v2.0.0 .
```

## 🚨 Troubleshooting

### Häufige Probleme

**GitHub Actions Fehler:**

```bash
# Permissions prüfen
# Repository → Settings → Actions → General
# ✅ "Read and write permissions" aktivieren
```

**Docker Build Fehler:**

```bash
# Cache leeren
docker system prune -a

# Neue Multi-Platform Build
docker buildx build --platform linux/amd64,linux/arm64 .
```

**ArgoCD Sync Probleme:**

```bash
# Manual Sync
argocd app sync demo-app

# App Status prüfen
argocd app get demo-app
```

## 📈 Roadmap

- [ ] **Prometheus Metrics** - Custom App Metrics
- [ ] **Grafana Dashboard** - Visualisierung
- [ ] **Helm Charts** - Templating Support
- [ ] **Multi-Environment** - Dev/Staging/Prod
- [ ] **Blue/Green Deployment** - Advanced Deployment Strategies

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen: `git checkout -b feature/amazing-feature`
3. Änderungen committen: `git commit -m 'Add amazing feature'`
4. Branch pushen: `git push origin feature/amazing-feature`
5. Pull Request erstellen

## 📄 License

Dieses Projekt steht unter der MIT License - siehe [LICENSE](LICENSE) file für Details.

## 🎯 Live Demo

**Demo URL:** <https://demo.elmstreet79.de>
**Status:** ![Build Status](https://github.com/Nebu2k/argocd-demo-app/workflows/Build%20and%20Deploy/badge.svg)

---

**GitOps in Action! 🚀** - Jede Änderung in Git wird automatisch auf den Kubernetes Cluster deployed.
