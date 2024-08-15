import React, { ReactNode } from "react";

export interface SortConfig {
  key: keyof Subject; // keyof Subject gives you a union of all keys in Subject
  direction: "ascending" | "descending";
}

export interface Subject {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosisDate: string;
  status: string;
}

export interface ContainerProps {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  className?: string;
}

export interface FilterGroupProps {
  genderFilter: string | null;
  setGenderFilter: React.Dispatch<React.SetStateAction<string | null>>;
  statusFilter: string | null;
  setStatusFilter: React.Dispatch<React.SetStateAction<string | null>>;
  diagnosisDateFilter: string | null;
  setDiagnosisDateFilter: React.Dispatch<React.SetStateAction<string | null>>;
}
