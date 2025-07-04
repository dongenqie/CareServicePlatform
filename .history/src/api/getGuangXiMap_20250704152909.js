// src/api/getGuangXiMap.js
import axios from 'axios';

export default function getGuangXiMap() {
  return axios.get(
    'https://geo.datav.aliyun.com/areas_v3/bound/450000_full.json'
  );
}