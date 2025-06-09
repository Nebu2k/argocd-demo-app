# ArgoCD GitOps Demo - Sofortiger Test

## 🚀 Schnellstart ohne Docker

### 1. Einfache nginx-basierte Demo verwenden

Die Demo App verwendet jetzt nginx:alpine mit einer konfigurierbaren HTML-Seite über eine ConfigMap.

### 2. Lokales Repository zu GitHub pushen

```bash
cd /Users/speters/argocd-demo-app

# Neue Dateien hinzufügen
git add .
git commit -m "Add nginx-based demo version"

# Repository zu GitHub pushen (ersetzen Sie IHR-USERNAME)
git remote add origin https://github.com/IHR-USERNAME/argocd-demo-app.git
git push -u origin main
```

### 3. ArgoCD Application deployen

```bash
# Demo App in ArgoCD deployen
cd /Users/speters/workspace
kubectl apply -f argocd-apps/demo-app.yaml
```

### 4. DNS konfigurieren

Fügen Sie einen DNS A-Record hinzu:
```
demo.elmstreet79.de A 74.220.26.244
```

### 5. GitOps testen

1. **Deployment Status überprüfen:**
```bash
kubectl get applications -n argocd
kubectl get pods -n demo-app
kubectl get ingress -n demo-app
```

2. **App im Browser öffnen:**
   - URL: https://demo.elmstreet79.de (nach DNS Setup)
   - Oder Port-Forward: `kubectl port-forward svc/demo-app-service 8080:80 -n demo-app`

3. **GitOps Test - Änderung machen:**
```bash
# HTML Inhalt in ConfigMap ändern
sed -i '' 's/GitOps in Action!/GitOps Update Test - $(date)!/' k8s/configmap.yaml

# Committen und pushen
git add .
git commit -m "Test GitOps update - $(date)"
git push

# ArgoCD wird die Änderung automatisch erkennen und deployen!
```

### 6. ArgoCD UI beobachten

Schauen Sie in der ArgoCD UI (https://argocd.elmstreet79.de) wie die Synchronisation automatisch abläuft:
- Settings > Applications > demo-app
- Sync Status: OutOfSync → Synced
- Health Status: Progressing → Healthy

**Das ist GitOps in Aktion! 🎉**
