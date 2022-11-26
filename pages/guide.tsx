import React from "react";

type Props = {};

const Guide = (props: Props) => {
  return (
    <div>
      <p className="text-2xl">이용 가이드</p>
      <hr />
      <div className="p-4">
        <p>상단 헤더의 메뉴버튼을 클릭시 메뉴화면이 등장.</p>
        <p>상단 헤더의 물지플래너를 클릭시 홈화면으로 이동.</p>
        <br />
        <p className="text-xl">홈 화면</p>
        <p>현재 예정되어 있는 일정을 표시</p>
        <br />
        <p className="text-xl">과거 일정 확인</p>
        <p>이미 지난 일정을 표시</p>
        <br />
        <p className="text-xl">일정 맞추기</p>
        <p>
          자신이 참가가능한 날짜를 선택하여 추가하면, 메인 페이지에서는 멤버와
          월(月)을 선택하여 어떤 날짜에 다 함께 모일 수 있는지 계산되어
          출력된다.
        </p>
        <br />
        <p className="text-xl">맛집 추천</p>
        <p>자신이 추천하는 맛집을 투고하는 곳 사진업로드도 추가예정</p>
        <br />
      </div>
    </div>
  );
};

export default Guide;
