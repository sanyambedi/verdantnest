<p align="center">
  <img src="https://img.icons8.com/fluency/96/cloud-lighting.png" alt="DevOps Cloud Logo" width="80" />
</p>

<h1 align="center">🚀 VerdantNest — Production-Grade GitOps & DevOps Infrastructure</h1>

<p align="center">
  <strong>Enterprise Kubernetes (AWS EKS) • Infrastructure as Code (Terraform) • Automated CI/CD (Jenkins) • GitOps (ArgoCD) • Observability (Prometheus & Grafana)</strong>
</p>

<p align="center">
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/AWS-EKS%20v1.29-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS EKS" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="Jenkins" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/ArgoCD-GitOps-EF6C00?style=for-the-badge&logo=argo&logoColor=white" alt="ArgoCD" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Grafana-Monitoring-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
</p>

<br />

---

## 📋 Project Summary & DevOps Highlights

This repository contains a full **Production DevOps & Cloud Engineering Architecture** built to automate the provisioning, containerization, deployment, and monitoring of the **VerdantNest** microservices application.

### 🌟 Key Technical Accomplishments
- **Zero-Touch Infrastructure Provisioning**: 100% codified using **Terraform** to provision AWS VPCs, Subnets, EKS Cluster, ECR Repository, IAM Roles, Security Groups, and Helm Chart releases.
- **Self-Healing CI/CD Pipeline**: Configured **Jenkins** inside Docker on AWS EC2 with host binary volume mounts and native ECR IAM Instance Profile authentication.
- **GitOps Continuous Delivery**: Configured **ArgoCD** to automatically reconcile Kubernetes manifests from GitHub to EKS within seconds of code changes.
- **Full Observability Stack**: Integrated **Prometheus** for cluster metric collection and **Grafana** for real-time CPU/RAM/Network visualization.

---

## 🏗️ DevOps & Cloud Architecture

```
                                    ┌─────────────────────────────────────────┐
                                    │               AWS CLOUD                 │
                                    │                                         │
┌─────────────┐    ┌──────────┐    │  ┌────────────┐     ┌─────────────────┐  │    ┌─────────────────┐
│  Developer  │───▶│  GitHub  │───▶│  │ Jenkins CI │────▶│     AWS ECR     │  │    │     AWS EKS     │
│  git push   │    │   Repo   │    │  │ (t3.small) │     │ (Docker Registry│  │    │(Kubernetes v1.29)│
└─────────────┘    └────┬─────┘    │  └────────────┘     └─────────────────┘  │    └────────┬────────┘
                        │           │           │                               │             │
                        │           │           │          ┌───────────────┐    │             │
                        │           │           └─────────▶│    ArgoCD     │────┼─────────────┘
                        └───────────┼─────────────────────▶│  (GitOps CD)  │    │  Sync Manifests
                                    │                      └───────────────┘    │       │
                                    │                                           │       ▼
                                    │                                           │  ┌───────────┐
                                    │                                           │  │Prometheus │
                                    │                                           │  │ + Grafana │
                                    │                                           │  └───────────┘
                                    └───────────────────────────────────────────┘
```

---

## ⚡ Verified Live Infrastructure Endpoints

