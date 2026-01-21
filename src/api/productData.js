// (주)보아스에스이(BOAS-SE) 기업 분석 기반 로컬 데이터 (총 12종)
// 백엔드 API 장애 시 사용되는 Fallback Data

export const products = [
  // --- 메인 노출 제품 (Key Solutions) ---
  {
    id: 1,
    category: "Smart Building",
    title: "ZEBRA (지능형 제로 에너지 빌딩)",
    description: "건물 에너지 소비를 실시간 감시하고 AI로 예측하여 에너지 자립을 실현하는 모니터링 시스템",
    detail: "제로에너지건축물(ZEB) 인증 필수 지침을 준수하며, 건물 내 에너지 소비 현황을 실시간으로 모니터링합니다. MSE 0.012 수준의 정밀한 AI 알고리즘을 통해 미래 에너지 수요를 예측하고 설비 효율을 최적화하여 스마트한 에너지 관리를 실현합니다.",
    image: "/images/solution-zebra.jpg",
    isMainFeatured: true,
    specs: [
      { icon: "FaLeaf", label: "인증", highlight: "ZEB", text: "제로에너지 인증 지원" },
      { icon: "FaBrain", label: "정밀도", highlight: "MSE 0.012", text: "수요 예측 정확도" }
    ],
    features: [
      { title: "에너지 소비 예측", desc: "AI 기반 실시간 소비량 및 설비 효율 분석" },
      { title: "ZEB 인증 대응", desc: "공공기관 및 민간 건물 필수 가이드라인 준수" }
    ]
  },
  {
    id: 2,
    category: "Smart Building",
    title: "승강기 플랫벨트 3차원 진단",
    description: "뎁스(Depth) 카메라와 영상 처리 기술로 승강기 벨트의 상태를 비접촉 실시간 진단하는 솔루션",
    detail: "승강기의 핵심 안전 부품인 플랫벨트를 24시간 실시간 감시합니다. 3차원 영상 처리 기술을 활용하여 벨트의 미세한 흔들림, 파열, 마모 상태를 정밀 진단함으로써 사고를 사전에 예방하고 유지보수 효율을 극대화합니다.",
    image: "/images/solution-elevator.jpg",
    isMainFeatured: true,
    specs: [
      { icon: "FaCamera", label: "방식", highlight: "비접촉", text: "3D Depth 스캔" },
      { icon: "FaShieldAlt", label: "안전", highlight: "24h", text: "상시 실시간 모니터링" }
    ],
    features: [
      { title: "3차원 정밀 진단", desc: "미세 크랙 및 파열 상태 시각적 분석" },
      { title: "예지 보전 서비스", desc: "교체 주기 예측을 통한 관리 비용 절감" }
    ]
  },
  {
    id: 3,
    category: "Smart Mobility",
    title: "스마트 DTG 관제 플랫폼",
    description: "디지털 운행 기록계(DTG)와 연동하여 위험물 운송 차량의 위치와 상태를 실시간 관제하는 플랫폼",
    detail: "차량의 운행 데이터(위치, 속도, 주행 습관 등)를 실시간으로 수집하고 분석합니다. AI 모델을 통해 급가속, 급제동 등 위험 운전 패턴을 탐지하여 사고를 예방하고, 운행 정보를 기반으로 탄소 배출량을 자동 산출하여 ESG 경영을 지원합니다.",
    image: "/images/mobility-2.jpg",
    isMainFeatured: true,
    specs: [
      { icon: "FaMapMarkedAlt", label: "관제", highlight: "LBS", text: "실시간 위치/상태 추적" },
      { icon: "FaCarCrash", label: "분석", highlight: "AI 탐지", text: "위험 운전 사고 예측" }
    ],
    features: [
      { title: "실시간 운행 관제", desc: "위험물 운송 차량 통합 모니터링 시스템" },
      { title: "ESG 데이터 관리", desc: "정밀한 탄소 배출량 산정 및 리포트 제공" }
    ]
  },
  {
    id: 4,
    category: "Smart Factory",
    title: "AI 공정 최적화 및 납기 예측",
    description: "제조 현장의 데이터를 융합하여 공정 스케줄을 최적화하고 정확한 납기일(ETA)을 예측하는 DX 솔루션",
    detail: "강화학습(Reinforcement Learning) 기술을 적용하여 복잡한 생산 공정의 스케줄을 자동 최적화합니다. 제조 현장을 디지털 트윈으로 구현하여 병목 현상을 진단하고, 실시간 변수를 반영한 정확한 납기 예측으로 생산 효율성을 혁신합니다.",
    image: "/images/factory-1.jpg",
    isMainFeatured: true,
    specs: [
      { icon: "FaCogs", label: "최적화", highlight: "RL 기술", text: "강화학습 스케줄링" },
      { icon: "FaClock", label: "예측", highlight: "ETA", text: "납기 완료 시점 정밀 예측" }
    ],
    features: [
      { title: "디지털 트윈 최적화", desc: "생산 공정 시뮬레이션 및 병목 구간 진단" },
      { title: "지능형 스케줄링", desc: "강화학습 기반 최적 생산 순서 자동 생성" }
    ]
  },
  {
    id: 5,
    category: "Smart Farm",
    title: "V-AGREE 과수 병해충 예측",
    description: "IoT 센서와 다중분광 영상 분석을 결합하여 과수의 병해충 발생을 조기에 예측하는 플랫폼",
    detail: "과수원의 환경 데이터와 다중분광 영상을 융합 분석하여 병해충 발생 가능성을 조기에 탐지합니다. 딥러닝(CNN) 알고리즘을 통해 병해충의 확산을 예측하고, 정밀한 농업 빅데이터를 기반으로 최적의 방제 시점을 제시하여 농가의 생산성을 높입니다.",
    image: "/images/solution-vagree.jpg",
    isMainFeatured: true,
    specs: [
      { icon: "FaBug", label: "진단", highlight: "AI 탐지", text: "CNN 기반 병해충 예찰" },
      { icon: "FaWifi", label: "IoT", highlight: "LoRa/UHF", text: "다양한 무선 환경 지원" }
    ],
    features: [
      { title: "정밀 병해충 예찰", desc: "다중분광 영상 기반의 조기 진단 시스템" },
      { title: "스마트 방제 전략", desc: "빅데이터 기반 최적 방제 시기 및 방법 추천" }
    ]
  },

  // --- 신규 추가 제품 (Portfolio) ---
  {
    id: 6,
    category: "Smart Factory",
    title: "배전급 온라인 진단시스템 (PDPS)",
    description: "전력설비의 기능과 성능을 상시 감시하여 고장 및 사고를 예방하는 온라인 진단 시스템",
    detail: "PDPS(Power Equipment Diagnosis & Preventive System)는 주요 전력설비의 상태를 실시간으로 감시하여 고장 및 사고를 미연에 방지합니다. 각 기기별 이력을 DB로 통합 관리하여 효율적인 전력 설비 유지보수를 지원합니다.",
    image: "/images/prod-pdps.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaBolt", label: "감시", highlight: "24h", text: "상시 전력 감시" },
      { icon: "FaDatabase", label: "관리", highlight: "DB", text: "기기 이력 관리" }
    ],
    features: [
      { title: "고장 예방", desc: "실시간 모니터링을 통한 전력 설비 사고 방지" },
      { title: "이력 통합 관리", desc: "설비별 생애 주기 데이터베이스 구축" }
    ]
  },
  {
    id: 7,
    category: "Smart Farm",
    title: "K-herb Network (한약기원사전 가시화)",
    description: "한약재의 정보, 효능, 처방을 노드 형태로 시각화하여 제공하는 분석 도구",
    detail: "각 한약재의 정보를 네트워크 노드로 표현하여, 한약재 간의 관계와 효능, 처방의 쓰임, 주치를 한눈에 파악할 수 있도록 돕는 직관적인 가시화 시스템입니다.",
    image: "/images/prod-herb.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaProjectDiagram", label: "분석", highlight: "Graph", text: "네트워크 가시화" },
      { icon: "FaLeaf", label: "데이터", highlight: "Herb", text: "한약재 정보 통합" }
    ],
    features: [
      { title: "데이터 시각화", desc: "복잡한 한약 정보를 직관적인 노드 그래프로 표현" },
      { title: "상관관계 분석", desc: "약재와 처방 간의 연관성 및 효능 매핑" }
    ]
  },
  {
    id: 8,
    category: "Smart Building", 
    title: "SMART AFTERCARE (내시경 데이터 분석)",
    description: "내시경 판독 데이터를 가시화하여 환자의 상태를 체계적으로 관리하는 헬스케어 솔루션",
    detail: "내시경 검사 이후 환자의 몸 속 상태를 진료카드로 저장하고, 병변 정보나 청결 상태 등 각종 의료 데이터를 시각화하여 환자 관리의 효율성을 높입니다.",
    image: "/images/prod-medical.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaHeartbeat", label: "분야", highlight: "Medical", text: "스마트 헬스케어" },
      { icon: "FaChartBar", label: "기능", highlight: "Viz", text: "데이터 가시화" }
    ],
    features: [
      { title: "진료 기록 디지털화", desc: "내시경 영상 및 판독 데이터의 체계적 저장" },
      { title: "환자 상태 리포트", desc: "병변 및 청결 상태에 대한 시각적 분석 리포트 제공" }
    ]
  },
  {
    id: 9,
    category: "Smart Building",
    title: "DPMS (재해예방계측 관리시스템)",
    description: "전국 댐 누수 및 지진 발생을 실시간으로 관측하여 재해를 예방하는 계측 시스템",
    detail: "Disaster Prevention Measuring System은 댐의 누수나 지진 파형을 실시간으로 계측하고 분석합니다. 재난 발생 시 즉각적인 알림을 통해 골든타임을 확보하고 시설물 안전을 지킵니다.",
    image: "/images/prod-dpms.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaShieldAlt", label: "목적", highlight: "Safety", text: "재해 예방" },
      { icon: "FaWater", label: "대상", highlight: "Dam/Earth", text: "댐 누수/지진" }
    ],
    features: [
      { title: "실시간 계측", desc: "정밀 센서를 이용한 24시간 시설물 상태 감시" },
      { title: "재난 조기 경보", desc: "이상 징후 발생 시 관리자에게 즉시 알림 전송" }
    ]
  },
  {
    id: 10,
    category: "Smart Building",
    title: "STORM (실시간 원격검침 시스템)",
    description: "에너지 공급량에 따른 요금 부과 및 징수를 위한 원격 자동 검침 자동화 시스템",
    detail: "Smart Total Remote Monitoring system은 에너지 사용량을 원격에서 자동으로 검침하여 요금을 정확하게 산정합니다. 검침원의 방문 없이도 효율적인 에너지 관리와 요금 징수가 가능합니다.",
    image: "/images/prod-storm.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaWifi", label: "방식", highlight: "Remote", text: "원격 자동 검침" },
      { icon: "FaFileInvoiceDollar", label: "기능", highlight: "Billing", text: "요금 자동 산정" }
    ],
    features: [
      { title: "검침 자동화", desc: "인력 방문 없는 100% 원격 데이터 수집" },
      { title: "요금 체계 연동", desc: "사용량 기반의 정확하고 투명한 요금 부과" }
    ]
  },
  {
    id: 11,
    category: "Smart Farm",
    title: "산림용 스마트 양묘장 관제",
    description: "전국 양묘장 데이터를 표준화하고 AI로 분석하여 설비를 자동 제어하는 클라우드 관제 시스템",
    detail: "전국 양묘장의 데이터를 클라우드로 통합 수집하고, AI 분석을 통해 최적의 생육 환경을 조성합니다. 온도, 습도 등에 따라 설비를 자동으로 제어하여 묘목의 생산성을 극대화합니다.",
    image: "/images/prod-nursery.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaTree", label: "대상", highlight: "Forest", text: "국유 양묘장" },
      { icon: "FaCloud", label: "기술", highlight: "Cloud", text: "통합 관제" }
    ],
    features: [
      { title: "데이터 표준화", desc: "전국 분산된 양묘장 데이터의 통합 관리 체계 구축" },
      { title: "설비 자동 제어", desc: "AI 분석 기반의 스마트한 환경 제어 시스템" }
    ]
  },
  {
    id: 12,
    category: "Smart Farm",
    title: "감귤 생육환경 모니터링 및 당도 예측",
    description: "감귤 농장의 환경 데이터와 기상 정보를 AI로 분석하여 당도를 예측하고 품질을 높이는 솔루션",
    detail: "농장 내 센서 데이터(온습도, 토양산도)와 기상청 날씨 데이터를 결합하여 미래의 감귤 당도를 예측합니다. 최적의 수확 시기와 관리 방법을 농장주에게 제공하여 고품질 감귤 생산을 지원합니다.",
    image: "/images/prod-citrus.jpg",
    isMainFeatured: false,
    specs: [
      { icon: "FaLemon", label: "품목", highlight: "Citrus", text: "제주 감귤" },
      { icon: "FaChartLine", label: "예측", highlight: "Brix", text: "미래 당도 예측" }
    ],
    features: [
      { title: "당도 정밀 예측", desc: "환경 데이터 기반의 AI 당도 예측 모델 적용" },
      { title: "생육 환경 최적화", desc: "데이터 기반의 농장 제어로 최상품 감귤 생산" }
    ]
  }
];

export default products;
