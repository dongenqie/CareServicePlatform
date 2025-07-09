// src/api/process.js
import axios from 'axios';

const BASE = 'http://localhost:8080/api';
const getToken = () => localStorage.getItem('token');

/**
 * 导出指定表数据
 */
export async function exportTable({ tableName, format, filename }) {
  // 1. 校验参数
  if (!tableName) throw new Error('表名(tableName)不能为空');
  if (!format) throw new Error('导出格式(format)不能为空');
  if (!['excel', 'csv'].includes(format)) throw new Error('仅支持excel或csv格式');

  // 2. 正确发送请求（移除null参数）
  const res = await axios.get(
    `${BASE}/export/table`,
    { 
      params: { tableName, format, filename }, 
      responseType: 'blob' 
    }
  );
  // 触发浏览器下载
  const ext = format === 'excel' ? '.xlsx' : '.csv';
  const name = (filename || `${tableName}_data`) + ext;
  const blob = new Blob([res.data], { type: res.headers['content-type'] });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

/**
 * 数据清洗（预览返回 JSON）
 */
export async function cleanData({ file, format, targetColumn, dependentColumns }) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  form.append('format', format);
  form.append('targetColumn', targetColumn);
  
  // 确保 dependentColumns 是数组，如果没有依赖列，传递空数组
  const cols = dependentColumns && Array.isArray(dependentColumns) ? dependentColumns : [];

  cols.forEach(col => form.append('dependentColumns', col));

  try {
    const response = await axios.post(
      `${BASE}/data-clean/clean`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;  // 整个 AxiosResponse，里面有 response.data.code / .message / .data
  } catch (err) {
    console.error('cleanData 接口调用失败', err);
    throw err;
  }
}

/**
 * 清洗并导出
 */
export async function cleanExport({
  file,
  format,
  targetColumn,
  dependentColumns,
  exportFormat,
  filename
}) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  form.append('format', format);
  form.append('targetColumn', targetColumn);

  // 确保 dependentColumns 是数组，如果没有依赖列，传递空数组
  const cols = dependentColumns && Array.isArray(dependentColumns) ? dependentColumns : [];

  cols.forEach(col => form.append('dependentColumns', col));

  form.append('exportFormat', exportFormat);
  if (filename) form.append('filename', filename);

  const res = await axios.post(
    `${BASE}/data-clean/clean/export`,
    form,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    }
  );

  // 下载
  const ext = exportFormat === 'excel' ? '.xlsx' : '.csv';
  const name = (filename || 'cleaned_health_data') + ext;
  const blob = new Blob([res.data], { type: res.headers['content-type'] });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

/**
 * 去重（预览返回 JSON）
 */
export async function removeDuplicates({ file, format, primaryKeyColumns, duplicateCheckColumns }) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  form.append('format', format);
  primaryKeyColumns.forEach(col => form.append('primaryKeyColumns', col));
  duplicateCheckColumns.forEach(col => form.append('duplicateCheckColumns', col));
  const res = await axios.post(
    `${BASE}/data-clean/remove-duplicates`,
    form,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

/**
 * 去重并导出
 */
export async function removeDuplicatesExport({
  file,
  format,
  primaryKeyColumns,
  duplicateCheckColumns,
  exportFormat,
  filename
}) {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  form.append('format', format);
  primaryKeyColumns.forEach(col => form.append('primaryKeyColumns', col));
  duplicateCheckColumns.forEach(col => form.append('duplicateCheckColumns', col));
  form.append('exportFormat', exportFormat);
  if (filename) form.append('filename', filename);
  const res = await axios.post(
    `${BASE}/data-clean/remove-duplicates/export`,
    form,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    }
  );
  // 下载
  const ext = exportFormat === 'excel' ? '.xlsx' : '.csv';
  const name = (filename || 'deduplicated_health_data') + ext;
  const blob = new Blob([res.data], { type: res.headers['content-type'] });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}