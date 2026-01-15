export const products = [
  // --- Smart Mobility ---
  {
    id: 1,
    title: "스마트 DTG 단말기",
    category: "Smart Mobility",
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
    description: "차량 운행 데이터(위치, 속도 등)를 실시간으로 수집하는 고정밀 IoT 단말기",
    detail: "스마트 DTG 단말기는 국토교통부 표준 규격을 준수하며, 운전자의 주행 습관 분석 및 사고 예방을 위한 핵심 데이터를 수집합니다. 4G/5G 통신을 통해 관제 서버와 실시간으로 연동됩니다."
  },
  {
    id: 8,
    title: "스마트 운전자 앱",
    category: "Smart Mobility",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    description: "운행 기록 조회 및 안전 운전 점수를 제공하는 모바일 애플리케이션",
    detail: "운전자는 본인의 운전 점수를 실시간으로 확인하고, 위험 운전 패턴을 분석받을 수 있습니다. 기업용 솔루션과 연동하여 효율적인 차량 관리를 지원합니다."
  },
  {
    id: 16,
    title: "운전 패턴 분석 AI",
    category: "Smart Mobility",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    description: "사고 위험도를 예측하고 안전 운전을 유도하는 지능형 드라이빙 솔루션",
    detail: "딥러닝 알고리즘을 통해 수백만 건의 주행 데이터를 분석하여 사고 발생 가능성이 높은 패턴을 사전에 감지합니다. 보험 연계형 솔루션으로도 활용 가능합니다."
  },
  {
    id: 13,
    title: "탄소 배출 분석 플랫폼",
    category: "Smart Mobility",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    description: "주행 데이터 및 공정 데이터를 기반으로 탄소 배출량을 자동 산정하는 소프트웨어",
    detail: "ESG 경영의 핵심 지표인 탄소 배출량을 데이터 기반으로 정밀하게 측정합니다. 탄소 배출권 거래 및 친환경 물류 정책 수립의 기초 자료를 제공합니다."
  },
  {
    id: 14,
    title: "물류 가시성 플랫폼",
    category: "Smart Mobility",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    description: "배송 차량의 현재 위치와 도착 예정 시간을 실시간으로 관제하는 시스템",
    detail: "화물의 이동 경로를 실시간으로 추적하고 지연 발생 시 알림을 제공합니다. 고객사 API 연동을 통해 도착 예정 시간(ETA)의 정확도를 극대화합니다."
  },
  {
    id: 20,
    title: "지능형 배차 최적화",
    category: "Smart Mobility",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
    description: "최단 경로 및 적재율을 계산하여 물류 효율성을 극대화하는 배차 솔루션",
    detail: "유전 알고리즘 기반의 경로 최적화 엔진을 사용하여 유류비와 운송 시간을 획기적으로 절감합니다. 차량의 적재 공간을 최대화하는 적재 최적화 알고리즘이 포함되어 있습니다."
  },

  // --- Smart Factory ---
  {
    id: 3,
    title: "IoT 게이트웨이",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    description: "다양한 생산 설비의 데이터를 수집하여 서버로 전송하는 산업용 게이트웨이",
    detail: "Modbus, OPC-UA 등 다양한 산업용 통신 프로토콜을 지원하며, 엣지 컴퓨팅 기술을 통해 현장에서 1차 데이터 처리를 수행합니다. 가혹한 산업 환경에서도 안정적으로 동작합니다."
  },
  {
    id: 4,
    title: "산업용 AI 카메라",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description: "공장 및 시설물의 안전 상태를 실시간으로 감지하고 분석하는 지능형 카메라",
    detail: "작업자의 보호구 착용 여부, 금지 구역 진입, 설비 이상 발열 등을 AI가 실시간으로 감시합니다. 사고 발생 시 즉각적인 경보 시스템과 연동됩니다."
  },
  {
    id: 7,
    title: "산업용 스마트 태그",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "공장 내 자재 및 제품의 위치를 추적하는 초소형 무선 인식 태그",
    detail: "UWB/BLE 기술을 활용하여 실내에서도 오차 범위 수 센티미터 이내로 정밀한 위치 추적이 가능합니다. 재고 관리 및 공정 흐름 분석의 핵심 장비입니다."
  },
  {
    id: 10,
    title: "스마트 팩토리 MES",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
    description: "생산 계획부터 공정 관리까지 제조 현장을 효율적으로 운영하는 실행 시스템",
    detail: "생산 현장의 데이터를 실시간으로 수집하여 투명한 공정 관리를 실현합니다. 설비 가동률 분석, 품질 관리(SPC), 추적 관리 등을 통합 제공합니다."
  },
  {
    id: 15,
    title: "AI 공정 최적화",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    description: "빅데이터 분석을 통해 생산 스케줄을 최적화하고 납기를 준수하는 AI 솔루션",
    detail: "강화학습 기술을 사용하여 복잡한 공정 순서를 최적화합니다. 예기치 못한 설비 고장이나 원자재 지연 시 즉각적인 재스케줄링을 통해 생산 손실을 최소화합니다."
  },
  {
    id: 17,
    title: "디지털 트윈 관제",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800",
    description: "현실 공간을 3D로 시각화하여 원격 제어 및 모니터링을 지원하는 플랫폼",
    detail: "실제 공장 환경을 3D 모델링하여 데이터와 동기화합니다. 현장에 가지 않고도 공정 상태를 직관적으로 파악하고, 시뮬레이션을 통해 공정 변경의 효과를 미리 확인합니다."
  },
  {
    id: 12,
    title: "통합 안전 관제 S/W",
    category: "Smart Factory",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description: "다양한 시설물의 상태 데이터를 수집하여 통합 모니터링하는 웹 대시보드",
    detail: "산재된 수많은 센서 데이터를 하나의 대시보드에서 관리합니다. 이상 징후 발생 시 등급별 알림 시스템을 통해 골든타임 내 대응이 가능하도록 돕습니다."
  },

  // --- Smart Farm ---
  {
    id: 2,
    title: "IoT 토양 센서",
    category: "Smart Farm",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
    description: "스마트팜 환경에서 토양 온습도 및 영양분을 정밀 측정하는 센서 모듈",
    detail: "토양의 전기전도도(EC), 수소이온농도(pH), 수분 함량 등을 정밀 측정합니다. 방수/방진 설계로 열악한 환경에서도 장기간 안정적인 데이터 수집이 가능합니다."
  },
  {
    id: 6,
    title: "대기 환경 관측 스테이션",
    category: "Smart Farm",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
    description: "대기 온도, 습도, 미세먼지 등 환경 데이터를 실시간 수집하는 실외 장비",
    detail: "복합 환경 센서를 탑재하여 일사량, 풍향, 풍속, 강우량 등 농업에 필요한 모든 기상 데이터를 수집합니다. 태양광 패널을 통한 독립 전원 공급이 가능합니다."
  },
  {
    id: 11,
    title: "병해충 예찰 앱",
    category: "Smart Farm",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800",
    description: "농작물의 병해충 발생 위험 시기를 예측하여 알림을 제공하는 농업 플랫폼",
    detail: "기상 데이터와 과거 병해충 발생 이력을 AI로 분석하여 방제 적기를 알려줍니다. 약제 처방 가이드와 연동되어 과도한 농약 사용을 방지하고 작물 품질을 높입니다."
  },
  {
    id: 18,
    title: "스마트팜 생육 관리",
    category: "Smart Farm",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    description: "데이터 기반으로 작물의 최적 생육 환경을 자동으로 제어하는 토탈 솔루션",
    detail: "환경 제어기(환풍기, 양액기, 보일러 등)를 데이터에 기반하여 자동 제어합니다. 작물별 최적 성장 모델을 적용하여 수확량을 극대화하고 노동력을 절감합니다."
  },

  // --- Smart Building ---
  {
    id: 5,
    title: "승강기 진단 센서",
    category: "Smart Building",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    description: "승강기 플랫벨트의 미세한 흔들림과 파손을 감지하는 고성능 뎁스 카메라",
    detail: "승강기의 핵심 안전 부품인 플랫벨트를 24시간 감시합니다. 비접촉식 광학 분석 기술을 사용하여 벨트의 아주 작은 실금이나 마모 상태도 정확히 식별합니다."
  },
  {
    id: 9,
    title: "ZEB 에너지 모니터링",
    category: "Smart Building",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "제로에너지빌딩의 에너지 생산/소비 현황을 실시간으로 관리하는 시스템",
    detail: "태양광, 지열 등 신재생 에너지 생산량과 건물 내 에너지 소비량을 통합 분석합니다. 에너지 자립률 목표 달성을 위한 최적 운영 시나리오를 제시합니다."
  },
  {
    id: 19,
    title: "승강기 예지 보전",
    category: "Smart Building",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    description: "부품 고장을 사전에 예측하여 사고를 예방하는 지능형 유지보수 시스템",
    detail: "진동 및 소음 데이터를 분석하여 고장이 발생하기 전 이상 징후를 감지합니다. 계획되지 않은 다운타임을 줄이고 관리 비용을 최적화합니다."
  },
  {
    id: 21,
    title: "에너지 자립 최적화",
    category: "Smart Building",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
    description: "빌딩의 에너지 생산과 소비를 분석하여 에너지 자립률을 최적화하는 AI 엔진",
    detail: "날씨 예보와 과거 소비 패턴을 결합하여 에너지 소비량을 선제적으로 조절합니다. 피크 시간대 전력 사용을 분산시켜 전기 요금 절감과 에너지 효율 극대화를 달성합니다."
  }
];
