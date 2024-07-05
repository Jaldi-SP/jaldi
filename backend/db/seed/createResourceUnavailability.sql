CREATE TABLE resource_unavailability (
    id UUID PRIMARY KEY,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    reason VARCHAR(255),
    CONSTRAINT no_overlap CHECK (
        NOT EXISTS (
            SELECT 1 FROM resource_unavailability ru
            WHERE ru.resource_id = resource_unavailability.resource_id
            AND ru.id != resource_unavailability.id
            AND (ru.start_time, ru.end_time) OVERLAPS (resource_unavailability.start_time, resource_unavailability.end_time)
        )
    )
);