import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { MapPin } from "lucide-react";
import ticketmasterLogo from "@/assets/ticketmaster-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Save Up To 90% on Ticketmaster" },
      {
        name: "description",
        content:
          "Qualify in minutes and save up to 90% on Ticketmaster tickets. Available in USA, UK, CA and AU.",
      },
      { property: "og:title", content: "Save Up To 90% on Ticketmaster" },
      {
        property: "og:description",
        content:
          "Qualify in minutes and save up to 90% on Ticketmaster tickets. Available in USA, UK, CA and AU.",
      },
    ],
  }),
  component: Index,
});

const DEFAULT_URL = "https://linkthem.net/aff_c?offer_id=3329&aff_id=16139";
const GB_URL = "https://giftclick.org/aff_c?offer_id=4101&aff_id=16139";

function Index() {
  useEffect(() => {
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d: { country_code?: string }) => {
        if (cancelled) return;
        const btn = document.getElementById("geoBtn") as HTMLAnchorElement | null;
        if (!btn) return;
        btn.href = d.country_code === "GB" ? GB_URL : DEFAULT_URL;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const steps = [
    "Answer a Few Simple Questions",
    "Drop In Your Ticketmaster Email",
    "Complete 3-5 Recommended Tasks",
    "Sit Back — We'll Get Back to You Within 24 Hours!",
  ];
  const locations = ["USA", "UK", "CA", "AU"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-3 md:py-6 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-800/20" />
        <div className="relative z-10 px-4 py-2 md:p-6">
          <img
            src={ticketmasterLogo}
            alt="Ticketmaster"
            className="h-8 md:h-10 object-contain"
          />
        </div>
        <div className="absolute top-10 right-10 w-4 h-4 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-white/15 rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-10 w-3 h-3 bg-white/25 rounded-full animate-pulse" />
      </header>

      {/* How to qualify */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Save Up To 90% on Ticketmaster!
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {locations.map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold"
                >
                  <MapPin size={16} />
                  {location}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12">
              HOW TO QUALIFY
            </h2>
            <div className="space-y-8 max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step} className="text-left">
                  <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                    <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-lg md:text-xl font-semibold text-slate-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <a
            id="geoBtn"
            href={DEFAULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: 500,
              background: "#ffffff",
              color: "#111111",
              border: "1px solid #cccccc",
              borderRadius: "10px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Apply Here
          </a>
        </div>
      </section>
    </div>
  );
}
