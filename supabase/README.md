# HealthCoach Pro Database Schema

This directory contains the database schema and related files for the HealthCoach Pro application.

## 📁 File Structure

```
supabase/
├── README.md                 # This file
├── schema.sql               # Complete database schema
├── migrations/
│   └── 001_initial_schema.sql  # Initial migration
├── auth.ts                  # Supabase auth functions
└── client.ts               # Supabase client configuration
```

## 🗄️ Database Schema Overview

### Core Tables

#### 1. `user_profiles`

Base user profile table that extends Supabase's `auth.users` table.

**Key Fields:**

-  `user_id`: Links to Supabase auth.users
-  `role`: User role (patient, coach, admin)
-  `first_name`, `last_name`: User's name
-  `email`: User's email address
-  `account_status`: Account state (pending, active, suspended, verified)
-  `search_vector`: Full-text search vector

#### 2. `patient_profiles`

Extended profile for patients with health-specific information.

**Key Fields:**

-  `user_profile_id`: Links to user_profiles
-  `health_conditions`: Patient's health conditions
-  `emergency_contact_*`: Emergency contact information
-  `insurance_*`: Insurance details
-  `preferred_language`: Language preference

#### 3. `coach_profiles`

Extended profile for health coaches with professional information.

**Key Fields:**

-  `user_profile_id`: Links to user_profiles
-  `specialization`: Coach's area of expertise
-  `experience_level`: Years of experience
-  `license_number`: Professional license
-  `bio`: Professional biography
-  `is_verified`: Verification status
-  `hourly_rate`: Coaching rate

#### 4. `user_sessions`

Session tracking for user activity monitoring.

**Key Fields:**

-  `user_id`: Links to auth.users
-  `session_token`: Unique session identifier
-  `ip_address`, `user_agent`: Session metadata
-  `expires_at`: Session expiration

### Custom Types

```sql
-- User roles
CREATE TYPE user_role AS ENUM ('patient', 'coach', 'admin');

-- Coach specializations
CREATE TYPE coach_specialization AS ENUM (
    'nutrition', 'fitness', 'mental-health', 'diabetes',
    'cardiology', 'pediatrics', 'geriatrics', 'general'
);

-- Experience levels
CREATE TYPE experience_level AS ENUM ('0-2', '3-5', '6-10', '10+');

-- Account status
CREATE TYPE account_status AS ENUM ('pending', 'active', 'suspended', 'verified');
```

## 🔐 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

-  **User Profiles**: Users can only access their own profile
-  **Patient Profiles**: Patients can only access their own profile
-  **Coach Profiles**: Coaches can only access their own profile, but verified coaches are publicly readable
-  **User Sessions**: Users can only access their own sessions

### Policies

-  `Users can view their own profile`
-  `Users can update their own profile`
-  `Users can insert their own profile`
-  `Anyone can view public coach profiles` (for verified coaches)

## 🚀 Setup Instructions

### 1. Local Development

1. **Install Supabase CLI**:

   ```bash
   npm install -g supabase
   ```

2. **Initialize Supabase**:

   ```bash
   supabase init
   ```

3. **Start local Supabase**:

   ```bash
   supabase start
   ```

4. **Apply migrations**:
   ```bash
   supabase db reset
   ```

### 2. Production Deployment

1. **Link to your Supabase project**:

   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

2. **Deploy schema**:
   ```bash
   supabase db push
   ```

### 3. Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📊 Database Functions

### Built-in Functions

#### `get_user_profile(user_uuid UUID)`

Returns user profile information for a given user ID.

**Usage:**

```sql
SELECT * FROM get_user_profile('user-uuid-here');
```

#### `handle_new_user()`

Automatically creates a user profile when a new user signs up.

**Trigger:** `on_auth_user_created`

## 🔍 Search Capabilities

### Full-Text Search

Both `user_profiles` and `coach_profiles` tables include full-text search vectors:

```sql
-- Search users
SELECT * FROM user_profiles
WHERE search_vector @@ plainto_tsquery('english', 'search term');

-- Search coaches
SELECT * FROM coach_profiles
WHERE search_vector @@ plainto_tsquery('english', 'nutrition coach');
```

## 📈 Performance Optimizations

### Indexes

-  Primary key indexes on all tables
-  Foreign key indexes for relationships
-  Full-text search indexes using GIN
-  Composite indexes for common queries

### Triggers

-  Automatic `updated_at` timestamp updates
-  Automatic user profile creation on signup

## 🛠️ Usage Examples

### Creating a User Profile

```typescript
import { UserService } from "@/lib/services/userService";

// Create user profile
const userProfile = await UserService.createUserProfile({
   user_id: "user-uuid",
   role: "patient",
   first_name: "John",
   last_name: "Doe",
   email: "john@example.com",
});
```

### Creating a Patient Profile

```typescript
// Create patient profile
const patientProfile = await UserService.createPatientProfile({
   user_profile_id: userProfile.id,
   health_conditions: "Diabetes, Hypertension",
   preferred_language: "en",
   timezone: "UTC",
});
```

### Creating a Coach Profile

```typescript
// Create coach profile
const coachProfile = await UserService.createCoachProfile({
   user_profile_id: userProfile.id,
   specialization: "nutrition",
   experience_level: "3-5",
   license_number: "HC123456",
   bio: "Certified nutrition coach with 4 years of experience",
   languages_spoken: ["en"],
   timezone: "UTC",
   is_verified: false,
});
```

### Searching Coaches

```typescript
// Search coaches by specialization
const nutritionCoaches = await UserService.searchCoaches("nutrition", 10);

// Get all verified coaches
const verifiedCoaches = await UserService.getVerifiedCoaches(20);
```

## 🔄 Migration Strategy

### Adding New Fields

1. Create a new migration file: `supabase/migrations/002_add_new_field.sql`
2. Add the ALTER TABLE statement
3. Update TypeScript types in `lib/types/database.ts`
4. Deploy with `supabase db push`

### Example Migration

```sql
-- Migration: 002_add_new_field.sql
ALTER TABLE user_profiles
ADD COLUMN middle_name VARCHAR(100);

-- Update search vector
ALTER TABLE user_profiles
DROP COLUMN search_vector;

ALTER TABLE user_profiles
ADD COLUMN search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(first_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(middle_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(last_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(email, '')), 'B')
) STORED;
```

## 🧪 Testing

### Database Tests

```bash
# Run database tests
supabase test db

# Test specific functions
psql -h localhost -p 54322 -U postgres -d postgres -c "SELECT get_user_profile('test-uuid');"
```

## 📚 Additional Resources

-  [Supabase Documentation](https://supabase.com/docs)
-  [PostgreSQL Documentation](https://www.postgresql.org/docs/)
-  [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
-  [Database Functions](https://supabase.com/docs/guides/database/functions)

## 🤝 Contributing

When making changes to the database schema:

1. Create a new migration file
2. Update TypeScript types
3. Update this README if needed
4. Test locally before deploying
5. Document any breaking changes

## 📞 Support

For database-related issues:

1. Check the Supabase logs: `supabase logs`
2. Review the migration history: `supabase migration list`
3. Reset and reapply migrations: `supabase db reset`
