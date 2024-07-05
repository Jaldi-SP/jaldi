CREATE TABLE resource_availability (
    id UUID PRIMARY KEY,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL, -- 0 (Sunday) to 6 (Saturday)
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);