# Dongbang

<!-- ABOUT THE PROJECT -->
## About The Project

한양대학교 중앙동아리를 소개하고 가입 절차를 도와주는 서비스

프로젝트 설명 : https://velog.io/@sgwon1996/동방-한양대-중앙동아리-소개-플랫폼

### 주요 기능

#### 일반 

- 로그인
- 회원가입
- 유저 정보수정
- 동아리 정보 보기
- 지원서 작성
- 문의하기 (채팅)

#### 동아리 운영진

- 동아리 정보 작성, 수정
- 지원서 양식 작성, 수정
- 지원서 조회
- 합격 알림
- 답변하기 (채팅)


### 사용 기술

- Frontend - React, Apollo, Styled Components, React Hooks
- Backend - NodeJs, Apollo Server, GraphQL, Prisma2
- DataBase - MySQL


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

이 프로젝트의 패키지들은 yarn을 통해 관리되고 있습니다. 
* yarn
  ```sh
  npm install -g yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone. https://github.com/sgwon96/DongBang_backend_new
   ```
2. Install Yarn packages
   ```sh
   yarn
   ```
3. Enter your Environment Variable in `backend/src/.env`
   ```JS
   PORT = 4000
   SENDGRID_USERNAME = ""
   SENDGRID_PASSWORD = ""
   JWT_SECRET = ""
   ```
4. Run Server
   ```sh
   yarn dev
   ```
   
### API 정리
https://puzzle-dart-b66.notion.site/Back-d7eab370c91d48b0b646f182e0da3252


<!-- CONTRIBUTING -->
## Contributing

- Frontend - 심현아, 남민정
- Backend - 윤승권

<!-- CONTACT -->
## Contact

Yoon Seung Gwon - zxcvb5434@likelion.org


