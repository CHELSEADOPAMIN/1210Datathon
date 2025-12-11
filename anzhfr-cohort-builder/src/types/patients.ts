// src/types/patient.ts

// 这里定义了我们清洗后的数据结构
export interface Patient {
  id: string;             // 我们会给每行数据一个身份证号
  
  // --- 人口统计 ---
  age: number;            // 年龄 (必须是数字)
  genderCode: string;     // 性别代码 ("1", "2", "3")
  
  // --- 临床特征 ---
  fractureType: string;   // 骨折类型代码 ("1", "2"...)
  surgeryDelay: string;   // 手术延迟/类型代码 (对应 op 变量)
  asaGrade: string;       // 身体评分 ("1"-"5")
  patientType: string;    // 病人类型 ("1"-"3")
  frailtyScore: string;   // 虚弱指数 ("1"-"10")
  
  // --- 医院与结果 ---
  hospitalCode: string;   // 医院代码 (对应 ahos_code)
  lengthOfStay: number;   // 住院天数
}