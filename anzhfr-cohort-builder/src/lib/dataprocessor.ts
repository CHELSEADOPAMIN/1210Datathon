import { Patient } from "@/types/patients";

// 🔧 小工具 1：处理数字
// 作用：如果是数字就保留；如果是空的或者乱码，就变成 -1 (代表缺失)
const parseNumber = (value: any): number => {
  if (!value) return -1;
  const num = parseInt(value); // 尝试转成整数
  return isNaN(num) ? -1 : num;
};

// 🔧 小工具 2：处理字符串
// 作用：去掉首尾空格。如果是空的，就变成 "Unknown"
const cleanString = (value: any): string => {
  if (value === null || value === undefined) return "Unknown";
  const str = String(value).trim();
  if (str === "" || str === "NA" || str === "NULL") return "Unknown";
  return str;
};

// 🧼 大清洗函数：把 CSV 的一行原始数据 (row) 变成干净的 Patient 对象
export const transformRow = (row: any, index: number): Patient => {

  return {
    // 给每行数据生成一个 ID，方便 React 渲染
    id: `p-${index}`,

    // --- 开始清洗每一列 ---
    // 左边是我们的标准名，右边 row.xxx 必须对应你的 CSV 表头变量名！

    age: parseNumber(row.age),

    // 注意：CSV 里叫 sex，我们要把它洗进 genderCode
    genderCode: cleanString(row.sex),

    // 对应 ftype
    fractureType: cleanString(row.ftype),

    // 对应 op (你确认 op 是延迟原因)
    surgeryDelay: cleanString(row.op),

    // 对应 asa
    asaGrade: cleanString(row.asa),

    // 对应 ptype
    patientType: cleanString(row.ptype), // 修正：这里应该是 rawRow.ptype 还是 row.ptype? 上面参数名是 row，所以这里用 row.ptype

    // 对应 frailty (或者叫 cfs，请看你的 CSV 表头确认一下)
    frailtyScore: cleanString(row.frailty),

    // 对应 ahos_code
    hospitalCode: cleanString(row.ahos_code),

    // 对应 hdisch_datediff (住院时长)
    lengthOfStay: parseNumber(row.hdisch_datediff)
  };
};
