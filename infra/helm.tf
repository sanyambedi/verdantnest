# ---------- Kubernetes & Helm Providers ----------

provider "kubernetes" {
  host                   = aws_eks_cluster.main.endpoint
  cluster_ca_certificate = base64decode(aws_eks_cluster.main.certificate_authority[0].data)
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", aws_eks_cluster.main.name, "--region", var.aws_region]
  }
}

provider "helm" {
  kubernetes {
    host                   = aws_eks_cluster.main.endpoint
    cluster_ca_certificate = base64decode(aws_eks_cluster.main.certificate_authority[0].data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", aws_eks_cluster.main.name, "--region", var.aws_region]
    }
  }
}

# ---------- ArgoCD ----------
resource "helm_release" "argocd" {
  name                       = "argocd"
  repository                 = "https://argoproj.github.io/argo-helm"
  chart                      = "argo-cd"
  namespace                  = "argocd"
  create_namespace           = true
  version                    = "5.51.6"
  timeout                    = 900
  wait                       = false
  disable_openapi_validation = true

  set {
    name  = "server.service.type"
    value = "LoadBalancer"
  }

  depends_on = [
    aws_eks_node_group.main
  ]
}

# ---------- Prometheus + Grafana ----------
resource "helm_release" "monitoring" {
  name                       = "monitoring"
  repository                 = "https://prometheus-community.github.io/helm-charts"
  chart                      = "kube-prometheus-stack"
  namespace                  = "monitoring"
  create_namespace           = true
  version                    = "55.5.0"
  timeout                    = 300
  wait                       = false
  replace                    = true
  force_update               = true
  disable_openapi_validation = true

  set {
    name  = "grafana.adminPassword"
    value = "VerdantNest2024!"
  }

  # Disable heavy admission webhooks and alertmanager to bypass pre-install hook timeouts
  set {
    name  = "prometheusOperator.admissionWebhooks.enabled"
    value = "false"
  }

  set {
    name  = "prometheusOperator.tls.enabled"
    value = "false"
  }

  set {
    name  = "alertmanager.enabled"
    value = "false"
  }

  depends_on = [
    aws_eks_node_group.main
  ]
}
