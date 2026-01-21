// init_products.js
const products = [
  {
    category: "Smart Farm",
    title: "보아스 스마트 팜 디지털 트윈",
    description: "작물 생육 데이터를 AI로 분석하여 최적의 환경을 제공하는 디지털 트윈 솔루션",
    detail: "빅데이터 기반의 생육 레시피를 제공하며, 스마트폰 하나로 농장의 모든 시설을 원격 제어할 수 있습니다. 에너지 효율을 30% 이상 절감합니다.",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=800",
    isMainFeatured: "true",
    specs: JSON.stringify([
      { icon: "FaLeaf", label: "생산성", highlight: "+40%", text: "생산성 향상" },
      { icon: "FaMobileAlt", label: "제어", highlight: "앱 지원", text: "원격 제어 지원" }
    ]),
    features: JSON.stringify([
      { title: "환경 자율 제어", desc: "AI가 실시간 환경 변화를 감지하여 장비를 제어합니다." },
      { title: "생육 데이터 분석", desc: "작물의 성장 단계를 예측하고 리포트를 제공합니다." }
    ])
  },
  {
    category: "Smart Factory",
    title: "보아스 AI 산업용 비전 검사기",
    description: "초고속 카메라와 딥러닝으로 제조 라인의 불량품을 99.9% 검출하는 AI 비전 검사 솔루션",
    detail: "육안으로 확인하기 힘든 미세 결함을 0.1초 만에 판별합니다. 기존 장비에 쉽게 연동 가능하며, 비정형 불량 데이터까지 스스로 학습합니다.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    isMainFeatured: "true",
    specs: JSON.stringify([
      { icon: "FaBrain", label: "정확도", highlight: "99.9%", text: "검출 정확도" },
      { icon: "FaBolt", label: "속도", highlight: "0.1초", text: "초고속 처리" }
    ]),
    features: JSON.stringify([
      { title: "딥러닝 검사", desc: "비정형 패턴까지 학습하여 불량 검출" },
      { title: "실시간 모니터링", desc: "대시보드를 통한 라인 현황 파악" }
    ])
  },
  {
    category: "Smart Mobility",
    title: "보아스 자율주행 물류 로봇 M1",
    description: "복잡한 물류 환경에서 자율 주행으로 화물을 운송하는 스마트 AMR 로봇",
    detail: "LiDAR와 SLAM 기술을 적용하여 사람과 장애물을 안전하게 회피합니다. 최대 500kg 적재가 가능하며 엘리베이터와 연동됩니다.",
    image: "https://images.unsplash.com/photo-1519681393798-38e43269d877?auto=format&fit=crop&q=80&w=800",
    isMainFeatured: "true",
    specs: JSON.stringify([
      { icon: "FaMobileAlt", label: "적재량", highlight: "500kg", text: "최대 적재량" },
      { icon: "FaDatabase", label: "주행", highlight: "자율주행", text: "SLAM 기술 적용" }
    ]),
    features: JSON.stringify([
      { title: "경로 최적화", desc: "최단 거리 이동 경로 자동 생성" },
      { title: "자동 충전", desc: "배터리 부족 시 스테이션 자동 복귀" }
    ])
  },
  {
    category: "Smart Building",
    title: "보아스 클라우드 에너지 관리 시스템",
    description: "건물 에너지 사용 패턴을 학습하여 비용을 절감하는 클라우드 기반 관리 솔루션",
    detail: "전력, 공조, 조명 사용 패턴을 AI가 학습하여 최적의 에너지 효율을 찾아냅니다. 탄소 배출량 모니터링 및 ESG 리포트를 제공합니다.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    isMainFeatured: "true",
    specs: JSON.stringify([
      { icon: "FaCloud", label: "방식", highlight: "SaaS", text: "클라우드 서비스" },
      { icon: "FaLeaf", label: "절감율", highlight: "20%", text: "에너지 절감" }
    ]),
    features: JSON.stringify([
      { title: "AI 에너지 최적화", desc: "사용량 예측 기반 피크 전력 제어" },
      { title: "탄소 배출 관리", desc: "ESG 리포트 자동 생성" }
    ])
  }
];

async function registerProducts() {
  console.log("한국어 제품 등록을 시작합니다...");

  for (const product of products) {
    try {
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        if (key === 'image') return; // 이미지 제외
        formData.append(key, product[key]);
      });

      const response = await fetch('http://localhost:8080/api/v1/products', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log(`[성공] ${product.title} 등록 완료`);
      } else {
        const errorText = await response.text();
        console.error(`[실패] ${product.title} 등록 실패: ${response.status}`, errorText);
      }
    } catch (error) {
      console.error(`[에러] ${product.title} 전송 중 오류:`, error.message);
    }
  }
}

registerProducts();