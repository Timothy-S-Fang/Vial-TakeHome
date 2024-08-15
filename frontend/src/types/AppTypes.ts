import { ReactNode } from "react";

export interface SortConfig {
  key: keyof Subject; 
  direction: "ascending" | "descending" | null;
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

export interface FilterCriteria {
  gender: string | null;
  status: string | null;
}

export interface ContainerProps {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  className?: string;
}