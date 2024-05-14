SELECT 
    status,
    json_agg(c.*) AS customers
FROM 
    customers c
WHERE 
    business_id = $1
GROUP BY 
    status;