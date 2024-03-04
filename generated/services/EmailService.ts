/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { request_Email } from '../models/request_Email';
import type { response_Response } from '../models/response_Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EmailService {
    /**
     * 获取验证码
     * @param data 邮箱
     * @returns any 返回信息
     * @throws ApiError
     */
    public static postApiEmailSend(
        data: request_Email,
    ): CancelablePromise<(response_Response & {
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/email/send',
            body: data,
        });
    }
}
