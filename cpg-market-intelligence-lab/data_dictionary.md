# Dataset documentation

## Files
- `synthetic_cpg_monthly.csv`: monthly synthetic CPG performance records (240 observations).
- `synthetic_consumer_tracker.csv`: synthetic quarterly brand tracker (16 observations).

The sales CSV is generated at brand × retailer × month granularity, with `channel` describing the store or online grouping. Fields include `sales_usd`, `units`, `category_sales_usd`, `distribution_pct`, `advertising_spend_usd`, `attributed_sales_usd`, `site_visits`, and `online_orders`. The tracker includes fictional awareness, consideration and purchase-intent measures and synthetic respondent counts.

### Calculations
- **Category share**: sales / category sales for the selected scope.
- **Attributed ROAS**: attributed sales / ad spend, not an estimate of causal lift.
- **Online sales share**: online sales / all-channel sales.
- **Online conversion**: online orders / online site visits.
- **Distribution**: percentage-like generated indicator; avoid unqualified aggregation across retailers.

### Limits
All records, retailer and brand identities, campaign impacts and consumer responses are made up for educational demonstration. No licensed syndicated data or actual company data were used. Do not interpret simulated correlations as real-world causal effects.
