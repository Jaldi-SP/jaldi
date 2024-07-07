SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'businesses',
    'customers',
    'form_fields',
    'form_submissions',
    'business_form_fields',
    'services',
    'resources',
    'appointments',
    'resource_availability',
    'resource_services',
    'resource_unavailability',
    'service_pricing'
  );
