CREATE TABLE service_pricing (
    id UUID PRIMARY KEY,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    effective_from DATE NOT NULL,
    effective_to DATE,
    start_time TIME,
    end_time TIME,
    day_of_week INTEGER, -- 0 (Sunday) to 6 (Saturday), NULL means all days
    UNIQUE(service_id, resource_id, effective_from, start_time, day_of_week)
);

-- Index for efficient querying
CREATE INDEX idx_service_pricing_lookup ON service_pricing 
    (service_id, resource_id, effective_from, effective_to, day_of_week);