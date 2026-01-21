// init_notices.js
const notices = [
  {
    title: "[보도] 2026년 상반기 신입/경력 공개 채용 안내",
    content: "안녕하세요, 보아스소프트입니다.\n\n2026년 상반기 신입 및 경력 사원 공개 채용을 실시합니다.\n미래를 함께 만들어갈 열정적인 인재 여러분의 많은 지원 바랍니다.\n\n1. 모집 분야\n- 백엔드 개발자 (Java/Spring)\n- 프론트엔드 개발자 (React)\n- AI 연구원 (Vision/NLP)\n\n2. 접수 기간\n- 2026.02.01 ~ 2026.02.14\n\n자세한 내용은 채용 페이지를 참고해 주세요.\n감사합니다."
  },
  {
    title: "[안내] 서버 점검 및 시스템 업데이트 안내 (1/25)",
    content: "안녕하세요. 보아스소프트 기술지원팀입니다.\n\n보다 안정적인 서비스 제공을 위해 정기 서버 점검이 진행될 예정입니다.\n점검 시간 동안 일부 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.\n\n- 일시: 2026년 1월 25일 (일) 02:00 ~ 06:00 (4시간)\n- 대상: 전체 서비스\n\n최선을 다해 신속하게 작업을 완료하겠습니다.\n감사합니다."
  },
  {
    title: "[제품] '보아스 자율주행 로봇 M1' KC 인증 획득",
    content: "보아스소프트의 자율주행 물류 로봇 'Boas-M1 Robot'이 국가통합인증마크(KC)를 획득했습니다.\n\n이번 인증을 통해 M1 로봇의 안전성과 품질을 공식적으로 인정받게 되었습니다.\n앞으로도 더욱 신뢰할 수 있는 제품을 만들기 위해 노력하겠습니다.\n\n관련 문의: 02-1234-5678"
  },
  {
    title: "[행사] 2026 국제 스마트 팩토리 엑스포 참가 안내",
    content: "보아스소프트가 오는 3월 코엑스에서 열리는 '2026 국제 스마트 팩토리 엑스포'에 참가합니다.\n\n당사의 최신 AI 비전 검사기와 예지 보전 솔루션을 직접 체험해 보실 수 있습니다.\n많은 관심과 방문 부탁드립니다.\n\n- 기간: 2026.03.10 ~ 03.12\n- 장소: 코엑스 A홀, 부스 A-102"
  },
  {
    title: "[소식] 보아스소프트, 기술혁신형 중소기업(Inno-Biz) 선정",
    content: "보아스소프트가 중소벤처기업부로부터 '기술혁신형 중소기업(Inno-Biz)' 인증을 획득했습니다.\n\n끊임없는 R&D 투자와 기술 개발 노력을 인정받은 결과입니다.\n앞으로도 기술 혁신을 통해 고객에게 최고의 가치를 제공하겠습니다."
  }
];

async function registerNotices() {
  console.log("공지사항 등록을 시작합니다...");

  for (const notice of notices) {
    try {
      const formData = new FormData();
      formData.append('title', notice.title);
      formData.append('content', notice.content);
      // 파일은 선택 사항이므로 추가하지 않음

      const response = await fetch('http://localhost:8080/api/v1/notices', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log(`[성공] ${notice.title} 등록 완료`);
      } else {
        const errorText = await response.text();
        console.error(`[실패] ${notice.title} 등록 실패: ${response.status}`, errorText);
      }
    } catch (error) {
      console.error(`[에러] ${notice.title} 전송 중 오류:`, error.message);
    }
  }
}

registerNotices();
