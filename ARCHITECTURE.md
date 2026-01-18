# Frontend Architecture Guide (React)

This document defines the architectural rules and folder responsibilities used in this project.
The goal is clarity, predictability, and scalability.

---

## Core Principles

1. Pages are thin  
- Pages only compose layouts and feature components  
- Minimal logic (route params, layout decisions)  
- No business logic, no server state logic  

2. Features own behavior  
- UI, hooks, types, and local state that belong to one domain  
- Features do NOT perform raw API calls directly  

3. API calls are centralized  
- All server communication lives in the api folder  
- API functions are pure and reusable  
- No React, no hooks, no stores inside API files  

4. Clear separation of responsibilities  
- shared = cross-feature reusable code  
- lib = app-level infrastructure and wiring  
- stores = global client state only  

5. Hooks are explicit  
- Anything calling hooks must be named useSomething  
- Hooks compose behavior, not hide side effects  

---

## Folder Structure (Conceptual)

src  
api  
components  
features
lib  
pages  
routes  
shared

---

## pages

Responsibility  
- Route-level composition only  

Rules  
- No business logic  
- No API calls  
- No stores  
- Mostly JSX  

Pages may  
- Read route params  
- Choose layouts  
- Compose feature components  

---

## features

Each feature represents a business domain (for example auth, profile).

Typical contents inside a feature (not all required):  
components  
forms  
hooks  
stores  
types  

Rules  
- Subfolders like forms or tables are encouraged if they improve clarity  
- Avoid over-normalizing; clarity is more important than symmetry  
- Feature code should not depend on page-level concerns  

Feature responsibilities  
- Domain-specific UI  
- Feature-specific hooks  
- Feature-specific types  
- Feature-level client state when needed  

---

## api

Purpose  
Centralized server communication layer.

Naming convention  
auth.api.ts  
user.api.ts  
profile.api.ts  

Rules  
- No React imports  
- No hooks  
- No stores  
- Only async functions that talk to the server  

---

## API Types

Location  
api/types.ts  

What belongs here  
- API response wrappers  
- Error shapes  
- DTOs returned by the backend  

These types describe server contracts, not app state.

---

## shared

Purpose  
Cross-feature reusable code.

Rules  
- Used by more than one feature  
- No feature-specific logic  

---

## lib

Purpose  
Application-level infrastructure and configuration.

Examples  
- api-client  
- queryClient  
- utility helpers like cn  

Difference from shared  
- shared is reusable across features  
- lib wires and configures the app  

---

## components

Purpose  
Non-feature-specific components.

Rules  
- No business logic  
- No API calls  
- No feature state  

---

## routes

Purpose  
Routing configuration only.

Rules  
- No business logic  
- No auth logic  
- Only route definitions and composition