<template>
  <div class="user-index-container">
    <a-card class="index-card">
      <a-card class="card-content" title="个人信息设置">
        <template #extra>
          <a-button style="margin-right: 10px" @click="handleEmailVisible"
            >更新邮箱
          </a-button>
          <a-modal
            :open="emailVisible"
            @cancel="handleEmailCancel"
            :footer="null"
            centered
          >
            <div style="padding-inline: 32px; padding-block: 24px">
              <a-form :model="formEmail" style="margin-bottom: -20px">
                <a-form-item
                  name="email"
                  :rules="[
                    { required: true, message: '请输入邮箱' },
                    {
                      pattern: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
                      message: '不合法的邮箱账号！',
                    },
                  ]"
                >
                  <a-input
                    size="large"
                    placeholder="请输入邮箱"
                    v-model:value="formEmail.email"
                  >
                    <template #prefix>
                      <MailOutlined />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  name="code"
                  :rules="[{ required: true, message: '请输入验证码' }]"
                >
                  <div style="display: flex">
                    <a-input
                      size="large"
                      placeholder="请输入验证码"
                      style="margin-right: 8px"
                      v-model:value="formEmail.code"
                    >
                      <template #prefix>
                        <LockOutlined />
                      </template>
                    </a-input>
                    <a-button
                      size="large"
                      @click="sendEmail"
                      :disabled="disabled"
                    >
                      {{
                        disabled ? `${countdown} 秒后重新获取` : "获取验证码"
                      }}
                    </a-button>
                  </div>
                </a-form-item>
                <a-form-item>
                  <div style="width: 100%">
                    <a-button
                      type="primary"
                      html-type="submit"
                      style="width: 100%"
                      >更新邮箱
                    </a-button>
                  </div>
                  <div style="margin-top: 15px; width: 100%">
                    <a-button type="primary" danger ghost style="width: 100%"
                      >解绑邮箱
                    </a-button>
                  </div>
                </a-form-item>
              </a-form>
            </div>
          </a-modal>
          <a-button @click="updateUserInfo">提交修改</a-button>
        </template>
        <div>
          <a-upload v-model:file-list="fileList" v-bind="uploadConfig">
            <div v-if="fileList.length < 1">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :open="previewVisible"
            title="avatar"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
        <div class="user-info">
          <a-descriptions>
            <a-descriptions-item style="display: block" label="账号">
              <a-typography-paragraph
                v-model:content="user.account"
                copyable
              ></a-typography-paragraph>
            </a-descriptions-item>
            <a-descriptions-item style="display: block" label="用户名">
              <a-typography-paragraph
                v-model:content="userInfo.username"
                editable
              />
            </a-descriptions-item>
            <a-descriptions-item style="display: block" label="邮箱">
              <a-typography-paragraph v-model:content="user.email" copyable />
            </a-descriptions-item>
            <a-descriptions-item style="display: block" label="电话">
              <a-typography-paragraph v-model:content="user.phone" copyable />
            </a-descriptions-item>
            <a-descriptions-item style="display: block" label="性别">
              <a-typography-paragraph v-model:content="gender" editable />
            </a-descriptions-item>
            <a-descriptions-item
              style="display: block; margin-bottom: -10px"
              label="简介"
            >
              <a-typography-paragraph
                v-model:content="userInfo.profile"
                editable
              />
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </a-card>
      <a-card class="card-content" title="我的钱包">
        <template #extra>
          <a-button>充值余额</a-button>
        </template>
      </a-card>
      <a-card class="card-content" title="开发者凭证（调用接口的凭证）">
        <template #extra>
          <a-button>更新凭证</a-button>
        </template>
        <a-descriptions>
          <a-descriptions-item style="display: block" label="AccessKey"
            >{{ user.accessKey }}
          </a-descriptions-item>
          <a-descriptions-item
            style="display: block; margin-bottom: -10px"
            label="SecretKey"
            >{{ user.secretKey }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      <a-card class="card-content" title="开发者 SDK（快速接入API接口）">
        Go SDK
      </a-card>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { userStore } from "@/store/user";
import { onMounted, reactive, ref } from "vue";
import {
  message,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "ant-design-vue";
import {
  LockOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import {
  EmailService,
  OpenAPI,
  request_UserUpdate,
  UserService,
} from "../../../generated";

const user = userStore();

const unloadFileTypeList = [
  "image/jpeg",
  "image/jpg",
  "image/svg",
  "image/png",
  "image/webp",
  "image/jfif",
];

/**
 * 存储头像的链接
 */
const avatarUrl = ref("");

/**
 * 存储文件列表
 */
const fileList = ref<UploadProps["fileList"]>([]);

const previewVisible = ref(false);
const previewImage = ref("");

const gender = ref("男");

/**
 * 提交修改用户信息表单
 */
const userInfo = reactive({
  avatar: "",
  gender: 0,
  profile: "",
  username: "",
} as request_UserUpdate);

onMounted(() => {
  avatarUrl.value = user.avatar as string;
  userInfo.avatar = user.avatar;
  userInfo.profile = user.profile;
  userInfo.gender = user.gender;
  userInfo.username = user.username;
  if (user.gender === 1) {
    gender.value = "女";
  }
  if (avatarUrl.value !== "") {
    if (fileList.value) {
      fileList.value[0] = {
        uid: "avatar",
        name: "avatar",
        status: "done",
        url: avatarUrl.value, // 或者提供一个默认值
      } as UploadFile;
    }
  }
});

/**
 * 获得 base64 编码
 * @param file
 */
const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * 控制模块框
 * @param file
 */
const handlePreview = async (file: UploadProps["fileList"][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
};

/**
 * 关闭模态框
 */
const handleCancel = () => {
  previewVisible.value = false;
};

/**
 * 上传前进行判断 file 类型和大小
 * @param file
 */
const beforeUpload = async (file: File) => {
  const fileType = unloadFileTypeList.includes(file.type);
  if (!fileType) {
    message.error("图片类型有误,请上传jpg/png/svg/jpeg/webp格式!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("文件大小不能超过 1MB !");
    return false;
  }
  if (!isLt2M && !fileType) {
    if (fileList.value) {
      fileList.value[0] = {
        uid: "error",
        name: "error",
        status: "error",
        url: avatarUrl.value,
      } as UploadFile;
    }
    return false;
  }
  return fileType && isLt2M;
};

/**
 * 当上传组件发生变化时进行的函数
 * @param file
 */
const onChange = async (file: UploadChangeParam<UploadFile>) => {
  const res = file.file.response;
  if (file.file.response && res.data) {
    if (res.code === 0) {
      if (fileList.value) {
        fileList.value[0] = {
          uid: "avatar",
          name: "avatar",
          status: "success",
          url: res.data.url, // 或者提供一个默认值
        } as UploadFile;
      }
      avatarUrl.value = res.data.url;
    } else {
      file.file.status = "error";
      if (fileList.value) {
        fileList.value[0] = {
          uid: "avatar",
          name: "error",
          status: "error",
        } as UploadFile;
      }
    }
  }
};

/**
 * 上传组件的配置
 */
const uploadConfig: UploadProps = {
  name: "file",
  withCredentials: true,
  listType: "picture-card",
  action: `${OpenAPI.BASE}/api/file/upload`,
  maxCount: 1,
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    size: 3,
  },
  onPreview: handlePreview,
  beforeUpload: beforeUpload,
  onChange: onChange,
};

/**
 * 更新用户信息
 */
const updateUserInfo = async () => {
  if (gender.value === "女") {
    userInfo.gender = 1;
  }
  userInfo.avatar = avatarUrl.value;
  const res = await UserService.postApiUserUpdate(userInfo);
  if (res.code === 0) {
    message.success("修改用户信息成功");
    setTimeout(() => {
      location.reload();
    }, 500);
  } else {
    message.error(res.msg);
  }
};

/**
 * 更新邮箱的表单
 */
const formEmail = reactive({
  email: "276836658@qq.com",
  code: "",
});

const disabled = ref<boolean>(false);

const countdown = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

const emailVisible = ref(false);

const sendEmail = async () => {
  if (formEmail.email === "") {
    return;
  }
  const res = await EmailService.postApiEmailSend(formEmail);
  if (res.code === 0) {
    message.success("验证码发送成功");
    disabled.value = true;
    countdown.value = 60; // 设置初始倒计时为60秒
    timer = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value === 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clearInterval(timer);
        disabled.value = false;
      }
    }, 1000);
  } else {
    message.error(res.msg);
  }
};

const handleEmailVisible = () => {
  emailVisible.value = true;
};

const handleEmailCancel = () => {
  emailVisible.value = false;
};
</script>

<style lang="less">
/**
修改 ant-design 的 card 的 title 样式
 */
:where(.css-dev-only-do-not-override-1hsjdkk) .ant-card .ant-card-head {
  background-color: rgba(0, 0, 0, 0.02);
  font-size: 16px;
  font-weight: 700;
}

/**
将底层变浅
 */
//:where(.css-dev-only-do-not-override-1hsjdkk).ant-descriptions
//  .ant-descriptions-item-label {
//  color: rgba(0, 0, 0, 0.45);
//}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-descriptions
  .ant-descriptions-row
  > td {
  padding-bottom: 8px;
}

.user-index-container {
  width: 100%;
  display: flex;
  height: 100%;
  padding-inline: 40px;
  padding-block: 24px;

  .index-card {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;

    .card-content {
      &:not(:first-child) {
        margin-top: 25px; // 除第一个 card-content 之外，为其余的添加上外边距
      }
    }
  }
}
</style>
