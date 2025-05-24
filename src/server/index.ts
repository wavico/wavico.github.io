import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';

dotenv.config();

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

// 파일 업로드를 위한 multer 설정
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB 제한
  }
});

// 이메일 전송을 위한 nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wavicomanager@gmail.com',
    pass: process.env.EMAIL_PASSWORD // Gmail 앱 비밀번호 필요
  }
});

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

// 문의하기 API 엔드포인트
app.post('/api/contact', upload.array('files'), async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;
    const files = req.files as Express.Multer.File[];

    // 이메일 본문 구성
    const emailContent = `
      새로운 문의가 접수되었습니다.

      이름: ${name}
      이메일: ${email}
      연락처: ${phone}
      회사명: ${company || '미입력'}
      서비스 항목: ${service}
      
      문의 내용:
      ${message}
    `;

    // 이메일 옵션 설정
    const mailOptions = {
      from: 'wavicomanager@gmail.com',
      to: 'wavicomanager@gmail.com',
      subject: `[Wavico] 새로운 문의 - ${name}님`,
      text: emailContent,
      attachments: files ? files.map(file => ({
        filename: file.originalname,
        content: file.buffer
      })) : []
    };

    // 이메일 발송
    await transporter.sendMail(mailOptions);

    // 자동 응답 이메일 발송
    const autoReplyOptions = {
      from: 'wavicomanager@gmail.com',
      to: email,
      subject: '[Wavico] 문의가 접수되었습니다.',
      text: `
        ${name}님, 문의해 주셔서 감사합니다.

        문의하신 내용이 정상적으로 접수되었습니다.
        검토 후 빠른 시일 내에 답변 드리도록 하겠습니다.

        문의하신 내용:
        ${message}

        감사합니다.
        Wavico 팀 드림
      `
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({ success: true, message: '문의가 성공적으로 접수되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    res.status(500).json({ 
      success: false, 
      message: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 