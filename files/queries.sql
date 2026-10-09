-- QA dispositions reconcile to the raw exported row count.
SELECT primary_reason, COUNT(*) AS row_count
FROM qa_flags
GROUP BY primary_reason
ORDER BY primary_reason;

-- LEFT JOIN preserves open quotas even when no valid responses exist in a segment.
SELECT q.age_group, q.target, COUNT(r.response_id) AS valid_completes,
       MAX(0, q.target - COUNT(r.response_id)) AS remaining
FROM quotas q
LEFT JOIN responses_clean r ON r.age_group = q.age_group
GROUP BY q.age_group, q.target
ORDER BY q.age_group;

-- Descriptive ratings only; the data are synthetic, not audience evidence.
SELECT concept, COUNT(*) AS n,
       SUM(CASE WHEN watch_intent >= 4 THEN 1 ELSE 0 END) AS top_two_count,
       AVG(CASE WHEN watch_intent >= 4 THEN 1.0 ELSE 0.0 END) AS top_two_rate,
       AVG(watch_intent) AS mean_watch_intent
FROM responses_clean
GROUP BY concept
ORDER BY concept;
