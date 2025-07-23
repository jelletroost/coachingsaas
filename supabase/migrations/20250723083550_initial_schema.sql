-- Migration: 20250723083550_initial_schema.sql
-- Description: Initial database schema for HealthCoach Pro application
-- Date: 2025-07-23

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'coach', 'admin');
CREATE TYPE account_status AS ENUM ('pending', 'active', 'suspended', 'verified');
CREATE TYPE coach_specialization AS ENUM ('nutrition', 'fitness', 'mental-health', 'diabetes', 'cardiology', 'pediatrics', 'geriatrics', 'general');
CREATE TYPE experience_level AS ENUM ('0-2', '3-5', '6-10', '10+');

-- Create users table
CREATE TABLE users(
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   role user_role NOT NULL DEFAULT 'patient',
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create patients table
CREATE TABLE patients(
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
   date_of_birth DATE NOT NULL,
   phone VARCHAR(20),
   avatar_url TEXT,
   account_status account_status DEFAULT 'active',
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coaches table
CREATE TABLE coaches(
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
   specialization coach_specialization NOT NULL,
   experience_level experience_level NOT NULL,
   bio TEXT,
   phone VARCHAR(20),
   avatar_url TEXT,
   account_status account_status DEFAULT 'pending',
   is_verified BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at 
    BEFORE UPDATE ON patients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaches_updated_at 
    BEFORE UPDATE ON coaches 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_coaches_user_id ON coaches(user_id);
CREATE INDEX idx_coaches_specialization ON coaches(specialization);
CREATE INDEX idx_coaches_verified ON coaches(is_verified);
