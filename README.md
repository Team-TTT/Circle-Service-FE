# 🎧 Circle
Circle은 웹페이지를 방문한 사용자들이 실시간으로 음성 대화를 나눌 수 있는 클라이언트를 제공하는 웹 서비스입니다. CDN 배포 링크와 `circle` 함수가 포함된 단 두 줄의 `<script>` 태그를 통해, 누구나 쉽게 본인의 웹페이지에 Circle을 적용할 수 있습니다.



<br>

## 🔍 Contents
- 🎬 Overview
- 💻 Tech stack
- 📅 Timeline
- 💿 Installation
- 🔥 Challenging
- 📝 What we learned

<br>

## 🎬 Overview

### Deploy
- [Circle homepage](https://www.ttt-circle.online/)
- [Circle demo page](https://sage-custard-c3a598.netlify.app/)

### Repository
- [Frontend - Web Client](https://github.com/Team-TTT/Circle-Web-FE)
- [Backend](https://github.com/Team-TTT/Circle-BE)

<br>

|||
|-|-|
|<img width="1000" alt="img-01" src="https://user-images.githubusercontent.com/96766719/200190719-a90bac2c-7ae5-477b-baf0-f201e29ee012.png">|<img width="1427" alt="img-03" src="https://user-images.githubusercontent.com/96766719/200191041-d9885dad-c540-466b-8d65-020a72964800.png">|
|<img width="1425" alt="img-02-1" src="https://user-images.githubusercontent.com/96766719/200190963-e39386d7-184a-477e-9721-61373e2e6d74.png">|<img width="1425" alt="img-02-2" src="https://user-images.githubusercontent.com/96766719/200190968-cbd72a9c-e162-482a-9548-e7c44378683a.png">|

- 사용자는 HTML 문서의 `<body>`태그 내에 코드 스니펫을 추가함으로써, 즉시 'Circle 서비스 클라이언트'를 자신의 웹페이지에 적용할 수 있습니다.
- 서비스 클라이언트는 하나의 '프로젝트' 정보를 바탕으로 구성되며, 내부에는 실시간 음성 채팅이 이뤄지는 복수의 '채널'이 위치합니다.
- 웹페이지 방문자들은 각 채널 안에서 Web RTC와 Socket.io를 기반으로 구현된 실시간 음성 채팅 서비스를 이용할 수 있습니다.
- 웹 클라이언트의 Console 페이지를 통해 본인의 웹페이지에 적용할 프로젝트를 생성할 수 있고, 프로젝트 제목과 음성 채팅 채널의 제목, 설명을 원하는대로 수정할 수 있습니다.

<br>

## 💻 Tech stack

### **Frontend**
- React
- React Router
- Firebase Authentication
- Simple peer (Web RTC)
- Socket.io-client
- Styled-Component
- ESLint

### **Backend**
- Node.js
- Express
- MongoDB Atlas / Mongoose
- Socket.io
- ESLint

<br>

## 📅 Timeline

### `2022.10.10 ~ 10.28` / 총 21일의 작업 기간

### 1주차
- 프로젝트 기획 및 아이디어 회의,
- Canvan, DB Schema, Mock up 작성
- 프로젝트 초기 구조 설정

### 2주차
- Backend API 및 Socket 서버 구현
- Firebase를 이용한 Google 로그인 구현
- 웹 클라이언트 및 서비스 클라이언트 UI 구현
- Socket 통신과 Web RTC를 활용한 실시간 음성 채팅 기능 구현

### 3주차
- CDN을 통해 HTML 문서 내에서 서비스 클라이언트를 로드할 수 있도록 코드 스니펫 제작
- 웹 클라이언트 콘솔페이지의 CRUD Operation 구현
- 웹, 서비스 클라이언트, 서버간의 동작, 통신에 대한 통합적 테스트
- Frontend(Netlify, JsDelivr), Backend(AWS Elastic Beanstalk) 배포

<br>

## 💿 Installation

<cite>❗️로컬 환경에서 실행하기 전, 아래의 사항들을 확인해주세요.</cite>

1. 프로젝트를 클론 받은 후, 루트 디렉토리에 `.env` 파일을 생성 후 아래와 같이 환경 변수를 입력해 주세요.

    <details>
    <summary>Service Client</summary>

    ```
    REACT_APP_SOCKET_URL=<default = http://localhost:8080>
    REACT_APP_NODE_ENV=development
    ```
    </details>

2. 아래의 명령어로 실행해주세요.

    ```
    npm install
    npm start
    ```

<br>

## 🔥 Challenging

### Web RTC 기반의 실시간 음성 채팅구현

#### Web RTC에 구현에 대하여

브라우저끼리의 실시간 데이터 송신을 할수있게 하는 web RTC에 대해서 무지한상태로 구현에 임하여서 낯선 것 들에 대한 어려움들을 겪었습니다. 그래도 webRTC가 11년 전에 나온 기술이고 활용되고있는 예제 및 정보가 많이 있어서 학습하는데에는 어려움이 없었던 것 같습니다. 여기서 저희가 직접 구현한것은 webRTC연결을 위한 시그널서버를 구현하였고, 스턴서버 및 턴서버는 구글의 오픈 서버를 이용하였습니다.

#### Simple-peer 라이브러리의 사용을 결심하게 된 이유

peer to peer 연결을 좀더 쉽게 도와주는 심플피어를 도입하였습니다. 그 이유는 기존의 제공되는 webRTC api로 코드를 작성할시 코드가 길어지고 팀원들도 낯선상태에서 이해하기가 힘들 것 이라고 판단되어 라이브러리를 사용하였습니다.

#### peer 연결을 안정적으로 만드는 과정

기본 peer옵션으로 peer to peer 연결을 실시할시 peer가 연결이 실패하여 `Failed to execute 'setLocalDescription' on 'RTCPeerConnection'` 라는 에러가 자주 등장합니다.

`NAT(Network Address Translation)`을 통과하지 못하거나 방화벽으로 인해 직접 연결이 실패하는 경우, `WebRTC` `ICE`는 `TURN`서버를 사용합니다. 즉, `STUN` 서버에서 피어 연결을 실패할 경우, `TURN` 서버를 사용해 피어를 연결합니다.

`simple-peer`에서 `peer`생성자에 `config`옵션을 지정해줘서 `TURN` 서버를 사용할 수 있도록 하여 `peer` 연결시 안정성을 강화했습니다.

<br>

### 웹페이지에서 iframe으로 데이터 전달하기
유저의 프로젝트를 불러오기 위해 해당 웹페이지가 로드되면 react가 실행되는 iframe으로 key가 전달되도록 했습니다. 그러나 웹페이지와 iframe의 로드 속도 차이가 발생했고, react앱에서 파라미터가 전달되지 않은 채로 fetch요청이 되는 문제가 발생했습니다.

처음엔 웹페이지에서 setTimeout을 이용해 시간차를 두고, 파라미터를 전달해서 이 이슈를 해결했습니다. 구현은 가능했지만 이 방식보다 iframe에서 react앱이 실행되면, 웹페이지로 메시지를 전달해서 fetch를 실행하는 방식이 좀 더 확실하고 명시적이라고 생각했기 때문에 이 방향으로 로직으로 개선했습니다.

<br>

### 상태관리에 대한 고민

프로젝트 초기 계획 단계에서 웹 클라이언트의 페이지 수와 CRUD 작업이 많지 않다고 판단되었고, 이에 상태관리 라이브러리 없이 웹 클라이언트를 구현하기로 하였습니다. 하지만 막상 구현을 시작하니 컴포넌트가 세분화되고 라우터 구조가 중첩됨에 따라 과도한 props drilling이 일어났고, 이로 인하여 작업이 진행될 수록 상태 추적과 컴포넌트 관리가 어려워짐을 체감하였습니다. 이에 늦게라도 상태관리 라이브러리를 도입할 것인지에 대한 의논이 있었고, 그 결과 새로운 라이브러리를 도입하여 추가적인 task를 만들기 보다는 현 상황에서 최선의 해결책을 찾는 것으로 방향이 결정되었습니다.

이에 우선은 과도하게 중첩되었던 라우터 구조를 일부 수정하였고, CRUD 작업이 이뤄지는 컴포넌트들이 모두 하나의 레이아웃 컴포넌트의 자식 라우트였기에 `useOutletContext` hook을 이용하여 부모 라우트에서 상태를 관리하도록 하였습니다. 이를 통해 과도한 props drilling은 어느정도 해결하였지만, 여전히 상태관리 라이브러리를 사용할 때에 비해서는 각 상태의 변화가 렌더링에 영향을 미치는 과정을 쉽게 파악하기 어렵다고 느껴졌습니다. 이에 꼭 규모가 큰 프로젝트가 아니더라도, 상태관리 라이브러리를 통해 더 직관적이고, 깔끔하게 상태를 관리하는 것이 프로젝트 유지보수에 더 효율적이겠다는 생각을 하게되는 계기가 되었습니다.

<br>

### 세션쿠키를 사용한 로그인과 CORS 이슈

이번 프로젝트에서는 firebase에서 제공하는 session cookie 방식을 이용하여 로그인 과정을 구현하였습니다. firebase에서 제공하는 session cookie 인증 방식은 기존의 쿠키 인증방식의 편리함에 더해, JWT 기반의 세션 쿠키를 생성하고 이를 인증에 사용함으로써 보안성이 더 좋다고 판단되었기 때문입니다. 실제로 로직 작성시 토큰을 클라이언트 측에 보관하고 이를 헤더에 일일히 담아보낼 필요 없이, 서버측에서 로그인시에 한번만 쿠키를 세팅함으로써 인증 절차가 간편해졌습니다. 하지만 쿠키 방식의 인증을 처음 사용하다보니, 이전에는 겪어보지 못했던 CORS 이슈들을 맞닥뜨리게 되었습니다.

이 중 가장 주요했던 문제는, 로그인시 쿠키를 세팅하도록 로직을 작성했음에도 불구하고 이후 클라이언트에서 보내는 요청에 쿠키가 담기지 않는 문제였습니다. 조사 결과 cross-origin 요청에는 기본적으로 쿠키를 포함할 수 없다는 사실을 알게되었고. 이를 허용하려면 클라이언트에서 요청시 `credentials` 옵션을 `include`로 설정하여 쿠키를 서버로 보내고, 이에 대한 응답을 브라우저가 수용하도록 그에 따른 헤더를 설정해주어야 한다는 것을 알게되었습니다. 또한 이 경우에는 `Access-Control-Allow-Origin` 헤더에 명시적인 URL이 제공되어야 한다는 사실도 알게 되었습니다. 이렇게 하나하나씩 에러 케이스들을 처리하여 결국 CORS문제를 모두 해결할 수 있었지만, 이 과정을 통해 느낀 것은 결국 문제를 해결할 때 본질적인 개념을 생각하지 않은 상태로 무작정 에러메시지에 따른 케이스만 처리하다보면 필히 이에 연관된 다른 문제로 이어지게 된다는 점이었습니다. 이번 계기를 통하여 CORS 설정시 여러 보안 옵션들과 헤더 설정의 연관성을 자세히 조사한 뒤 그 관계들을 잘 살펴가며 헤더 설정을 해야한다는 것을 깨달았고, 더 나아가 문제의 표면만 보고 판단하는 것이 아니라 그 핵심이 무엇인지 파악하는 것이 중요하다는 것을 배울 수 있었습니다.

<br>

## 📝 What we learned

### **`허양욱`**

일단 코딩을 팀프로젝트로 진행한 적은 처음입니다. 혼자 할 때는 마음대로 하면 되지만, 팀프로젝트를 할 때는 팀원들과 같이 해나가는거기 때문에 결정 하나하나를 의논해야되고, 코드 짤때도 내가보는 코드가 아닌 팀원들이 보고 이해하기 쉬운 코드를 짜야하기때문에 한글자 마다 신중히 코드를 짜게 됩니다. 그래서 개발속도는 혼자할때 보다 뎌디고 의논을 계속 하면서 커뮤니케이션을 해야되기때문에 힘이 많이 드는 것 같습니다. 그렇지만 혼자할때보다 코드의 품질이 더 좋아짐을 느끼고, 커뮤니케이션을 통해 함께하는 재미를 많이 느꼈습니다.

팀원과의 커뮤니케이션 에서는 팀원분이 코드가 맘에 안든다고 무작정 까내리는 것이 아닌 상대방의 의견을 존중하고 들어주고, 더 나은 해결방안을 제시해주는 방향으로 팀프로젝트를 진행 해주셔서 갈등이 존재하지않는 이상적인 팀워크로 프로젝트가 수월하게 진행이 되어갔습니다. 다만 회의시간이 엄청 길어지는 단점이 존재하였습니다.

### **`최송이`**

팀프로젝트를 하면서 가장 좋았던 점은 ‘리뷰를 주고 받을 수 있다’ 는 점이었습니다. 같은 기능을 구현해도 리뷰 덕분에 더 나은 방향을 알게 되는 경우도 많아서 작업물 뿐 만 아니라 개인적으로도 성장할 수 있는 계기가 되었습니다. 또한 저도 팀원들에게 개선할 수 있는 점을 리뷰에 남길려고 노력하면서 더 자세히 찾아보고 배울 수 있었습니다.

프로젝트 과정 중에 한 가지 더 배운 점은 ‘간단한 걸 먼저 만들어보자’ 입니다. 아이디어 기획부터 시작한 프로젝트였기 때문에 이 아이디어가 정말 실현 가능한지 기술 검증을 먼저 진행해야했습니다. 제가 생각했던 것보다 훨씬 간단한 형태로 가능한지 실험해보는 팀원을 보며, 최대한 간단한 형태로 핵심 기능만 빠르게 검증해보는 게 효과적이라고 느꼈습니다. 빠르게 시도하고 안 되면 다른 방향으로 다시 시도해보는 방식이 새로운 기술을 프로젝트에 적용할 때 도움이 될 것 같습니다.

커뮤니케이션 부분에서도 어떻게 소통하는 게 제일 효과적일지 고민할 수 있는 계기가 되었습니다. 급한 마음에 복잡한 로직을 말로만 설명하기 보다는 항상 코드를 함께 보거나 그림을 그리면서 설명하는 게 가장 빠르고 효과적으로 팀원들과 공유할 수 있다는 것을 체감할 수 있었습니다.

### **`안형우`**

‘이제부터는 실전이다!’라고 생각하며 시작한 팀 프로젝트였지만, 결과적으로 앞선 교육과정들에 못지않게 많은 배움이 있는 시간이었습니다. 그 중에서도 특히 ‘협업이란게 무엇이고, 어떻게 해야하나’에 대한 고민이 이번 팀 프로젝트에서 가장 깊게 고민하고, 느끼고, 배웠던 점입니다.

프로젝트를 시작할 당시에는 팀 컨벤션을 정하고, 기술 조사 및 태스크 분배 등을 함께하면서 이러한 것들이 협업의 과정이구나라고 막연히 생각했습니다. 하지만 실제로 코드를 작성하기 시작하면서 부터, 협업한다는 것이 무엇인지에 대해서 많은 것들을 느끼기 시작했습니다. 그 중에서도 특히, 한 명이 특별히 전담하는 파트 없이 모든 부분을 두루두루 작업하다 보니 나의 작업물이 다른 팀원의 작업의 밑바탕이 되기도 했고, 반대로 내가 다른 팀원의 작업물 위에서 작업하는 경우도 많았습니다. 혼자 작업을 할때는 중간에 생각이 바뀌거나 더 좋은 방향을 찾게되면 프로젝트의 구조를 원하는 방향대로 수정해가며 작업을 할 수 있었지만, 팀 단위의 작업에서는 그럴 수 없었기에 혼자 작업하는것이 익숙했던 저는 많은 어려움을 느꼈습니다.

하지만 이러한 어려움이 있었기에, 내가 생각하는 구조나 방향이 진정 합당하고 옳은 방향인가에 대해 더욱 깊게 고민을 하는 계기가 되었습니다. 단순히 내가 편하게 작업하려는 방향인지, 아니면 정말 우리의 프로젝트에 적용하기에 더 나은 방향인지 수십번 스스로에게 되묻게 되었고, 설령 그것이 맞다고 결정을 내렸을 때에도 이를 팀원들과 논의하기 위해서는 충분히 합리적인 근거들과 다른 대안은 없었는지에 대한 고민이 전해져야 했기에, 모든 결정이나 말 한 마디에 매번 최대한의 노력을 기울이게 되었습니다. 혼자 작업할때도 그렇긴 하나, 특히나 이번 경험을 통해 매번 더욱 신중하게, 의미있게, 타인이 수긍할 수 있도록 코드를 작성해가는 경험을 하였고, 이것이 이번 팀 프로젝트에서 배운 가장 뜻깊은 부분이었다고 생각합니다.
