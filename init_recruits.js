// init_recruits.js
const recruits = [
  {
    title: "[신입/경력] 스마트 솔루션 백엔드 개발자 채용",
    status: "채용중", // 모집중, 마감 등
    location: "서울 본사 (강남구)",
    type: "정규직",
    applyLink: "https://www.saramin.co.kr", // 실제 지원 링크 또는 회사 메일
    recruit_duties: [
      "스마트 팜/팩토리 통합 관제 플랫폼 백엔드 개발",
      "대용량 센서 데이터 수집 및 처리 시스템 구축",
      "RESTful API 설계 및 연동",
      "AWS 클라우드 인프라 운영 및 최적화"
    ],
    recruit_requirements: [
      "Java 및 Spring Boot 프레임워크 활용 능력 보유자",
      "RDBMS(MySQL/MariaDB) 및 NoSQL 활용 경험",
      "Git을 이용한 형상 관리 및 협업 경험",
      "원활한 커뮤니케이션 및 문제 해결 능력"
    ]
  },
  {
    title: "[경력] AI 컴퓨터 비전 연구원 모집",
    status: "채용중",
    location: "판교 연구소",
    type: "정규직",
    applyLink: "https://www.saramin.co.kr",
    recruit_duties: [
      "딥러닝 기반 이미지/영상 분석 알고리즘 개발",
      "제조 공정 내 불량 검출 모델 최적화 (Smart Factory)",
      "작물 생육 상태 및 병해충 진단 모델 연구 (Smart Farm)",
      "Edge Device 탑재를 위한 경량화 모델링"
    ],
    recruit_requirements: [
      "Computer Vision / Deep Learning 관련 경력 3년 이상",
      "Python, PyTorch, TensorFlow 활용 능숙자",
      "최신 논문 구현 및 알고리즘 커스터마이징 가능자",
      "C/C++ 기반 모델 배포 경험 우대"
    ]
  }
];

async function registerRecruits() {
  console.log("채용 공고 등록을 시작합니다...");

  for (const recruit of recruits) {
    try {
      const response = await fetch('http://localhost:8080/api/v1/recruits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recruit)
      });

      if (response.ok) {
        console.log(`[성공] ${recruit.title} 등록 완료`);
      } else {
        const errorText = await response.text();
        console.error(`[실패] ${recruit.title} 등록 실패: ${response.status}`, errorText);
      }
    } catch (error) {
      console.error(`[에러] ${recruit.title} 전송 중 오류:`, error.message);
    }
  }
}

registerRecruits();
