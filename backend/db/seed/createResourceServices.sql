CREATE TABLE resource_services (
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (resource_id, service_id)
);