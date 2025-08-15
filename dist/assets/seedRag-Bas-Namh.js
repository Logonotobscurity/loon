import{upsertDocuments as t}from"./rag-P8BL18dA.js";import{m as r}from"./index-CSW6HbgF.js";import"./ui-vendor-C4qZ8Q2m.js";import"./react-vendor-xPw_Iu3c.js";import"./3d-vendor-DN_SUjjT.js";function n(e){const o=`LOG_ON Agent
${[`Name: ${e.name}`,`Category: ${e.category}${e.industry?` (${e.industry})`:""}`,`Description: ${e.description}`,`Tags: ${e.tags.join(", ")}`].join(`
`)}`;return{id:`mp_${e.id}`,text:o}}const s=[{id:"sop_report_automation",text:`SOP: Monthly Report Automation
Process: ETL e Transform e Schedule e Deliver
Tools: Airflow (free) or LOG_ON ReportBot Agent
Steps: 1) Define data sources, 2) Build extract jobs, 3) Schedule DAG, 4) Publish dashboard, 5) Send alerts.`},{id:"sop_invoice_processing",text:`SOP: Invoice Processing
Process: Capture e Validate e Post e Reconcile
Tools: OpenRefine (free) or LOG_ON SAP Integration Connector
Checks: Duplicate detection, Vendor match, Tax/GL coding.`}];function p(){try{const e=[...s,...r.slice(0,40).map(n)];t(e)}catch(e){console.warn("RAG seeding failed:",e)}}export{p as seedRagKnowledgeBase};
