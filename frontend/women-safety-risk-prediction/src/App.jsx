import { useState } from "react";
import { formSections } from "./config/formFields";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const buildPayload = (data) => {
    const payload = {
      hour: 0,
      day_of_week: 0,
      month: 0,
      holiday_flag: 0,
      festival_flag: 0,
      latitude: 0,
      longitude: 0,
      population_density: 0,
      female_population_ratio: 0,
      distance_to_police_station: 0,
      distance_to_hospital: 0,
      is_isolated_area: 0,
      streetlight_density: 0,
      cctv_density: 0,
      dark_spots: 0,
      noise_level: 0,
      num_bars_within_radius: 0,
      crime_count_last_7_days: 0,
      crime_count_last_30_days: 0,
      crime_count_last_year: 0,
      crime_density_per_sqkm: 0,
      sexual_harassment_cases_30d: 0,
      kidnapping_cases_30d: 0,
      domestic_violence_reports_30d: 0,
      eve_teasing_reports_30d: 0,
      robbery_cases_30d: 0,
      assault_cases_30d: 0,
      avg_severity_score: 0,
      SOS_reports_last_week: 0,
      public_complaints_last_month: 0,
      season_monsoon: 0,
      season_summer: 0,
      season_winter: 0,
      area_type_industrial: 0,
      area_type_residential: 0,
      area_type_slum: 0
    };

    // basic mappings from form data
    if (data.hour !== undefined && data.hour !== "") payload.hour = Number(data.hour);
    if (data.day_of_week !== undefined && data.day_of_week !== "") payload.day_of_week = Number(data.day_of_week);
    if (data.month !== undefined && data.month !== "") payload.month = Number(data.month);

    payload.holiday_flag = Number(data.holiday_flag) || 0;
    payload.festival_flag = Number(data.festival_flag) || 0;
    payload.is_isolated_area = Number(data.is_isolated_area) || 0;

    [
      "noise_level",
      "num_bars_within_radius",
      "streetlight_density",
      "cctv_density",
      "dark_spots"
    ].forEach((k) => {
      if (data[k] !== undefined && data[k] !== "") payload[k] = Number(data[k]);
    });

    // season -> one-hot
    if (data.season) {
      if (data.season === "monsoon") payload.season_monsoon = 1;
      if (data.season === "summer") payload.season_summer = 1;
      if (data.season === "winter") payload.season_winter = 1;
    }

    // area_type -> one-hot
    if (data.area_type) {
      if (data.area_type === "industrial") payload.area_type_industrial = 1;
      if (data.area_type === "residential") payload.area_type_residential = 1;
      if (data.area_type === "slum") payload.area_type_slum = 1;
    }

    return payload;
  };

  const predict = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const payload = buildPayload(formData);
      console.log("Predict payload:", payload);

      const res = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || `Server error ${res.status}`);
        setLoading(false);
        return;
      }

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const riskMeta = {
    0: { label: "Low Risk", color: "#22c55e" },
    1: { label: "Medium Risk", color: "#f59e0b" },
    2: { label: "High Risk", color: "#ef4444" }
  };

  return (
    <div className="container">
      <h1 className="title">Women Safety Risk Prediction</h1>

      <div className="sections-wrapper">
        {formSections.map((section) => (
        <div className="section" key={section.section}>
          <h2 className="section-heading">{section.section}</h2>
          <p className="section-desc">{section.description}</p>

          <div className={`fields-container ${section.layout === "side-by-side" ? "two-column" : "single-column"}`}>
            {section.fields.map((field) => (
              <div className="form-group" key={field.name}>
                {field.type !== "checkbox" && <label>{field.label}</label>}

                {field.type === "select" && (
                  <select
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "checkbox" && (
                  <div className="checkbox-wrapper">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked ? 1 : 0)
                        }
                      />
                      <span className="checkbox-label">{field.label}</span>
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>

      <div style={{ width: "100%", marginTop: 16 }}>
        <button
          type="button"
          className="advanced-toggle"
          onClick={() => setShowAdvanced((s) => !s)}
        >
          {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
        </button>

        {showAdvanced && (
          <div className="advanced-panel">
            <h3 className="section-heading">Advanced Information</h3>
            <p className="section-desc">Optional contextual and crime statistics</p>
            <div className="fields-container two-column">
              {[
                { name: "latitude", label: "Latitude" },
                { name: "longitude", label: "Longitude" },
                { name: "population_density", label: "Population Density" },
                { name: "female_population_ratio", label: "Female Population Ratio" },
                { name: "distance_to_police_station", label: "Distance to Police Station (km)" },
                { name: "distance_to_hospital", label: "Distance to Hospital (km)" },
                { name: "crime_count_last_7_days", label: "Crime Count (7 days)" },
                { name: "crime_count_last_30_days", label: "Crime Count (30 days)" },
                { name: "crime_count_last_year", label: "Crime Count (1 year)" },
                { name: "crime_density_per_sqkm", label: "Crime Density (per sqkm)" },
                { name: "sexual_harassment_cases_30d", label: "Sexual Harassment (30d)" },
                { name: "kidnapping_cases_30d", label: "Kidnapping (30d)" },
                { name: "domestic_violence_reports_30d", label: "Domestic Violence (30d)" },
                { name: "eve_teasing_reports_30d", label: "Eve Teasing (30d)" },
                { name: "robbery_cases_30d", label: "Robbery (30d)" },
                { name: "assault_cases_30d", label: "Assault (30d)" },
                { name: "avg_severity_score", label: "Average Severity Score" },
                { name: "SOS_reports_last_week", label: "SOS Reports (last week)" },
                { name: "public_complaints_last_month", label: "Public Complaints (last month)" }
              ].map((f) => (
                <div className="form-group" key={f.name}>
                  <label>{f.label}</label>
                  <input
                    type="number"
                    onChange={(e) => handleChange(f.name, e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={predict} disabled={loading}>
        {loading ? "Analyzing..." : "Predict Risk"}
      </button>

      {error && (
        <div className="result" style={{ borderColor: "#ef4444" }}>
          <h3 style={{ color: "#ef4444" }}>{error}</h3>
        </div>
      )}

      {result && result.risk_level != null && riskMeta[result.risk_level] && (
        <div
          className="result"
          style={{ borderColor: riskMeta[result.risk_level].color }}
        >
          <h2 style={{ color: riskMeta[result.risk_level].color }}>
            {riskMeta[result.risk_level].label}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;