# NexWhat Super Admin & Tenant Console (React.js)

A standalone React 18 + Vite + TypeScript application built for the SaaS owner and operations team to manage registered customer organizations, subscription plans, quotas, and RBAC permission matrices.

## Features
- **Overview Dashboard**: SaaS MRR calculator, plan distribution breakdown, tenant volume, and Meta Cloud API Direct Billing telemetry.
- **Customer Organization Management**: Multi-tenant search, plan assignment (Starter ₹299, Growth ₹599, Pro ₹999), instant suspend/activate toggles, and Meta WABA credential inspection.
- **Plan & Quota Controls**: Editable monthly and discounted annual pricing tiers (capped at max ₹999/mo), quota limits (WhatsApp numbers, contacts, agent seats), and feature entitlement toggles.
- **Permission Matrix (RBAC)**: Fine-grained matrix controlling Read, Write, and Delete actions across `super_admin`, `admin`, `manager`, and `agent` roles.
- **Direct Meta Cloud API Architecture**: Full native support for Model 1 (0% per-message markup, client pays Meta directly).

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Obsidian glassmorphism theme)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with JWT token interceptors

## Running Locally
```bash
cd admin
npm install
npm run dev
```
The console will start at `http://localhost:3001` and proxy API calls to the NexWhat Go backend (`/api/...`).

## Default Super Admin Credentials
- **Email**: `admin@admin.com`
- **Password**: `admin`
