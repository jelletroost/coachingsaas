-- Migration: 20250729150000_remove_not_null_constraints.sql
-- Description: Remove NOT NULL constraints from patients and coaches tables
-- Date: 2025-07-29

-- Remove NOT NULL constraint from patients.date_of_birth
ALTER TABLE patients 
ALTER COLUMN date_of_birth DROP NOT NULL;

-- Remove NOT NULL constraint from coaches.specialization
ALTER TABLE coaches 
ALTER COLUMN specialization DROP NOT NULL;

-- Remove NOT NULL constraint from coaches.experience_level
ALTER TABLE coaches 
ALTER COLUMN experience_level DROP NOT NULL; 