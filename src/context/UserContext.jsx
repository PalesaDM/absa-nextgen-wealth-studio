import React, { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [profile, setProfile] = useState({
    fullName: "Lerato",
    city: "Johannesburg",
    grossIncome: 52000,
    pensionPct: 7.5,
    medicalAid: 2500,
    rent: 14000,
    otherFixed: 4000,
    debtPayments: 6200,
    emergencyFundTargetMonths: 3,
    timeHorizonYears: 5,
    selectedTrack: "first-property",
  });

  const value = useMemo(() => ({ profile, setProfile }), [profile]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}