DO $$ 
DECLARE 
  user_id text;
  client_id text;
BEGIN
  -- Get a sample user ID
  SELECT id INTO user_id FROM users LIMIT 1;
  
  -- Get a sample client ID
  SELECT id INTO client_id FROM clients LIMIT 1;

  -- Insert 20 sample invoices
  INSERT INTO invoices (
    user_id,
    client_id,
    paid,
    amount,
    currency,
    due_date,
    issue_date,
    paid_at,
    created_at,
    updated_at
  ) VALUES
    (user_id, client_id, true, 1500.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
    (user_id, client_id, true, 2300.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
    (user_id, client_id, true, 1800.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
    (user_id, client_id, true, 3200.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
    (user_id, client_id, true, 2100.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
    (user_id, client_id, true, 1600.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
    (user_id, client_id, true, 2800.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
    (user_id, client_id, true, 1900.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
    (user_id, client_id, true, 3500.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
    (user_id, client_id, true, 2400.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
    (user_id, client_id, false, 1700.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
    (user_id, client_id, false, 2900.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
    (user_id, client_id, false, 2000.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
    (user_id, client_id, false, 3300.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
    (user_id, client_id, false, 2600.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    (user_id, client_id, false, 1800.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    (user_id, client_id, false, 3100.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW()),
    (user_id, client_id, false, 2200.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW()),
    (user_id, client_id, false, 2700.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW()),
    (user_id, client_id, false, 1900.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW());
END $$; 