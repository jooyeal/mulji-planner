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
        <p className="text-xl">새로운 일정 추가</p>
        <p>일정 추가 화면으로 이동</p>
        <br />
        <p className="text-xl">앱 다운로드</p>
        <p>기기에 앱을 다운로드함</p>
        <br />
      </div>
    </div>
  );
};

export default Guide;
