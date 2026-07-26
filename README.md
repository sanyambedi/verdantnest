<p align="center">
  <img src="https://img.icons8.com/fluency/96/potted-plant.png" alt="VerdantNest Logo" width="80" />
</p>

<h1 align="center">🌿 VerdantNest</h1>

<p align="center">
  <strong>AI-Powered Botanical E-Commerce & Enterprise Cloud Infrastructure Platform</strong>
</p>

<p align="center">
  <em>A full-stack Next.js 15 botanical application with Gemini 2.5 AI diagnostics, deployed via a GitOps CI/CD pipeline on AWS EKS with Terraform & Grafana.</em>
</p>

<p align="center">
  <a href="#-application-features--gui"><img src="https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="#-ai-features"><img src="https://img.shields.io/badge/AI-Gemini%202.5-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/AWS-EKS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS EKS" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="Jenkins" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/ArgoCD-GitOps-EF6C00?style=for-the-badge&logo=argo&logoColor=white" alt="ArgoCD" /></a>
  <a href="#-devops--cloud-architecture"><img src="https://img.shields.io/badge/Grafana-Monitoring-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana" /></a>
</p>

<br />

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Application Features & GUI](#-application-features--gui)
- [AI Features (Gemini 2.5)](#-ai-features-gemini-25)
- [DevOps & Cloud Architecture](#-devops--cloud-architecture)
- [Verified Infrastructure Endpoints](#-verified-infrastructure-endpoints)
- [DevOps Implementation Guide](#-devops-implementation-guide)
- [Tech Stack](#-tech-stack)
- [Local Development](#-local-development)
- [Teardown Guide](#-teardown-guide)

---

## 🌱 Overview

**VerdantNest** is a hybrid **Full-Stack AI Application** and **Enterprise Cloud Infrastructure** project. 

It combines a luxury botanical e-commerce store built with **Next.js 15** and **Google Gemini AI** with an enterprise-grade **DevOps Pipeline** built on **AWS EKS**, **Terraform**, **Jenkins**, **ArgoCD**, and **Grafana**.

> _"Architecting living spaces with rare plants and cloud automation."_

---

## ✨ Application Features & GUI

### 🛒 E-Commerce & Luxury GUI
- **55+ Botanical Specimen Catalog**: Filterable by light levels, watering frequency, and care difficulty.
- **Glassmorphism UI/UX**: Soft mint and forest HSL design system, custom Radix UI components, and fluid micro-animations.
- **Shopping Cart & Wishlist**: Session-persistent cart and wishlist state via `localStorage`.
- **Checkout & Order Sync**: Integrated checkout flow synced in real-time to Firebase Firestore.

### 🏢 Admin HQ Dashboard
- **Analytics & Revenue Charts**: Recharts financial auditing dashboard.
- **Specimen Auditor & Order Manager**: Track inventory and incoming orders.

---

## 🤖 AI Features (Gemini 2.5)

Powered by **Google Genkit** + **Gemini 2.5 Flash** with Zod schema validation:

| Feature | Description |
|---------|-------------|
| 🩺 **AI Plant Doctor** | Upload a photo of a sick plant + describe symptoms → receive severity analysis, recovery steps, prognosis, and prevention tips. |
| 🏷️ **AI SEO Meta Generator** | Auto-generates search-optimized meta titles, descriptions, and alt text for products in Admin HQ. |
| ✍️ **AI Blog Studio** | Generates keyword-rich botanical journal articles based on topic, tone, and length. |

---

## 🚀 DevOps & Cloud Architecture

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
                        │           └───────────┼─────────▶│    ArgoCD     │────┼─────────────┘
                        └───────────────────────┼─────────▶│  (GitOps CD)  │    │  Sync Manifests
                                                │          └───────────────┘    │       │
                                                │                               │       ▼
                                                │                               │  ┌───────────┐
                                                │                               │  │Prometheus │
                                                │                               │  │ + Grafana │
                                                │                               │  └───────────┘
                                                └───────────────────────────────┘
```

---

## ⚡ Verified Infrastructure Endpoints

| Component | Status | URL / Access Command | Security & Credentials |
| :--- | :---: | :--- | :--- |
| **Live Web App (AWS LoadBalancer)** | 🟢 **LIVE** | [AWS LoadBalancer Application Link](http://a4ce61799c30e49eab665942229ba8cb-124042606.ap-south-1.elb.amazonaws.com) | AWS Classic ELB to Next.js 15 |
| **Jenkins CI/CD Server** | 🟢 **GREEN** | [http://13.201.57.68:8080](http://13.201.57.68:8080) | `sudo docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword` |
| **ArgoCD GitOps Dashboard** | 🟢 **LIVE** | [ArgoCD LoadBalancer Link](http://a805bb727f3c34d3d985b6d4511fde03-1876114788.ap-south-1.elb.amazonaws.com) | `kubectl -n argocd get secret argocd-initial-admin-secret` |
| **Grafana Monitoring UI** | 🟢 **LIVE** | `kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80` → `http://localhost:3000` | `kubectl -n monitoring get secret monitoring-grafana` |

---

## 🛠️ DevOps Implementation Guide

### 1. Infrastructure as Code (Terraform)
- **`infra/main.tf`**: Provisions custom AWS VPC (`10.0.0.0/16`), subnets, ECR repository, and EKS Cluster (`verdantnest-eks`).
- **`infra/jenkins.tf`**: Provisions dedicated Jenkins EC2 instance (`t3.small`, 2GB RAM, 30GB gp3 SSD) and attaches IAM Instance Profile for ECR permissions.
- **Helm Automations**: Deploys ArgoCD and Prometheus/Grafana Helm charts into EKS.

### 2. Continuous Integration (Jenkins)
- Multi-stage Node 20 Alpine Docker build producing a standalone Next.js bundle.
- Automated pipeline (`Jenkinsfile`): Git Checkout → Docker Build → AWS ECR Login → Image Push (`:latest`, `:v1`, `${BUILD_NUMBER}`).

### 3. Continuous Delivery (ArgoCD GitOps)
- GitOps Controller (`k8s/argocd-app.yaml`) monitoring GitHub `k8s/` folder.
- Reconciles Kubernetes `Deployments`, `Services`, and `Secrets` to EKS automatically.

### 4. Observability (Prometheus & Grafana)
- Prometheus metric collection paired with Grafana dashboards for live CPU, Memory, and Network monitoring.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend & GUI** | Next.js 15.5, React 19, TypeScript 5, Tailwind CSS 3.4, Radix UI, Lucide Icons |
| **AI Diagnostics** | Google Genkit + Gemini 2.5 Flash, Zod Validation |
| **Backend & Database** | Firebase Firestore, Firebase Auth |
| **Containers & K8s** | Docker, Kubernetes v1.29, Helm, EKS |
| **CI/CD & GitOps** | Jenkins Pipeline, ArgoCD |
| **Cloud & IaC** | AWS (VPC, EC2, EKS, ECR, IAM, ELB), Terraform |
| **Observability** | Prometheus, Grafana |

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/sanyambedi/verdantnest.git
cd verdantnest

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run local development server
npm run dev
```

App will run locally at **http://localhost:9002**.

---

## 🧹 Teardown Guide

To clean up all AWS resources and stop billing:

```bash
cd infra
terraform destroy -auto-approve
```

---

<p align="center">
  Made with 💚 by the VerdantNest Development & DevOps Engineering Team
</p>
