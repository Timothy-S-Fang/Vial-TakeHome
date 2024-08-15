import { Subject } from "../types/AppTypes";

export const subjectCategories: Array<{ label: string, key: keyof Subject }> = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Diagnosis Date", key: "diagnosisDate" },
    { label: "Status", key: "status" },
  ];

export const itemsPerPage = 12;