| Component | Status | Access URL / Command | Security & Access Details |
| :--- | :---: | :--- | :--- |
| **Live Web App (AWS LoadBalancer)** | 🟢 **LIVE** | [http://a4ce61799c30e49eab665942229ba8cb-124042606.ap-south-1.elb.amazonaws.com](http://a4ce61799c30e49eab665942229ba8cb-124042606.ap-south-1.elb.amazonaws.com) | AWS Classic ELB routing to EKS Node Port |
| **Jenkins CI/CD Server** | 🟢 **GREEN** | [http://13.201.57.68:8080](http://13.201.57.68:8080) | EC2 `t3.small` (2GB RAM, 30GB gp3 SSD) |
| **ArgoCD GitOps Dashboard** | 🟢 **LIVE** | [http://a805bb727f3c34d3d985b6d4511fde03-1876114788.ap-south-1.elb.amazonaws.com](http://a805bb727f3c34d3d985b6d4511fde03-1876114788.ap-south-1.elb.amazonaws.com) | `kubectl -n argocd get secret argocd-initial-admin-secret` |
| **Grafana Monitoring UI** | 🟢 **LIVE** | `kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80` → `http://localhost:3000` | `kubectl -n monitoring get secret monitoring-grafana` |

---

## 🛠️ Detailed Implementation — How It Was Built

### 1. Infrastructure as Code (Terraform)
- **`infra/main.tf`**: Provisions the custom AWS VPC (`10.0.0.0/16`), public subnets with ELB tags, ECR repository with scan-on-push, and EKS Cluster (`verdantnest-eks`).
- **`infra/jenkins.tf`**: Provisions the dedicated Jenkins EC2 instance (`t3.small`, 2GB RAM, 30GB gp3 SSD) and attaches `verdantnest-jenkins-instance-profile` with `AmazonEC2ContainerRegistryPowerUser` permissions.
- **Helm Automations**: Automated the deployment of ArgoCD (`helm_release.argocd`) and Prometheus Stack (`helm_release.monitoring`) into EKS during `terraform apply`.

### 2. Continuous Integration (Jenkins Pipeline)
- **Multi-Stage Dockerfile**: Multi-stage Node 20 Alpine build generating a lightweight standalone Next.js 15 bundle.
- **Automated Stages (`Jenkinsfile`)**:
  1. **Checkout**: Pulls code from GitHub `main` branch.
  2. **Build Docker Image**: Compiles Next.js app and tags image with `${BUILD_NUMBER}`.
  3. **Push to ECR**: Authenticates via EC2 IAM metadata (`aws ecr get-login-password`) and pushes `:latest`, `:v1`, and `:${BUILD_NUMBER}` tags to AWS ECR.
  4. **Manifest Update**: Updates `k8s/deployment.yaml` with the new image tag.

### 3. Continuous Delivery (ArgoCD GitOps)
- **Application CRD (`k8s/argocd-app.yaml`)**: Connects ArgoCD to `https://github.com/sanyambedi/verdantnest.git`.
- **Automated Sync & Self-Healing**: Watches `k8s/` folder for changes, automatically applying Kubernetes `Deployments`, `Services`, and `Secrets` to EKS with zero manual downtime.

### 4. Observability & Cluster Monitoring
- **Prometheus**: Scrapes Kubernetes API, cAdvisor, and Node Exporter metrics every 15 seconds.
- **Grafana**: Pre-configured with Kubernetes Compute Resources dashboards to monitor real-time Pod CPU utilization, Memory footprint, and Network throughput.

---

## 📁 Repository Structure

```
verdantnest/
├── infra/                           # Infrastructure as Code (Terraform)
│   ├── main.tf                      # VPC, EKS, ECR, IAM, Helm releases
│   ├── jenkins.tf                   # Jenkins EC2, Security Groups, IAM Profile
│   ├── jenkins-setup.sh             # Automated Jenkins boot & tool setup
│   ├── variables.tf                 # Cluster & Instance configuration
│   └── outputs.tf                   # Deployment endpoints & URLs
├── k8s/                             # Kubernetes Manifests
│   ├── deployment.yaml              # App Deployment spec
│   ├── service.yaml                 # AWS LoadBalancer Service spec
│   ├── secrets.yaml                 # Encrypted environment secrets
│   └── argocd-app.yaml              # ArgoCD GitOps Application spec
├── src/                             # Next.js 15 Application Source Code
├── Dockerfile                       # Multi-stage production container build
├── Jenkinsfile                      # CI/CD Pipeline definition
└── README.md                        # Enterprise DevOps documentation
```

---

## 🧹 Teardown Instructions (Cost Safety)

To clean up all AWS resources and stop billing when testing is complete:

```bash
cd infra
terraform destroy -auto-approve
```

---

<p align="center">
  Made with 💚 by the VerdantNest Cloud & DevOps Engineering Team
</p>
