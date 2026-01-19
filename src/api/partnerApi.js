// src/api/partnerApi.js

const STORAGE_KEY = 'boasse_partners';

// 초기 데이터 로드 (로컬 스토리지에 없으면 빈 배열)
const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const partnerApi = {
  // 파트너 목록 조회
  getPartners: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getStorageData();
        resolve({ data: { success: true, data } });
      }, 200);
    });
  },

  // 파트너 상세 조회
  getPartnerDetail: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStorageData();
        const partner = partners.find(p => p.id === parseInt(id));
        resolve({ data: { success: true, data: partner } });
      }, 200);
    });
  },

  // 파트너 등록
  createPartner: async (formData) => {
    // 실제로는 FormData를 전송하지만, 여기서는 객체로 변환하여 저장
    const newPartner = {
      id: Date.now(),
      name: formData.get('name'),
      link: formData.get('link') || '', // 링크 필드 추가
      // 파일 객체는 로컬스토리지에 저장이 안되므로, 
      // 실제 구현시엔 서버가 URL을 주겠지만 여기서는 createObjectURL 사용 (새로고침시 사라짐 주의)
      // 또는 base64로 변환해야 하지만 간단히 처리.
      logo: formData.get('logo') instanceof File 
        ? await convertBase64(formData.get('logo')) 
        : formData.get('logo'), 
      createdAt: new Date().toISOString()
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStorageData();
        setStorageData([...partners, newPartner]);
        resolve({ data: { success: true } });
      }, 300);
    });
  },

  // 파트너 수정
  updatePartner: async (id, formData) => {
    return new Promise(async (resolve) => {
      const partners = getStorageData();
      const index = partners.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        let updatedLogo = partners[index].logo;
        const newLogoFile = formData.get('logo');
        
        if (newLogoFile instanceof File) {
          updatedLogo = await convertBase64(newLogoFile);
        }

        partners[index] = {
          ...partners[index],
          name: formData.get('name'),
          link: formData.get('link') || '', // 링크 필드 업데이트
          logo: updatedLogo
        };
        setStorageData(partners);
      }
      resolve({ data: { success: true } });
    });
  },

  // 파트너 삭제
  deletePartner: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const partners = getStorageData();
        const filtered = partners.filter(p => p.id !== parseInt(id));
        setStorageData(filtered);
        resolve({ data: { success: true } });
      }, 200);
    });
  }
};

// 헬퍼: 파일을 Base64로 변환 (LocalStorage 저장을 위해)
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default partnerApi;