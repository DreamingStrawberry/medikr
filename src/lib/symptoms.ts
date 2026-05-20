export type Symptom = {
  slug: string;
  label: string;
  keywords: string[];
};

export const SYMPTOMS: Symptom[] = [
  { slug: 'gamgi', label: '감기', keywords: ['감기', '기침', '콧물', '인후통'] },
  { slug: 'duto', label: '두통', keywords: ['두통', '편두통'] },
  { slug: 'wijang', label: '소화·위장', keywords: ['소화', '위장', '속쓰림', '식욕', '구역', '구토'] },
  { slug: 'baltyeol', label: '발열·해열', keywords: ['발열', '열', '해열'] },
  { slug: 'tongjeung', label: '통증', keywords: ['통증', '진통', '근육통', '관절통', '월경통'] },
  { slug: 'almreugi', label: '알레르기', keywords: ['알레르기', '두드러기', '비염'] },
  { slug: 'byunbi', label: '변비', keywords: ['변비', '배변'] },
  { slug: 'seolssa', label: '설사', keywords: ['설사', '장염'] },
  { slug: 'sumyeon', label: '수면', keywords: ['수면', '불면'] },
  { slug: 'pibu', label: '피부', keywords: ['피부', '가려움', '습진', '여드름'] },
  { slug: 'momsal', label: '몸살', keywords: ['몸살', '근육통', '오한', '피로'] },
  { slug: 'meolmi', label: '멀미·어지러움', keywords: ['멀미', '어지러움', '현훈'] },
  { slug: 'gigchim', label: '기침·가래', keywords: ['기침', '가래', '거담', '진해'] },
  { slug: 'momu', label: '구내염·입병', keywords: ['구내염', '입병', '구강', '잇몸'] },
  { slug: 'noon', label: '눈 건강·안구건조', keywords: ['눈', '안구', '결막', '시력'] },
  { slug: 'mokachilm', label: '목 통증·인후', keywords: ['목', '인후', '편도', '후두'] },
  { slug: 'binyeo', label: '비뇨기', keywords: ['배뇨', '방광', '소변', '요로'] },
  { slug: 'saengni', label: '생리·여성', keywords: ['월경', '생리', '여성'] },
  { slug: 'goeul', label: '귀·이명', keywords: ['귀', '이명', '청력'] },
  { slug: 'simrijang', label: '심리·우울', keywords: ['우울', '불안', '스트레스'] },
];
