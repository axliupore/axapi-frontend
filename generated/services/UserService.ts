/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_User } from '../models/model_User';
import type { request_UserLoginAccount } from '../models/request_UserLoginAccount';
import type { request_UserLoginEmail } from '../models/request_UserLoginEmail';
import type { request_UserRegisterAccount } from '../models/request_UserRegisterAccount';
import type { request_UserRegisterEmail } from '../models/request_UserRegisterEmail';
import type { request_UserUpdate } from '../models/request_UserUpdate';
import type { response_Response } from '../models/response_Response';
import type { response_UserLoginResponse } from '../models/response_UserLoginResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * 获取用户信息
     * @returns any 返回用户信息
     * @throws ApiError
     */
    public static getApiUserGet(): CancelablePromise<(response_Response & {
        data?: model_User;
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get',
        });
    }
    /**
     * 用户根据账号登录
     * @param data 账号,密码
     * @returns any 返回用户信息,token,过期时间
     * @throws ApiError
     */
    public static postApiUserLoginAccount(
        data: request_UserLoginAccount,
    ): CancelablePromise<(response_Response & {
        data?: response_UserLoginResponse;
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login/account',
            body: data,
        });
    }
    /**
     * 用户根据邮箱登录
     * @param data 邮箱,验证码
     * @returns any 返回用户信息,token,过期时间
     * @throws ApiError
     */
    public static postApiUserLoginEmail(
        data: request_UserLoginEmail,
    ): CancelablePromise<(response_Response & {
        data?: response_UserLoginResponse;
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login/email',
            body: data,
        });
    }
    /**
     * 用户根据账号注册
     * @param data 账号,密码,确认密码,用户名
     * @returns any 返回注册信息
     * @throws ApiError
     */
    public static postApiUserRegisterAccount(
        data: request_UserRegisterAccount,
    ): CancelablePromise<(response_Response & {
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register/account',
            body: data,
        });
    }
    /**
     * 用户根据邮箱注册
     * @param data 邮箱,验证码,用户名
     * @returns any 返回注册信息
     * @throws ApiError
     */
    public static postApiUserRegisterEmail(
        data: request_UserRegisterEmail,
    ): CancelablePromise<(response_Response & {
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register/email',
            body: data,
        });
    }
    /**
     * 更新用户信息
     * @param data 用户名,头像地址,简介,性别
     * @returns any 设置用户信息
     * @throws ApiError
     */
    public static postApiUserUpdate(
        data: request_UserUpdate,
    ): CancelablePromise<(response_Response & {
        data?: any;
        msg?: string;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update',
            body: data,
        });
    }
}
