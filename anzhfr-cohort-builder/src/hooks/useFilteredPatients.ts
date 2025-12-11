import { useMemo } from 'react';
import { Patient } from '@/types/patients';
import { useDemographicsStore } from '@/store/useDemographicsStore';
import { useClinicalStore } from '@/store/useClinicalStore';
import { useCohortStore, CohortCriteria } from '@/store/useCohortStore';

/**
 * 纯函数：根据给定的筛选标准过滤数据
 */
function filterDataByCriteria(allPatients: Patient[], criteria: CohortCriteria): Patient[] {
  if (!allPatients || allPatients.length === 0) return [];

  const {
    ageRange,
    selectedGenders,
    selectedFractureTypes,
    selectedDelayReasons,
    selectedASAGrades,
    selectedPatientTypes,
    selectedFrailtyScores,
    selectedWeightBearings,
    selectedHospital,
  } = criteria;

  return allPatients.filter((patient) => {
    // 1. Age
    if (patient.age < ageRange[0] || patient.age > ageRange[1]) return false;

    // 2. Gender
    if (selectedGenders.length > 0 && !selectedGenders.includes(patient.genderCode)) return false;

    // 3. Clinical
    if (selectedFractureTypes.length > 0 && !selectedFractureTypes.includes(patient.fractureType)) return false;
    if (selectedDelayReasons.length > 0 && !selectedDelayReasons.includes(patient.surgeryDelay)) return false;
    if (selectedASAGrades.length > 0 && !selectedASAGrades.includes(patient.asaGrade)) return false;
    if (selectedPatientTypes.length > 0 && !selectedPatientTypes.includes(patient.patientType)) return false;
    if (selectedFrailtyScores.length > 0 && !selectedFrailtyScores.includes(patient.frailtyScore)) return false;
    if (selectedWeightBearings.length > 0 && !selectedWeightBearings.includes(patient.weightBearing)) return false;

    // 4. Hospital
    if (selectedHospital && patient.hospitalCode !== selectedHospital) return false;

    return true;
  });
}

/**
 * Hook: 返回主视图数据和对比视图数据
 */
export function useFilteredPatients(allPatients: Patient[]) {
  // 1. Current State (Primary)
  const demographics = useDemographicsStore();
  const clinical = useClinicalStore();
  
  // 2. Saved State (Secondary)
  const { savedCohorts, comparisonCohortId } = useCohortStore();

  return useMemo(() => {
    // A. 计算当前视图数据 (Primary)
    const currentCriteria: CohortCriteria = {
      ageRange: demographics.ageRange,
      selectedGenders: demographics.selectedGenders,
      selectedFractureTypes: clinical.selectedFractureTypes,
      selectedDelayReasons: clinical.selectedDelayReasons,
      selectedASAGrades: clinical.selectedASAGrades,
      selectedPatientTypes: clinical.selectedPatientTypes,
      selectedFrailtyScores: clinical.selectedFrailtyScores,
      selectedWeightBearings: clinical.selectedWeightBearings,
      selectedHospital: clinical.selectedHospital,
    };

    const primaryData = filterDataByCriteria(allPatients, currentCriteria);

    // B. 计算对比视图数据 (Secondary)
    let secondaryData: Patient[] = [];
    let secondaryLabel = null;

    if (comparisonCohortId) {
      const comparisonCohort = savedCohorts.find(c => c.id === comparisonCohortId);
      if (comparisonCohort) {
        secondaryData = filterDataByCriteria(allPatients, comparisonCohort.criteria);
        secondaryLabel = comparisonCohort.name;
      }
    }

    return {
      primaryData,
      secondaryData,
      secondaryLabel, // e.g. "High Risk Group"
      isComparing: !!comparisonCohortId,
    };
  }, [
    allPatients,
    // Primary Dependencies
    demographics.ageRange,
    demographics.selectedGenders,
    clinical.selectedFractureTypes,
    clinical.selectedDelayReasons,
    clinical.selectedASAGrades,
    clinical.selectedPatientTypes,
    clinical.selectedFrailtyScores,
    clinical.selectedWeightBearings,
    clinical.selectedHospital,
    // Secondary Dependencies
    savedCohorts,
    comparisonCohortId
  ]);
}
