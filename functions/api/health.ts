// Cloudflare Pages Serverless Function
// Endpoint: /api/health

export async function onRequestGet() {
  const payload = {
    status: "healthy",
    platform: "NikshayDrishti (Assam TB Sentinel)",
    assameseTitle: "নিশ্চয় দৃষ্টি",
    problemStatement: "NESFIC-D-30 (Stream 1 — Government Track: Health Sector)",
    challengeTitle: "TB Risk Stratification & Programme Decision Support",
    challengeOwners: "National Health Mission (NHM) & State TB Cell, Department of Health & Family Welfare, Government of Assam",
    leadApplicant: "Kalyanjit Hatibaruah",
    organization: "Flugelsoft Labs",
    contactEmail: "kalyanjit.hatibaruah@gmail.com",
    githubRepo: "https://github.com/flugelsoft-01/tb-risk-stratification-ai",
    liveUrl: "https://nikshay-drishti.pages.dev/",
    edgeRuntime: "Cloudflare Pages Functions",
    cdssDisclaimer: "Risk outputs are decision-support only and must not replace clinical diagnosis or authorized programme decisions.",
    mlInferenceEngine: "XGBoost Multi-Variable Clinical Classifier (AUROC: 0.887)",
    explainabilityEngine: "SHAP Local Feature Weight Matrix Active",
    referralSLAEngine: "48-Hour Cold-Chain & Diagnostic Cascade Active",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
