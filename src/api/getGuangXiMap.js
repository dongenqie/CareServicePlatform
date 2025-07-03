// src/api/getGuangXiMap.js
import axios from 'axios';

export default function getGuangXiMap() {
  return axios.get(
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
  );
}