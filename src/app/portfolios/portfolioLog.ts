import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoPTGKr from '@/app/icon.svg'
import logoClast from '@/images/logos/clast-corp.svg'

export const projects = [
  {
    name: 'Clast Cloud',
    description:
      '기존 Clast의 IaaS 클라우드 서비스를 개발 및 FLEX IT로 인수되어 현재까지 운영중. Proxmox, Toss Payments 기반 전체 비즈니스 로직 구현을 담당함.',
    link: { href: 'https://clast.kr', label: 'clast.kr' },
    logo: logoClast,
  },
  {
    name: 'Medivu Pandoc',
    description:
      'Medivu의 CT/MRI 영상 판독문 생성 AI 서비스; "Pandoc"을 배포하기 위한 백엔드 시스템 및 실시간 판독 STT 등 부가 AI 서비스을 개발.',
    link: { href: 'https://pandoc.io', label: 'pandoc.io' },
    logo: logoAnimaginary,
  },
  {
    name: 'ptg.kr Dev Blog',
    description:
      '개인 개발 블로그로, Next.js, Minio(S3 Compatible) 기반의 이미지 업로드 및 관리 시스템을 개발. 블로그 글 작성 및 관리 기능을 제공.',
    link: { href: '/blog', label: 'Go to Blog' },
    logo: logoPTGKr,
  },
]

export const awards = [
  {
    title: '2023 데이터 크리에이터 캠프',
    date: '2023-12-02',
    description:
      '과학기술정보통신부와 NIA가 주최하는 데이터 크리에이터 캠프에서 "대상"을 수상했습니다. 이 캠프는 데이터 분석 및 활용 능력을 겨루는 대회입니다.',
    grade: '대상 - 과학기술정보통신부 장관상',
    tag: ['데이터', '인공지능'],
  },
  {
    title: '2023 공개SW개발자대회',
    date: '2023-12-01',
    description:
      '과학기술정보통신부가 주최하는 공개SW개발자대회에서 "특별상"을 수상했습니다. 오픈소스 소프트웨어 개발 및 기여를 평가받는 대회입니다.',
    grade: '특별상 - 공개SW개발자대회 조직위원장상',
    tag: ['오픈소스', 'SW'],
  },
  {
    title: '세종특별자치시 공공데이터 창업경진대회',
    date: '2023-08-01',
    description:
      '세종특별자치시가 주최하는 공공데이터 창업경진대회에서 "우수상"을 수상했습니다. 공공데이터를 활용한 창업 아이디어와 실현 가능성, 구현력을 평가받는 대회입니다.',
    grade: '우수상 - 세종특별자치시장상',
    tag: ['데이터', '창업'],
  },
  {
    title: '2022 공개SW개발자대회',
    date: '2022-11-29',
    description:
      '과학기술정보통신부가 주최하는 공개SW개발자대회에서 "특별상"을 수상했습니다. 오픈소스 소프트웨어 개발 및 기여를 평가받는 대회입니다.',
    grade: '특별상 - 공개SW개발자대회 조직위원장상',
    tag: ['오픈소스', 'SW'],
  },
  {
    title: '2022 Smarteen App+ Challenge',
    date: '2022-10-29',
    description:
      '중소벤처기업부와 SK Planet이 주최하는 Smarteen App+ Challenge에서 "대상"을 수상했습니다. 앱, 인공지능, 하드웨어 분야에서의 창의적 아이디어와 구현력을 평가받는 대회입니다.',
    grade: '대상 - 중소벤처기업부 장관상',
    tag: ['앱', '인공지능', '하드웨어'],
  },
]

export const certificates = [
  {
    title: '네트워크관리사 2급',
    description:
      '한국정보통신자격협회에서 발급하는 네트워크 관리 관련 자격증으로, 네트워크 설계, 구축, 운영 및 보안에 대한 지식을 평가합니다.',
    tag: ['공인민간자격', '네트워크'],
    date: '2023-10-10',
  },
  {
    title: '리눅스마스터 2급',
    description:
      '한국정보통신진흥협회에서 발급하는 리눅스 운영 및 관리 관련 자격증으로, 리눅스 시스템의 설치, 운영, 보안 및 트러블슈팅 능력을 평가합니다.',
    tag: ['공인민간자격', '시스템', 'OS'],
    date: '2022-12-30',
  },
]
