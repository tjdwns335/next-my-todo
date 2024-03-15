### 요구사항

- (1) 애플리케이션 전역에서 사용할 내비게이션 만들기
    - 다음 페이지에 접근할 수 있는 내비게이션 바를 만듭니다.
    - [x]about, report, todos-csr, todos-ssr
    - [x]RootLayout에 삽입하여 모든 페이지에서 접근이 가능케합니다.
- (2) react-query 세팅
    - [x]QueryProvider를 이용하여 react-query를 세팅합니다.
- (3) json-server 세팅
    - [x]데이터베이스 서버로 가정할 json-server를 생성합니다.
    - [x]todos
    - [x]companyInfo
    - [x]db.json 
        
- (4) 백엔드를 구축합니다.
    - 아래 두 파일을 만듭니다.
        - [x]app > api > company > route.ts
        - [x]app > api > todos > route.ts
    - (5)에서 제공할 페이지에 대한 백엔드 로직을 완성합니다.
        - [x]GET, POST, PATCH, DELETE를 적어도 1개씩 사용하여 만듭니다.
            
                
- (5) 각 페이지를 구축합니다.
    1. about 페이지
        - [x]변하지 않는 페이지이므로, SSG로 작성합니다.
        - [x]companyInfo 정보를 불러와서 회사에 대한 소개를 구현하는 페이지로 만듭니다.
    2. report 페이지
        - [x]todos의 통계 정보를 ISR로 구현하는 페이지를 만듭니다.
        - [x]매 10초마다 결과가 갱신될 수 있도록 revalidate 옵션을 설정합니다.
