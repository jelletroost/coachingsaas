# HealthCoach Pro - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Current Features](#current-features)
3. [Technical Architecture](#technical-architecture)
4. [Technology Stack](#technology-stack)
5. [Development Environment](#development-environment)
6. [Deployment Architecture](#deployment-architecture)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [Security Features](#security-features)
10. [Questions for Current Phase](#questions-for-current-phase)
11. [Questions for Next Phase](#questions-for-next-phase)
12. [Future Roadmap](#future-roadmap)

---

## Project Overview

**HealthCoach Pro** is a comprehensive SaaS platform designed to connect health coaches with patients, providing a complete ecosystem for health coaching services. The platform supports multiple user roles (patients, coaches, and administrators) with role-based access control and feature management.

### Key Value Propositions
- **Multi-role Platform**: Supports patients, coaches, and administrators
- **Feature Flag System**: Environment-based feature control
- **Real-time Communication**: Built-in messaging system
- **Subscription Management**: Complete billing and subscription handling
- **Health Assessment**: Comprehensive intake and assessment system
- **Product Management**: Medicine, supplement, and service catalog

---

## Current Features

### 🔐 Authentication & Authorization
- **Multi-role Authentication**: Patient, Coach, Admin, Super Admin roles
- **Role-based Access Control**: Middleware-based route protection
- **Session Management**: Secure session handling with Supabase Auth
- **Password Reset**: Email-based password recovery
- **Account Verification**: Email verification for new accounts

### 👥 User Management
- **Patient Profiles**: Complete health profiles with medical history
- **Coach Profiles**: Specialized profiles with certifications and expertise
- **Admin Dashboard**: Comprehensive user management interface
- **Profile Management**: Avatar uploads, personal information updates

### 📋 Intake & Assessment System
- **Comprehensive Intake Forms**: Health history, medications, allergies, lifestyle
- **Coach Review Process**: Approval/rejection workflow with notes
- **Priority Management**: Urgent case identification and handling
- **Follow-up Tracking**: Status management and action items
- **Intake History**: Complete timeline of patient assessments

### 💬 Messaging System
- **Real-time Chat**: Patient-coach communication
- **Conversation Management**: Archive, delete, search conversations
- **Status Indicators**: Online/offline status for users
- **Unread Message Tracking**: Message counters and notifications
- **File Sharing Ready**: UI prepared for document/image sharing

### 💳 Subscription & Billing
- **Multiple Plan Tiers**: Basic ($49.99), Premium ($99.99), Elite ($199.99)
- **Usage Tracking**: Session and resource usage monitoring
- **Billing History**: Complete invoice and payment history
- **Payment Method Management**: Secure payment information storage
- **Plan Management**: Upgrade/downgrade capabilities

### 🏥 Product Management
- **Product Catalog**: Medicine, supplements, and services
- **Prescription System**: Doctor-prescribed product management
- **Inventory Tracking**: Stock quantity management
- **Pricing Management**: Multi-currency support
- **Product Categories**: Organized product classification

### 🚩 Feature Flag System
- **Environment-based Control**: Dev, Staging, Production feature management
- **Role-based Features**: Different features for different user types
- **Dynamic Feature Toggle**: Real-time feature enablement/disablement
- **Admin Control Panel**: Web interface for feature management

### 📊 Dashboard & Analytics
- **Patient Dashboard**: Health progress, goals, coach communication
- **Coach Dashboard**: Patient management, intake reviews, messaging
- **Admin Dashboard**: Platform overview, user management, analytics
- **Progress Tracking**: Visual progress indicators and charts

### 🔧 Admin Features
- **User Management**: Complete user lifecycle management
- **Content Management**: CMS for platform content
- **Integration Settings**: Third-party service configuration
- **System Settings**: Platform-wide configuration
- **Analytics & Reporting**: Usage statistics and insights

---

## Technical Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15.4.2 App                      │
├─────────────────────────────────────────────────────────────┤
│  App Router (App Directory)                                │
│  ├── (home) - Public pages                                 │
│  ├── (dashboard) - Protected dashboard routes              │
│  │   ├── dashboard/ - Patient dashboard                    │
│  │   ├── coach/ - Coach dashboard                          │
│  │   └── admin/ - Admin dashboard                          │
│  └── auth/ - Authentication pages                          │
├─────────────────────────────────────────────────────────────┤
│  Components Architecture                                   │
│  ├── ui/ - Reusable UI components (shadcn/ui)             │
│  ├── shared/ - Shared business components                  │
│  ├── patient/ - Patient-specific components                │
│  ├── coach/ - Coach-specific components                    │
│  └── admin/ - Admin-specific components                    │
└─────────────────────────────────────────────────────────────┘
```

### Backend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Platform                       │
├─────────────────────────────────────────────────────────────┤
│  Database Layer (PostgreSQL)                               │
│  ├── Users & Authentication                                │
│  ├── Patients & Coaches                                    │
│  ├── Products & Prescriptions                              │
│  ├── Subscriptions & Billing                               │
│  ├── Messages & Communication                              │
│  └── Feature Flags & Access Control                        │
├─────────────────────────────────────────────────────────────┤
│  Edge Functions (Deno)                                     │
│  ├── auth/ - Authentication endpoints                      │
│  ├── users/ - User management                              │
│  ├── patients/ - Patient operations                        │
│  ├── products/ - Product management                        │
│  └── feature-flags/ - Feature flag control                 │
├─────────────────────────────────────────────────────────────┤
│  Real-time Features                                        │
│  ├── Live messaging                                        │
│  ├── Real-time notifications                               │
│  └── Live status updates                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.4.2 | React framework with App Router |
| **React** | 19.1.0 | UI library |
| **TypeScript** | 5.x | Type safety and development experience |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **shadcn/ui** | Latest | Component library |
| **Radix UI** | Latest | Headless UI primitives |
| **Framer Motion** | 12.23.6 | Animation library |
| **React Hook Form** | 7.60.0 | Form management |
| **Zod** | 4.0.5 | Schema validation |
| **TanStack Query** | 5.83.0 | Data fetching and caching |
| **Zustand** | 5.0.6 | State management |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.52.0 | Backend-as-a-Service |
| **PostgreSQL** | Latest | Primary database |
| **Deno** | Latest | Edge function runtime |
| **Hono** | Latest | Web framework for edge functions |
| **JWT** | Built-in | Authentication tokens |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality |
| **Prettier** | Code formatting |
| **TypeScript** | Type checking |
| **Yarn** | Package management |
| **Git** | Version control |

---

## Development Environment

### Local Development Setup
```bash
# Clone repository
git clone https://github.com/jelletroost/coachingsaas.git
cd coachingsaas

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local

# Start development server
yarn dev

# Start Supabase locally
supabase start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://pnlkidryumcdlhpdyvks.supabase.co/functions/v1
NEXT_PUBLIC_SUPABASE_URL=https:pnlkidryumcdlhpdyvks.supabase.co
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubGtpZHJ5dW1jZGxocGR5dmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTkyOTIsImV4cCI6MjA2ODgzNTI5Mn0.F_ueJbwkUYxxMdsDTsp3sNC7OPeiUuXhedhmAu88cNQ
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        A[Vercel - Frontend] --> B[Supabase - Backend]
        B --> C[PostgreSQL Database]
        B --> D[Edge Functions]
        B --> E[Real-time Subscriptions]
    end
    
    subgraph "Staging Environment"
        F[Vercel - Staging] --> G[Supabase - Staging]
        G --> H[PostgreSQL - Staging]
        G --> I[Edge Functions - Staging]
    end
    
    subgraph "Development Environment"
        J[Local Next.js] --> K[Local Supabase]
        K --> L[Local PostgreSQL]
    end
    
    subgraph "External Services"
        M[Stripe - Payments]
        N[Email Service]
        O[File Storage]
    end
    
    A --> M
    A --> N
    A --> O
    F --> M
    F --> N
    F --> O
```

### Hosting Regions
- **Frontend**: Vercel (Frankfurt, Germany (West) - eu-central-1 - fra1)
- **Backend**: Supabase (Frankfurt)
- **Database**: PostgreSQL (Frankfurt)
- **Edge Functions**: Deno Deploy (Global edge network)

### Environment Strategy
1. **Development**: Local development with local Supabase
2. **Staging**: Vercel preview deployments + Supabase staging
3. **Production**: Vercel production + Supabase production

---

## Database Schema

### Core Tables
```sql
-- Users and Authentication
users (id, first_name, last_name, email, role, created_at, updated_at)
user_roles (id, name, description, created_at, updated_at)
patients (id, user_id, date_of_birth, phone, avatar_url, account_status, created_at, updated_at)
coaches (id, user_id, specialization, experience_level, bio, phone, avatar_url, account_status, is_verified, created_at, updated_at)

-- Products and Prescriptions
products (id, name, type, price, currency, stock_quantity, status, prescription_required, created_at, updated_at)
prescriptions (id, patient_id, product_id, dosage, frequency, duration, instructions, notes, status, created_at, updated_at)

-- Feature Management
feature_access (id, user_role_id, feature_name, is_enabled, created_at, updated_at)
```

### Key Relationships
- Users → Patients/Coaches (one-to-one)
- Patients → Prescriptions (one-to-many)
- Products → Prescriptions (one-to-many)
- Feature Flag → Feature Access (one-to-many)

---

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/signin - User login
POST /api/auth/signup - User registration
POST /api/auth/reset-password - Password reset
```

### User Management
```
GET /api/users - Get users (admin only)
POST /api/users - Create user
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

### Patient Operations
```
GET /api/patients - Get patients
POST /api/patients - Create patient
PUT /api/patients/:id - Update patient
GET /api/patients/:id/intakes - Get patient intakes
```

### Product Management
```
GET /api/products - Get products
POST /api/products - Create product
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product
```

### Feature Flags
```
GET /api/feature-flags/get-feature-access - Get feature access
POST /api/feature-flags/update-feature-access - Update feature access
```

---

## Security Features

### Authentication Security
- **JWT Tokens**: Secure session management
- **Password Hashing**: Bcrypt-based password security
- **Email Verification**: Account verification process
- **Session Management**: Secure session handling

### Authorization Security
- **Role-based Access Control**: Middleware-based route protection
- **Feature-level Permissions**: Granular feature access control
- **API Security**: JWT verification for protected endpoints
- **CORS Protection**: Cross-origin request security

### Data Security
- **Database Encryption**: Supabase-managed encryption
- **API Security**: HTTPS-only communication
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Parameterized queries

---

## Questions for Current Phase

### Authentication & User Management
1. **User Registration Flow**: Should we implement email verification for all user types or only coaches?
2. **Coach Verification Process**: What documents/certifications are required for coach verification?
3. **Account Suspension**: What are the criteria for account suspension and how should the process work?
4. **Password Policy**: What are the password strength requirements for different user types?

### Intake & Assessment System
5. **Intake Form Customization**: Should coaches be able to customize intake forms for their specific specialties?
6. **Medical History Storage**: What are the compliance requirements for storing medical information (HIPAA, GDPR)?
7. **Intake Approval Process**: Should there be an automated screening before coach review?
8. **Follow-up Frequency**: How often should follow-up assessments be required?

### Messaging System
9. **Message Retention**: How long should messages be retained for compliance purposes?
10. **File Sharing**: What types of files should be allowed in messages (images, documents, videos)?
11. **Message Encryption**: Is end-to-end encryption required for patient-coach communications?
12. **Notification Preferences**: What notification settings should users have control over?

### Subscription & Billing
13. **Payment Methods**: Which payment methods should be supported (credit cards, PayPal, bank transfers)?
14. **Refund Policy**: What is the refund policy for different subscription tiers?
15. **Billing Cycles**: Should we support annual billing with discounts?
16. **Tax Handling**: How should taxes be calculated and handled for different regions?


### Admin Features
17. **Content Management**: What types of content should be manageable through the CMS?
18. **Analytics Requirements**: What specific metrics and reports are needed for business intelligence?

---

## Questions for Next Phase

### Advanced Features
19. **Video Consultations**: Should we integrate video calling capabilities for remote consultations?
20. **AI Health Assistant**: Would an AI-powered health assistant be valuable for patients?

### Mobile Application
21. **Offline Capabilities**: What features should work offline in the mobile app?
22. **Push Notifications**: What types of push notifications should be supported?

### Integration Requirements
23. **Electronic Health Records**: Should we integrate with existing EHR systems?
24. **Insurance Integration**: Do we need to integrate with insurance providers for billing?
25. **Pharmacy Integration**: Should we integrate with pharmacies for prescription fulfillment?
26. **Lab Results**: Should we integrate with lab services for test results?

### Compliance & Legal
27. **Data Privacy**: What are the specific data privacy requirements for different regions?
28. **Audit Requirements**: What audit trails and logging are required for compliance?

### Business Model
29. **Revenue Model**: What is the revenue split between platform and coaches?
30. **Pricing Strategy**: Should pricing be dynamic based on coach experience or specialization?

---

## Technical Debt & Improvements

### Immediate Improvements Needed
1. **Error Handling**: Implement comprehensive error handling across all API endpoints
2. **Loading States**: Add proper loading states for all async operations
3. **Form Validation**: Enhance client-side validation with better error messages
4. **Testing**: Implement unit and integration tests
5. **Documentation**: Add API documentation and developer guides

### Performance Optimizations
1. **Image Optimization**: Implement proper image optimization and lazy loading
2. **Code Splitting**: Optimize bundle sizes with better code splitting
3. **Caching Strategy**: Implement proper caching for API responses
4. **Database Indexing**: Optimize database queries with proper indexing

### Security Enhancements
1. **Rate Limiting**: Implement API rate limiting
2. **Input Sanitization**: Add comprehensive input sanitization
3. **Security Headers**: Implement proper security headers
4. **Audit Logging**: Add comprehensive audit logging

---

## Conclusion

The HealthCoach Pro platform has a solid foundation with comprehensive features for health coaching services. The current implementation includes all core functionality needed for a health coaching platform, with a modern tech stack and scalable architecture.

The feature flag system provides excellent flexibility for managing features across environments, and the role-based access control ensures proper security. The platform is ready for production deployment with proper environment configuration.