import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [profile, setProfile] = useState({
    // Identity 
    fullName: "Dumisani",
    city: "Johannesburg",

    // Recently viewed studios
    recentStudios: [], 

    // Money Snapshot inputs
    grossIncome: 58000,
    pensionPct: 7.5,
    rent: 14000,
    medicalAid: 2500,
    otherFixed: 4000,
    debtPayments: 6200,

    // Property track targets
    emergencyFundTargetMonths: 3,
    propertyDepositTarget: 180000,
    propertyPriceAssumption: 1400000,
    depositPctAssumption: 10,

    // Behaviour
    timeHorizonYears: 5,
    selectedTrack: "first-property",
  });

  
  const markStudioViewed = useCallback((studioSlug) => {
    setProfile((prev) => {
      const current = prev.recentStudios || [];
      const next = [studioSlug, ...current.filter((x) => x !== studioSlug)].slice(0, 3);
      return { ...prev, recentStudios: next };
    });
  }, []);

  const value = useMemo(
    () => ({ profile, setProfile, markStudioViewed }),
    [profile, markStudioViewed]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}