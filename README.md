### Calender App

HTML에서 기본 제공하는 네이티브 Date picker(`<input type="date" />`)와 유사하게 동작하는 커스텀 Date picker를 구현해보자. 네이티브 Date picker는 다음과 같이 동작한다.

![native-date-picker.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/afff8768-1c11-4beb-b51d-cda10d60b2a6/native-date-picker.gif)

최종적으로 구현하려는 커스텀 Date picker도 다음과 같이 네이티브 Date picker와 유사하게 동작한다.

![date-picker.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f454fc63-2021-4dd6-b933-201040d4a9ef/date-picker.gif)

다음의 순서에 따라 먼저 Calendar를 구현하고 이를 기반으로 DatePicker를 구현해보자.\*\*\*\*

# 1. \***\*Calendar\*\***

다음 그림을 참고해서 Calendar의 뷰를 구현한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b9afd42-34fd-4ab3-9641-e87a4fcb9358/Untitled.png)

요구 사항은 다음과 같다.

1. 레이아웃

flexbox는 1차원(선형) 레이아웃의 정렬에 적합하고 grid는 2차원(매트릭스) 레이이웃에 적합하다. .calendar-nav 요소의 콘텐츠는 선형이고 .calendar-grid 요소의 콘텐츠는 매트릭스이므로 다음과 같이 레이아웃 시스템을 적용해 구현한다.

[Untitled](https://www.notion.so/196761618cd84892b6e9588ecc46782c)

[When to use Flexbox and when to use CSS grid - LogRocket Blog](https://blog.logrocket.com/flexbox-vs-css-grid/)

1. css 변수와 반응형 뷰

CSS의 미디어 쿼리(@media)는 HTML 요소를 기반으로 동작하지 않고 디바이스 또는 [미디어 타입](https://www.w3.org/TR/CSS21/media.html)(screen, print 등)을 기반으로 동작한다. 따라서 미디어 쿼리로는 특정 HTML 요소의 width 값의 변화에 반응하는 뷰를 구현할 수 없다. 하지만 [css 변수(css 커스텀 프로퍼티)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)를 사용하면 특정 HTML 요소의 width 값의 변화에 반응하는 뷰를 구현할 수 있다.

[Responsive Designs and CSS Custom Properties: Building a Flexible Grid System | CSS-Tricks](https://css-tricks.com/responsive-designs-and-css-custom-properties-building-a-flexible-grid-system/)

자바스크립트로 .calendar 요소의 width 값을 동적으로 변경할 경우를 대비해 [css 변수](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
를 사용하여 .calendar 요소의 width 값을 관리하려 한다. 다음과 같이 .calendar 요소의 width 값이 변경되면 캘린더 전체의 크기와 폰트 사이즈가 연동해서 조정되도록 뷰를 구현한다.

![calendar-size.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/414494b9-507c-4494-8c72-2694e366a68e/calendar-size.gif)

1. 기능

구현된 뷰를 기반으로 다음 그림을 참고해서 바닐라 자바스크립트로 기능을 구현한다. 구현시 다음 사항에 주의하기 바란다.

- **네이밍**에 유의하고 **일관된 코딩 컨벤션**을 유지한다. 이를 위해 **ESLint**는 반드시 사용한다.
- **코드 중복을 지양**한다.
- 이번 미션은 teample이 제공되지 않는다. 어떤 **디렉터리 구조**가 좋을지 고민하고 구성해보자.
- **별도의 라이브러리 사용은 금지**한다.
- 재사용을 고려해 의존성을 가지지 않고 다른 요소에 간섭하지 않도록 **컴포넌트로 구현**한다.
- 한 화면에 **여러 개의 컴포넌트**가 렌더링되어도 이상없이 동작해야 한다.
- ES Module(또는 Webpack)을 사용해 **모듈화**한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ab257512-bd87-4711-b990-e3394992ebf0/Untitled.png)

요구 사항은 다음과 같다.

- [x] 현재를 기준으로 .calendar 요소의 콘텐츠를 동적으로 생성하여 초기 렌더링한다.
- [x] .calendar-nav 요소의 버튼을 클릭하면 익월 또는 전월을 기준으로 .calendar 요소의 컨텐츠를 동적으로 생성하여 렌더링한다.
- [x] 현재 표시 중인 달의 1일 앞과 말일 뒤에 이전 달과 다음 달의 날짜를 채운다.
- [x] 캘린터에 오늘이 포함되어 있으면 구별할 수 있도록 표시한다.
- [x] 일요일은 폰트 컬러를 빨간색으로 지정한다.
- [x] 캘린터 크기는 동적으로 변경할 수 있어야 한다. 즉, 캘린터를 생성할 때 캘린터 크기를 지정할 수 있어야 한다.
- [x] 날짜를 클릭하면 해당 날짜를 ‘yyyy-mm-dd’ 형식의 문자열로 콘솔에 출력한다.

# 2. DatePicker

다음 그림을 참고해서 Date picker의 뷰와 기능을 구현한다. Calendar와 마찬가지로 구현시 다음 사항에 주의하기 바란다.

- **네이밍**에 유의하고 **일관된 코딩 컨벤션**을 유지한다. 이를 위해 **ESLint**는 반드시 사용한다.
- **코드 중복을 지양**한다.
- 이번 미션은 teample이 제공되지 않는다. 어떤 **디렉터리 구조**가 좋을지 고민하고 구성해보자.
- **별도의 라이브러리 사용은 금지**한다.
- 재사용을 고려해 의존성을 가지지 않고 다른 요소에 간섭하지 않도록 **컴포넌트로 구현**한다.
- 한 화면에 **여러 개의 컴포넌트**가 렌더링되어도 이상없이 동작해야 한다.
- ES Module(또는 Webpack)을 사용해 **모듈화**한다.

![date-picker.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f454fc63-2021-4dd6-b933-201040d4a9ef/date-picker.gif)

요구 사항은 다음과 같다.

- [x] DatePicker를 클릭(포커스)하면 캘린더가 렌더링된다. 이때 Date picker의 값은 빈문자열이다.
- [x] DatePicker는 read only하다.
- [x] 캘린더의 날짜를 클릭하면 해당 날짜가 DatePicker의 값으로 출력된다.
- [x] 캘린더와 DatePicker 이외의 영역을 클릭하면 캘린더가 사라진다.
- [x] Date picker의 값이 존재할 때 DatePicker를 다시 클릭(포커스)하면 DatePicker의 값을 기준으로 캘린더를 렌더링한다.
