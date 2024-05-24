SELECT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'businesses'
) AS businesses_exists,
EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'customers'
) AS customers_exists;
