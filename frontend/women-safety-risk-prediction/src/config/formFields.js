export const formSections = [
  {
    section: "Victim Information",
    description: "Context provided by the individual",
    layout: "side-by-side",
    fields: [
      {
        name: "hour",
        label: "Hour of Day",
        type: "select",
        options: Array.from({ length: 24 }, (_, i) => ({ label: `${i.toString().padStart(2, '0')}:00`, value: i }))
      },
      {
        name: "day_of_week",
        label: "Day of Week",
        type: "select",
        options: [
          { label: "Sunday", value: 0 },
          { label: "Monday", value: 1 },
          { label: "Tuesday", value: 2 },
          { label: "Wednesday", value: 3 },
          { label: "Thursday", value: 4 },
          { label: "Friday", value: 5 },
          { label: "Saturday", value: 6 }
        ]
      },
      {
        name: "month",
        label: "Month",
        type: "select",
        options: [
          { label: "January", value: 0 },
          { label: "February", value: 1 },
          { label: "March", value: 2 },
          { label: "April", value: 3 },
          { label: "May", value: 4 },
          { label: "June", value: 5 },
          { label: "July", value: 6 },
          { label: "August", value: 7 },
          { label: "September", value: 8 },
          { label: "October", value: 9 },
          { label: "November", value: 10 },
          { label: "December", value: 11 }
        ]
      },
      {
        name: "season",
        label: "Season",
        type: "select",
        options: [
          { label: "Winter", value: "winter" },
          { label: "Summer", value: "summer" },
          { label: "Monsoon", value: "monsoon" }
        ]
      },
      {
        name: "area_type",
        label: "Area Type",
        type: "select",
        options: [
          { label: "Residential", value: "residential" },
          { label: "Commercial", value: "commercial" },
          { label: "Industrial", value: "industrial" },
          { label: "Slum", value: "slum" }
        ]
      },
      {
        name: "is_isolated_area",
        label: "Is the area isolated?",
        type: "checkbox"
      },
      {
        name: "holiday_flag",
        label: "Holiday",
        type: "checkbox"
      },
      {
        name: "festival_flag",
        label: "Festival",
        type: "checkbox"
      }
    ]
  },

  {
    section: "Authority Information",
    description: "Environmental and surveillance factors",
    layout: "side-by-side",
    fields: [
      {
        name: "noise_level",
        label: "Noise Level",
        type: "select",
        options: Array.from({ length: 10 }, (_, i) => ({ label: `Level ${i + 1}`, value: i + 1 }))
      },
      {
        name: "num_bars_within_radius",
        label: "Number of Bars Nearby",
        type: "select",
        options: Array.from({ length: 11 }, (_, i) => ({ label: `${i} bars`, value: i }))
      },
      {
        name: "streetlight_density",
        label: "Streetlight Density",
        type: "select",
        options: Array.from({ length: 11 }, (_, i) => ({ label: `Level ${i}`, value: i }))
      },
      {
        name: "cctv_density",
        label: "CCTV Density",
        type: "select",
        options: Array.from({ length: 11 }, (_, i) => ({ label: `Level ${i}`, value: i }))
      },
      {
        name: "dark_spots",
        label: "Number of Dark Spots",
        type: "select",
        options: Array.from({ length: 21 }, (_, i) => ({ label: `${i} spots`, value: i }))
      }
    ]
  }
];