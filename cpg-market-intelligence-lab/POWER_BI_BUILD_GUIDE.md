# Power BI build guide — not yet a completed Power BI report

The published lab is a standalone HTML dashboard, **not** a `.pbix` report. To demonstrate Power BI skills, implement and validate the following in Power BI Desktop.

1. Import `synthetic_cpg_monthly.csv` with Power Query. Set `month` to Date; numeric fields to whole/decimal as appropriate; clean and validate `brand`, `retailer`, and `channel`.
2. Import `synthetic_consumer_tracker.csv` separately. Avoid joining quarterly tracker rows to monthly retail data without an explicit grain and relationship.
3. Define measures for SUM(sales_usd), SUM(units), SUM(category_sales_usd), SUM(advertising_spend_usd), SUM(attributed_sales_usd), SUM(online_orders), and SUM(site_visits).
4. Category Share = DIVIDE([Sales], [Category Sales]); Attributed ROAS = DIVIDE([Attributed Sales], [Advertising Spend]); Online Conversion = DIVIDE([Online Orders], [Site Visits]), filtering online channel as appropriate.
5. Build brand, retailer, month and channel slicers, a monthly sales trend, retailer breakdown, online conversion and ROAS comparisons, and an executive summary tab.
6. Reconcile dashboard totals to CSV aggregates. Test selections with no records and zero denominators; document blank handling and calculation assumptions.

### Disclosure
All records are synthetic and do not represent actual CPG company performance. The HTML demonstration cannot be presented as hands-on Power BI dashboard-development experience.
