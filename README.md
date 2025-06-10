# ArgoCD Demo App 🚀

Eine vollständige Node.js Web-Anwendung zur Demonstration von GitOps mit ArgoCD, inklusive automatisierter CI/CD Pipeline mit GitHub Actions und robuster Versionierung.

## 📋 Übersicht

Diese App demonstriert einen modernen GitOps-Workflow:

- ✅ **Automatische Builds** mit GitHub Actions
- ✅ **Intelligente Versionierung** (Datum + Git-Hash Format)
- ✅ **Docker Multi-Platform Images** (amd64/arm64)
- ✅ **Zero-Downtime Deployments** mit Kubernetes
- ✅ **Automatische Synchronisation** durch ArgoCD
- ✅ **Security Best Practices** (Non-root Container, Health Checks)
- ✅ **Responsive Web UI** mit Real-time API
- ✅ **Robuste Change Detection** für selektive Builds

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
- Änderungen an: `server.js`, `package.json`, `Dockerfile`, `public/**`, `k8s/**`
- Manueller Trigger über GitHub UI

**Intelligente Change Detection:**
- **Code-Änderungen** → Docker Build + K8s Update
- **K8s-Only Änderungen** → Nur Notification (kein Build)
- **Robuste Versionierung** → Funktioniert auch bei ersten Commits

```bash
# Manuelle Versionierung mit spezifischer Version
gh workflow run "Build and Deploy" -f version=v2.0.0

# Automatische Versionierung (Standard)
# Format: v20250610-abc1234 (Datum + Git-Hash)
```

### Pipeline Features

1. **Smart Change Detection** - Erkennt Code vs. K8s Änderungen
2. **Automatische Versionierung** - Datum + Git-Hash Format
3. **Docker Build** - Multi-Platform Image erstellen
4. **Registry Push** - Upload zu Docker Hub
5. **K8s Update** - Nur relevante Felder in deployment.yaml
6. **Git Commit** - Automatischer Commit der Image-Updates
7. **ArgoCD Sync** - Automatische Erkennung & Deployment

### Versionierungs-Schema

```bash
# Automatisch generiert:
v20250610-c4dffd7  # Format: vYYYYMMDD-{git-hash}

# Manuelle Eingabe:
v2.0.0             # Semantic Versioning
```

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
3. **Smart Detection** → Pipeline erkennt Art der Änderung
4. **GitHub Action** → Automatischer Build & Push (nur bei Code-Änderungen)
5. **K8s Update** → Deployment wird automatisch aktualisiert
6. **ArgoCD Sync** → Deployment auf Cluster
7. **Rolling Update** → Zero-Downtime Update

### Beispiel-Workflows

#### Code-Änderung (Vollständiger Build):
```bash
# 1. Feature entwickeln
echo "console.log('New feature!');" >> server.js

# 2. Commit & Push
git add .
git commit -m "feat: Add new feature"
git push origin main

# 3. Pipeline läuft automatisch:
# → Neue Version: v20250610-abc1234
# → Docker Build & Push
# → deployment.yaml Update
# → ArgoCD Sync
```

#### K8s-Only Änderung (Kein Build):
```bash
# 1. Kubernetes-Config ändern
kubectl edit deployment demo-app -n demo-app
# oder: vim k8s/deployment.yaml

# 2. Commit & Push
git add k8s/
git commit -m "config: Increase replica count"
git push origin main

# 3. Pipeline erkennt K8s-Only:
# → Kein Docker Build
# → Direkte ArgoCD Sync
```

### Versionierungs-Beispiele

| Trigger | Version | Beschreibung |
|---------|---------|-------------|
| Automatisch | `v20250610-c4dffd7` | Datum + Git-Hash |
| Manuell | `v2.0.0` | Semantic Versioning |
| Hotfix | `v20250610-hotfix` | Custom Tag |
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

**Pipeline Change Detection Fehler:**

```bash
# Bei ersten Commits kann HEAD~1 fehlen
# ✅ Pipeline ist jetzt robust gegen dieses Problem
# ✅ Automatischer Fallback auf git ls-files
```

## 🎯 Live Demo & Status

**Demo URL:** <https://demo.elmstreet79.de>

**Aktuelle Version:** `v20250610-c4dffd7` (automatisch generiert)

**Pipeline Status:** ![Build Status](https://github.com/Nebu2k/argocd-demo-app/workflows/Build%20and%20Deploy/badge.svg)

### Aktuelle Konfiguration

- **Namespace:** `demo-app`
- **Replicas:** 2 Pods
- **Image:** `nebu2k/argocd-demo-app:v20250610-c4dffd7`
- **Ingress:** TLS mit cert-manager (demo.elmstreet79.de)
- **Resources:** 50m CPU / 64Mi Memory (Request)
- **Health Checks:** Liveness + Readiness Probes

## 📈 Roadmap & Verbesserungen

### ✅ Bereits implementiert
- [x] **Automatische Versionierung** - Datum + Git-Hash Format
- [x] **Robuste Change Detection** - Code vs. K8s Änderungen
- [x] **Security Best Practices** - Non-root Container
- [x] **Health Checks** - Liveness + Readiness Probes
- [x] **TLS/SSL** - Automatische Zertifikate mit cert-manager
- [x] **Rolling Updates** - Zero-Downtime Deployments

### 🚧 In Planung
- [ ] **Prometheus Metrics** - Custom App Metrics
- [ ] **Grafana Dashboard** - Visualisierung
- [ ] **Helm Charts** - Templating Support
- [ ] **Multi-Environment** - Dev/Staging/Prod
- [ ] **Blue/Green Deployment** - Advanced Deployment Strategies
- [ ] **Kustomize Integration** - Environment-specific Overlays

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen: `git checkout -b feature/amazing-feature`
3. Änderungen committen: `git commit -m 'Add amazing feature'`
4. Branch pushen: `git push origin feature/amazing-feature`
5. Pull Request erstellen

## 📄 License

Dieses Projekt steht unter der MIT License - siehe [LICENSE](LICENSE) file für Details.

---

## 🎯 Quick Start Summary

```bash
# 1. Repository klonen
git clone https://github.com/Nebu2k/argocd-demo-app.git
cd argocd-demo-app

# 2. Lokal testen
npm install && npm start

# 3. Änderung machen
echo "// New feature" >> server.js

# 4. Deployen
git add . && git commit -m "feat: New feature" && git push

# 5. Automatisch deployed! 🚀
# Version: v20250610-abc1234
# URL: https://demo.elmstreet79.de
```

**GitOps in Action! 🚀** - Jede Änderung in Git wird automatisch auf den Kubernetes Cluster deployed.
