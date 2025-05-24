import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// IP별 사용량을 저장할 Map
const ipUsageMap = new Map<string, {
  count: number;
  lastReset: Date;
}>();

// 매일 자정에 사용량 초기화
setInterval(() => {
  const now = new Date();
  ipUsageMap.forEach((value, key) => {
    const lastReset = new Date(value.lastReset);
    if (now.getDate() !== lastReset.getDate()) {
      ipUsageMap.set(key, { count: 0, lastReset: now });
    }
  });
}, 1000 * 60 * 60); // 매시간 체크

app.post('/api/check-usage', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  
  // IP 사용량 정보가 없으면 초기화
  if (!ipUsageMap.has(ip)) {
    ipUsageMap.set(ip, { count: 0, lastReset: new Date() });
  }

  const usage = ipUsageMap.get(ip)!;
  
  if (usage.count >= 10) {
    res.status(429).json({
      error: '일일 사용 한도를 초과했습니다.',
      remainingTime: 24 - new Date().getHours()
    });
    return;
  }

  // 사용량 증가
  usage.count += 1;
  ipUsageMap.set(ip, usage);

  res.json({
    remainingCount: 10 - usage.count,
    totalCount: usage.count
  });
});

app.get('/api/usage-info', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const usage = ipUsageMap.get(ip);
  
  if (!usage) {
    res.json({ remainingCount: 10, totalCount: 0 });
    return;
  }

  res.json({
    remainingCount: 10 - usage.count,
    totalCount: usage.count
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 