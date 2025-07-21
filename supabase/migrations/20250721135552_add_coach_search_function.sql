-- Add search function for coaches
CREATE OR REPLACE FUNCTION search_coaches(search_term TEXT)
RETURNS TABLE (
    id UUID,
    user_profile_id UUID,
    specialization coach_specialization,
    experience_level experience_level,
    license_number VARCHAR,
    bio TEXT,
    is_verified BOOLEAN,
    search_rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cp.id,
        cp.user_profile_id,
        cp.specialization,
        cp.experience_level,
        cp.license_number,
        cp.bio,
        cp.is_verified,
        ts_rank(
            to_tsvector('english', coalesce(cp.bio, '') || ' ' || cp.specialization::text || ' ' || cp.license_number),
            plainto_tsquery('english', search_term)
        ) as search_rank
    FROM coach_profiles cp
    WHERE cp.is_verified = true
    AND to_tsvector('english', coalesce(cp.bio, '') || ' ' || cp.specialization::text || ' ' || cp.license_number) @@ plainto_tsquery('english', search_term)
    ORDER BY search_rank DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
