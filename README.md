# 다른 계정으로 전달하는 김무호 RPG

2026-10-15 직접 조작 RPG 배포본의 독립 실행 소스입니다. 원본 커밋 a95f99d9451564475d761ff816e28545663d5152. 게임 개선/새 배포는 하지 않고 현재 실행에 필요한 코드와 이미지, 검증 파일을 복사했습니다. 이전 선택형 버전 및 사용하지 않는 사진/이미지, Sites 계정 설정, Git 자격 증명은 포함하지 않았습니다.

## Vercel 배포
1. ZIP을 풀고 `kim-muho-vercel` 폴더 안의 내용물을 자신의 GitHub 저장소 최상위에 올립니다. ZIP 파일 자체를 저장소에 올리는 방식이 아닙니다.
2. Vercel에서 해당 GitHub 저장소를 새 프로젝트로 가져옵니다.
3. Root Directory: `./`, Framework Preset: `Other`, Output Directory: `dist`, Build Command 및 Install Command는 비웁니다. 동봉한 vercel.json에도 이 설정이 들어 있습니다.
4. Deploy 후 발급된 주소에서 새 게임, 이동, 대화, 공장 작업, 시간여행, 사운드를 직접 확인합니다.
5. 환경 변수, API 키, 데이터베이스는 필요하지 않습니다.

`index.html`을 파일 탐색기에서 더블클릭하는 file:// 방식은 ES 모듈 제한이 있으므로 사용하지 마세요. 로컬 확인은 Python이 설치되어 있다면 프로젝트 루트에서 `python -m http.server 8080 --directory dist` 실행 후 http://localhost:8080 으로 접속합니다.

## 다음 계정의 AI에게 전달할 요청문
첨부 ZIP은 김무호의 축구선수 환생기 최신 직접 조작 RPG 소스입니다. 처음부터 재제작하거나 미연시/선택지 중심 버전으로 바꾸지 마세요. README.md와 RPG-NOTES.md를 읽고, 기존 코드와 이미지를 그대로 유지한 채 제 GitHub/Vercel 계정에 정적 사이트로 배포하도록 도와주세요. Root Directory ./, Framework Other, Output dist, 빌드/설치 명령 없음입니다. 접근 권한이 없으면 제가 해야 할 화면 조작을 순서대로 알려주세요. 비밀번호나 토큰을 채팅에 요구하지 마세요. 배포 전에 두 테스트를 실행하고, 가능하면 실제 브라우저에서 프롤로그부터 시간여행과 첫 훈련까지 검증해 주세요. 실제로 확인하지 않은 부분을 검증 완료라고 말하지 마세요.

## 구현 상태
- 프롤로그 8개 에피소드 + 시간여행 + 첫 자유 훈련.
- Canvas/JavaScript ES 모듈이며 Phaser/TypeScript 프로젝트가 아닙니다.
- 장면별 자체 합성 BGM, 조작과 목표 표시, 챕터 기준 로컬 저장.
- 목표 도달 가능성과 상태 진행 자동 검사 통과. 실제 브라우저 화면/소리 검증은 미완료.
- 일부 NPC 및 성인 작업복은 정면 포즈 이동. 프로/국가대표/해외 경력 본편과 엔딩은 미구현.
- 저장 데이터는 브라우저와 도메인별 localStorage. 기존 chatgpt.site 세이브는 새 vercel.app 주소로 자동 이전되지 않습니다.

## 테스트
Node.js가 설치된 환경에서 `node test-rpg.mjs`, `node test-rpg-flow.mjs` 실행. 두 번째는 DOM/오디오 스텁 기반 상태 검사이며 실제 브라우저 플레이 검증을 대신하지 않습니다.
