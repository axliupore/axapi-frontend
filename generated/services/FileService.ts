/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { response_Response } from '../models/response_Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FileService {
    /**
     * 上传用户头像
     * @param file 上传文件
     * @returns any 上传成功
     * @throws ApiError
     */
    public static postApiFileUpload(
        file: Blob,
    ): CancelablePromise<(response_Response & {
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload',
            formData: {
                'file': file,
            },
        });
    }
}
