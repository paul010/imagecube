'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';

const countries = [
  { code: 'CN', name: '中国', prefix: '+86', pattern: '1[3-9]\\d{9}' },
  { code: 'US', name: '美国', prefix: '+1', pattern: '[2-9]\\d{9}' },
  { code: 'UK', name: '英国', prefix: '+44', pattern: '7\\d{9}' },
  { code: 'JP', name: '日本', prefix: '+81', pattern: '[789]0\\d{8}' },
  { code: 'KR', name: '韩国', prefix: '+82', pattern: '1\\d{8}' },
];

export default function PhoneGenerator() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [generatedNumber, setGeneratedNumber] = useState('');
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const generatePhoneNumber = (pattern: string) => {
    let result = '';
    const regex = new RegExp(pattern.replace(/\\d/g, '\\d'));
    
    // 解析模式并生成号码
    const parts = pattern.split(/[{}[\]\\]/);
    let currentIndex = 0;
    
    while (currentIndex < pattern.length) {
      if (pattern[currentIndex] === '[') {
        // 处理字符类 [3-9]
        const closeBracket = pattern.indexOf(']', currentIndex);
        const chars = pattern.slice(currentIndex + 1, closeBracket).split('-');
        if (chars.length === 2) {
          const start = parseInt(chars[0]);
          const end = parseInt(chars[1]);
          result += Math.floor(Math.random() * (end - start + 1) + start);
        } else {
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          result += randomChar;
        }
        currentIndex = closeBracket + 1;
      } else if (pattern.slice(currentIndex).startsWith('\\d')) {
        // 处理 \d
        result += Math.floor(Math.random() * 10);
        currentIndex += 2;
      } else if (pattern.slice(currentIndex).startsWith('{')) {
        // 处理重复次数 {9}
        const closeBrace = pattern.indexOf('}', currentIndex);
        const count = parseInt(pattern.slice(currentIndex + 1, closeBrace));
        for (let i = 0; i < count; i++) {
          result += Math.floor(Math.random() * 10);
        }
        currentIndex = closeBrace + 1;
      } else {
        // 处理普通字符
        result += pattern[currentIndex];
        currentIndex++;
      }
    }

    // 验证生成的号码是否符合模式
    if (!regex.test(result)) {
      return generatePhoneNumber(pattern); // 重试
    }

    return result;
  };

  const handleGenerate = () => {
    const number = generatePhoneNumber(selectedCountry.pattern);
    setGeneratedNumber(selectedCountry.prefix + ' ' + number);
  };

  const handleCopy = async () => {
    if (generatedNumber) {
      await navigator.clipboard.writeText(generatedNumber);
      setShowCopyAlert(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <Typography variant="h1" component="h1" gutterBottom align="center" 
        sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 'bold', mb: 4 }}>
        随机电话号码生成器
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 6 }}>
        生成符合各国格式规范的随机电话号码，支持多个国家和地区的号码格式。
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="country-select-label">选择国家/地区</InputLabel>
            <Select
              labelId="country-select-label"
              value={selectedCountry.code}
              label="选择国家/地区"
              onChange={(e) => setSelectedCountry(countries.find(c => c.code === e.target.value) || countries[0])}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name} ({country.prefix})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="生成的号码"
            value={generatedNumber}
            InputProps={{
              readOnly: true,
            }}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleGenerate}
              startIcon={<RefreshIcon />}
              fullWidth
            >
              生成号码
            </Button>
            <Button
              variant="outlined"
              onClick={handleCopy}
              startIcon={<ContentCopyIcon />}
              disabled={!generatedNumber}
              fullWidth
            >
              复制号码
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          使用说明
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>选择需要生成号码的国家/地区</li>
          <li>点击"生成号码"按钮获取随机号码</li>
          <li>使用"复制号码"按钮复制到剪贴板</li>
          <li>生成的号码符合选定国家的号码格式规范</li>
          <li>注意：生成的号码仅用于测试用途，不是真实的可用号码</li>
        </Typography>
      </Paper>

      <Snackbar
        open={showCopyAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopyAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          号码已复制到剪贴板
        </Alert>
      </Snackbar>
    </Box>
  );
} 