-- Used EV Marketplace Analytics
-- Portfolio case study on simulated data.
-- Dialect: BigQuery Standard SQL.
-- Replace `portfolio.used_ev_marketplace` with your uploaded table name.

-- 1) Weekly business KPI scorecard
SELECT
  DATE(week_start) AS week_start,
  COUNT(*) AS listings,
  COUNTIF(status = 'Active') AS active_listings,
  COUNTIF(status = 'Sold') AS sold_listings,
  SAFE_DIVIDE(COUNTIF(status = 'Sold'), COUNT(*)) AS sell_through_rate,
  ROUND(AVG(ask_price_usd), 0) AS avg_ask_price_usd,
  APPROX_QUANTILES(ask_price_usd, 100)[OFFSET(50)] AS median_ask_price_usd,
  ROUND(AVG(days_on_market), 1) AS avg_days_on_market,
  ROUND(AVG(battery_health_pct), 1) AS avg_battery_health_pct
FROM `portfolio.used_ev_marketplace`
GROUP BY 1
ORDER BY 1;

-- 2) "Why did price move?" model-mix diagnostic
WITH weekly_model AS (
  SELECT
    DATE(week_start) AS week_start,
    make,
    model,
    COUNT(*) AS listings,
    AVG(ask_price_usd) AS avg_ask_price
  FROM `portfolio.used_ev_marketplace`
  GROUP BY 1,2,3
),
with_change AS (
  SELECT *,
    LAG(avg_ask_price) OVER (PARTITION BY make, model ORDER BY week_start) AS prior_avg_price,
    LAG(listings) OVER (PARTITION BY make, model ORDER BY week_start) AS prior_listings
  FROM weekly_model
)
SELECT
  week_start, make, model, listings,
  ROUND(avg_ask_price, 0) AS avg_ask_price,
  ROUND(SAFE_DIVIDE(avg_ask_price - prior_avg_price, prior_avg_price) * 100, 1) AS price_change_pct,
  listings - prior_listings AS listing_change
FROM with_change
WHERE prior_avg_price IS NOT NULL
ORDER BY week_start DESC, ABS(price_change_pct) DESC;

-- 3) Inventory flow by source
SELECT
  DATE(week_start) AS week_start,
  inventory_source,
  COUNT(*) AS listings,
  ROUND(AVG(ask_price_usd), 0) AS avg_ask_price,
  ROUND(AVG(days_on_market), 1) AS avg_days_on_market,
  ROUND(SAFE_DIVIDE(COUNTIF(status='Sold'), COUNT(*))*100, 1) AS sell_through_pct
FROM `portfolio.used_ev_marketplace`
GROUP BY 1,2
ORDER BY 1,2;

-- 4) Dealer operations view
SELECT
  dealer_type,
  COUNT(*) AS listings,
  ROUND(AVG(ask_price_usd), 0) AS avg_ask_price,
  ROUND(AVG(mileage), 0) AS avg_mileage,
  ROUND(AVG(days_on_market), 1) AS avg_days_on_market,
  ROUND(SAFE_DIVIDE(COUNTIF(status='Sold'), COUNT(*))*100, 1) AS sell_through_pct
FROM `portfolio.used_ev_marketplace`
GROUP BY 1
ORDER BY listings DESC;

-- 5) Pricing by model / model year
SELECT
  make, model, model_year,
  COUNT(*) AS listings,
  ROUND(AVG(ask_price_usd),0) AS avg_ask_price,
  ROUND(AVG(mileage),0) AS avg_mileage,
  ROUND(AVG(battery_health_pct),1) AS avg_battery_health_pct
FROM `portfolio.used_ev_marketplace`
GROUP BY 1,2,3
HAVING COUNT(*) >= 10
ORDER BY make, model, model_year DESC;
