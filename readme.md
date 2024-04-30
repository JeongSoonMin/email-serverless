Serverless Application Model  구축(Serverless Framework 이용)
======================================
## 기본 필요사항
   * AWS IAM 권한 확인
   * AWS Credential 셋팅
   * node, npm 설치
   * serverless 설치

## 개발 필요사항
   * 공통 모듈에서 사용 할 package.json 모듈 설치
   * serverless.yml 에 사용할 기능 정의 및 배포
   * 로컬 테스트 방법

## 개발 공통사항
   * 공통 로깅 처리

### 기본 필요사항 - AWS IAM 권한 확인
* serverless 배포시에 개발자 계정에 iam 권한이 필요하다.
* serverless 배포시 aws cloudformation 에 stack이 추가되면서 자동적으로 연관된 리소스가 배포 된다.
  이때 필요한 권한으로 cloudformation:createApplication 권한 필요
* cloudformation 에서 api-gateway 연결, lambda 생성, 호출 권한(Role) 생성 등이 이루어지기 때문에 아래 추가 권한 필요
    * lambdaFullAccess
    * 그 밖의 권한은 확인 필요
### 기본 필요사항 - AWS Credentials 셋팅
* credentials 셋팅
    * $ vi ~/.aws/credentials
      <pre><code>
      [default]
      aws_access_key_id=XXXXXXXXX
      aws_secret_access_key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      </code></pre>
    * $ vi ~/.aws/config
      <pre><code>
      [default]
      region=ap-northeast-2
      output=json
      </code></pre>
### 기본 필요사항 - node, npm 설치
* node, npm 설치
    1. homebrew 가 설치 되어 있어야 한다. 미설치시 명령어 실행. 설치 되어 있을 경우 pass
       <pre><code>
       $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
       </code></pre>
    2. node, npm 설치
       <pre><code>
       $ brew install node@18
       </code></pre>
    3. 설치 완료시 아래 명령어로 버전 확인
       <pre><code>
       $ node -v
       $ npm -v
       </code></pre>
    4. yarn을 사용 하고 싶을 경우 아래 명령어로 설치(optional)
       <pre><code>
       $ brew install yarn --ignore-dependencies
       $ yarn -v
       </code></pre>
### 기본 필요사항 - serverless framework 모듈 설치
* serverless framework 모듈 및 plugin 설치
* 설치시 serverless 제외한 plugin은 원래 package.json 에 추가 설치 하는데,
  lambda 기본 패키지 구조 설정 및 layer 업로드시 plugin library가 추가되기 때문에 global로 설치하여 제외 시킴
   <pre><code>
   $ npm install -g serverless@3
   </code></pre>


### 개발 필요사항 - 공통 모듈에서 사용 할 package.json 모듈 설치
* 각 lambda function에서 사용할 공통 라이브러리의 경우 layer를 사용하여 공통으로 사용 가능하기 때문에,
  package.json 에 필요한 라이브러리 추가 후 모듈 install 진행.
* Ex) JWToken 파싱을 위한 공통 라이브러리가 필요한 경우. jsonwebtoken
<pre><code>
$ npm i jsonwebtoken
</code></pre>
* 공통 모듈이 필요 없을 경우 package.json 이 필요 없으며, serverless.yml 에서 공통 layer 항목이 필요 없다.
* 로컬에서 띄워서 테스트 할 경우에는 layer에서 포함된 라이브러리가 포함되어 있어야 하기 때문에, 최상위 경로에서 npm i 를 한번 더 실행 해준다.

### 개발 필요사항 - serverless.yml 에 사용할 기능 정의 및 배포
* serverless.yml 파일에 기본적으로 필요사항과 설명 참조.
* serverless 배포 방법
<pre><code>
프로젝트 최상위 경로에서 명령어 실행
$ serveless deploy
단축어로 sls deploy 도 사용 가능
stage가 기본값 dev로 되어 있어 stage 환경 배포시에는
$ sls deploy -s stage
로 실행 가능
</code></pre>

### 개발 필요사항 - 로컬에서 테스트 방법
<pre><code>
프로젝트 최상위 경로에서 명령어 실행
$ sls invoke local -f getSample
</code></pre>

### 개발 공통사항 - 로깅 처리
* 소스에서 로깅처리는 console.log() 대신 공통 로깅 스펙으로 적재 한다.
* 적재한 정해진 스펙의 로깅만 cloudwatch에 로깅 된다.
<pre><code>
// 공통 로깅 처리 스크립트 import
const logger = require('../../common/logging/common-logging.js');

// 로그 적재
logger.info(event, "테스트");

// 부가 json 데이터 추가 필요시 ( event, 메시지내용, json데이터 key, json데이터 )
logger.info(event, "요청 로그 적재", "reqeustInfo", { "requestUri": "aaa", "requestMethod": "get" });

// 기타 debug, warn, error 로깅
logger.debug(event, "디버그 로그");
logger.warn(event, "경고 로그");
logger.error(event, "에러 로그");
</code></pre>

