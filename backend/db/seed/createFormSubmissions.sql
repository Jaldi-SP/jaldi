CREATE TABLE form_submissions (
    id SERIAL PRIMARY KEY,
    business_id UUID REFERENCES businesses(id),
    customer_id UUID REFERENCES customers(id),
    form_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);