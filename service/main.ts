import { NextRouter } from "next/router";
import { RegistData } from "../pages/regist";
import { customToast } from "../utils/toast";
import { ApiClient } from "./apiClient";

export const registPlan = async ({
  formData,
  router,
}: {
  formData: RegistData;
  router: NextRouter;
}) => {
  const apiClient = new ApiClient();
  await apiClient.POST<{ data: RegistData }>({
    path: "regist",
    data: {
      data: formData,
    },
    onSuccess: () => {
      customToast({ status: "success", message: "등록에 성공했습니다" });
      router.push("/");
    },
    onError: () => {
      customToast({
        status: "error",
        message: "에러가 발생했습니다. 관리자에게 문의해주세요.",
      });
    },
  });
};
