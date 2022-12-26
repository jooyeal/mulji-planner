import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiClient {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/api/`,
    });
  }

  public async GET<Params>({
    path,
    params,
  }: {
    path: string;
    params?: Params;
  }): Promise<AxiosResponse> {
    const res = await this.instance.get(path, { params });
    return res;
  }

  public async POST<Data>({
    path,
    data,
    onSuccess,
    onError,
  }: {
    path: string;
    data?: Data;
    onSuccess?: () => void;
    onError?: () => void;
  }) {
    const res = await this.instance.post(path, data);
    if (onSuccess || onError) {
      if (res.status === 200) {
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    }
  }
}
