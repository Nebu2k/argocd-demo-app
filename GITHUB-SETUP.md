# 🚀 GitHub Setup für ArgoCD Demo App

## Schritte zum Erstellen eines GitHub Repositories:

### 1. GitHub Repository erstellen
1. Gehen Sie zu https://github.com/new
2. Repository Name: `argocd-demo-app`
3. Beschreibung: `Demo app for ArgoCD GitOps testing`
4. Visibility: Public (oder Private mit GitHub Token)
5. Klicken Sie "Create repository"

### 2. Lokales Repository mit GitHub verbinden
```bash
cd /Users/speters/argocd-demo-app

# GitHub Repository als remote hinzufügen (ersetzen Sie IHR-USERNAME)
git remote add origin https://github.com/IHR-USERNAME/argocd-demo-app.git

# Code zu GitHub pushen
git branch -M main
git push -u origin main
```

### 3. Docker Hub Setup (optional für Image Building)
1. Registrieren Sie sich bei https://hub.docker.com
2. Erstellen Sie ein Repository: `argocd-demo-app`
3. Login: `docker login`
4. Passen Sie `build-and-push.sh` mit Ihrem Username an

### 4. Image alternatives - Öffentliches Demo Image verwenden
Falls Sie kein Docker Hub Account haben, können Sie ein vorgefertigtes Image verwenden:

```bash
# In k8s/deployment.yaml ändern Sie die Image-Zeile zu:
image: nginx:alpine
# oder
image: httpd:alpine
```

### 5. ArgoCD Application aktualisieren
Nachdem das GitHub Repository erstellt wurde, updaten Sie `/Users/speters/workspace/argocd-apps/demo-app.yaml`:

```yaml
spec:
  source:
    repoURL: https://github.com/IHR-USERNAME/argocd-demo-app.git
    targetRevision: HEAD
    path: k8s
```

### 6. DNS Setup für Demo App
Fügen Sie einen DNS A-Record hinzu:
```
demo.elmstreet79.de A 74.220.26.244
```

**Dann können Sie die Demo App in ArgoCD deployen! 🎉**
