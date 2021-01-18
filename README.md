# Multinatinal Youtube engine

이 프로젝트는 여러가지 언어로 입력해도 그와 연관된 Youtube Video를 가져오기 위한 프로그램입니다.

현재 구성한 Layout은 아래 Screenshot과 같이 검색창, youtube 검색 결과, 관련검색어로 구성되어 있습니다.
![youtubeSearchEngineLayout](https://github.com/JinSungYoon/Multinational-YouTube-search-engine/blob/master/img/youtubeSearchEngineLayout.JPG)

youtube결과는 google api의 youtube API를 사용하여 관련 영상을 가져왔으며,

관련검색어는 google api의 google Trends API를 사용하여 관련 검색어를 wordCloud로 표현했습니다.

Card에 영상을 클릭하면 Floating 형식으로 동영상이 나옵니다.

관련 검색어를 클릭하면 해당 검색어 기준으로 관련 영상 및 관련 검색어가 재검색 됩니다.

향후 추가 예정 기능

- 한글, 영어, 중국어 등 어떠한 검색어로 입력해도 관련 영상 리스트 송출[번역 기능 추가]
- 국가와 상관없이 검색어와의 유사성 증대
- 키워드와 관련된 영상을 더 찾고 Hot trend Keyword를 추가하여 추가 검색 유도
