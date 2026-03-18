"use client";

import { useState } from "react";
import ApplicationWizard from "./ApplicationWizard";
import ApplicationFAQ from "./ApplicationFAQ";
import ApplicationSummary from "./ApplicationSummary";

export default function ApplyClient() {
  const [selectedProperty, setSelectedProperty] = useState("");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <ApplicationWizard onPropertyChange={setSelectedProperty} />
      <div className="space-y-6">
        <ApplicationSummary selectedProperty={selectedProperty} />
        <ApplicationFAQ />
      </div>
    </div>
  );
}
