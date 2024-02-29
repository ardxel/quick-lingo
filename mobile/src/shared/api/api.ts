import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { BaseResponse } from "./api.interface";
import { TRANSLATE_API_URL_V1 } from "@env";

class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = this.createInstance();
  }

  public async get<T extends Record<string, unknown>>(endpoint: string) {
    return await this.instance.get<BaseResponse<T>>(endpoint);
  }

  public async post<T extends Record<string, unknown>, D = any>(endpoint: string, body: D) {
    return await this.instance.post<BaseResponse<T>>(endpoint, body);
  }

  private createInstance() {
    const config: CreateAxiosDefaults = {
      timeout: 10000,
      baseURL: TRANSLATE_API_URL_V1,
    };

    const instance: AxiosInstance = axios.create(config);

    return instance;
  }
}

export const api = new Api();
