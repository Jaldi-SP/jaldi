-- Create the resource_unavailability table without the CHECK constraint
CREATE TABLE resource_unavailability (
    id UUID PRIMARY KEY,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    reason VARCHAR(255)
);

-- Create a function to check for overlaps
CREATE OR REPLACE FUNCTION check_resource_unavailability_overlap()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM resource_unavailability
        WHERE resource_id = NEW.resource_id
        AND id != NEW.id
        AND (start_time, end_time) OVERLAPS (NEW.start_time, NEW.end_time)
    ) THEN
        RAISE EXCEPTION 'Overlapping unavailability periods are not allowed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that uses the function
CREATE TRIGGER enforce_resource_unavailability_no_overlap
BEFORE INSERT OR UPDATE ON resource_unavailability
FOR EACH ROW EXECUTE FUNCTION check_resource_unavailability_overlap();